import { createServer } from 'node:net'
import { dirname, resolve } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { type Browser, type ConsoleMessage, chromium, type Page } from 'playwright'

type CatalogKind = 'component' | 'foundation' | 'primitive'

type CatalogState = {
	readonly name: string
	readonly query: string
}

type CatalogEntry = {
	readonly name: string
	readonly slug: string
	readonly states: readonly CatalogState[]
}

type CatalogTarget = {
	readonly entry: CatalogEntry
	readonly kind: CatalogKind
}

type CatalogRoute = {
	readonly label: string
	readonly path: string
	readonly state: string
	readonly target: CatalogTarget
}

type ViewportSize = {
	readonly height: number
	readonly width: number
}

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(scriptDirectory, '../../..')
const docsDirectory = resolve(workspaceRoot, 'apps/docs')
const defaultViewport = { height: 720, width: 1120 } satisfies ViewportSize
const catalogRouteTimeout = 30_000

await run()

async function run() {
	console.log('catalog audit: building @rubriclab/concrete')
	await runCommand(['bun', 'run', '--cwd', 'packages/concrete', 'build'])

	const concrete = await import('@rubriclab/concrete')
	const targets = [
		...concrete.foundationRegistry.map(entry => ({ entry, kind: 'foundation' as const })),
		...concrete.primitiveRegistry.map(entry => ({ entry, kind: 'primitive' as const })),
		...concrete.componentRegistry.map(entry => ({ entry, kind: 'component' as const }))
	] satisfies readonly CatalogTarget[]
	const routes = targets.flatMap(listCatalogRoutes)
	const existingOrigin = process.env.CONCRETE_CATALOG_AUDIT_ORIGIN

	assertCatalogTargets(targets)

	if (existingOrigin) {
		console.log(`catalog audit: using existing docs server at ${existingOrigin}`)
		await waitForServer(existingOrigin, [])
		await runCatalogRoutes(existingOrigin, routes)
		return
	}

	const port = await getOpenPort()
	const origin = `http://127.0.0.1:${port}`
	const outputLines: string[] = []

	console.log(`catalog audit: starting docs server at ${origin}`)

	const docsProcess = Bun.spawn({
		cmd: ['bun', 'x', 'next', 'dev', '--hostname', '127.0.0.1', '--port', String(port)],
		cwd: docsDirectory,
		env: {
			...process.env,
			NEXT_TELEMETRY_DISABLED: '1'
		},
		stderr: 'pipe',
		stdout: 'pipe'
	})

	drainProcessOutput(docsProcess.stdout, outputLines)
	drainProcessOutput(docsProcess.stderr, outputLines)

	try {
		await waitForServer(origin, outputLines)
		await runCatalogRoutes(origin, routes)
	} finally {
		docsProcess.kill()
		await docsProcess.exited.catch(() => undefined)
	}
}

function assertCatalogTargets(targets: readonly CatalogTarget[]) {
	const failures = targets.flatMap(target => {
		const hasDefaultState = target.entry.states.some(state => state.query === 'default')
		const stateQueries = target.entry.states.map(state => state.query)
		const duplicateStates = findDuplicates(stateQueries)

		return [
			...(hasDefaultState
				? []
				: [`${target.kind}/${target.entry.slug} does not expose a default state`]),
			...duplicateStates.map(state => `${target.kind}/${target.entry.slug} duplicates state ${state}`)
		]
	})

	if (failures.length > 0) {
		throw new Error(`Catalog target failures:\n${failures.join('\n')}`)
	}
}

function listCatalogRoutes(target: CatalogTarget): readonly CatalogRoute[] {
	const stateQueries = new Set(['default'])

	for (const state of target.entry.states) {
		stateQueries.add(state.query)
	}

	return [...stateQueries].map(state => {
		const query = state === 'default' ? '' : `?state=${encodeURIComponent(state)}`

		return {
			label: `${target.kind}/${target.entry.slug}:${state}`,
			path: `/render/${target.kind}/${target.entry.slug}${query}`,
			state,
			target
		}
	})
}

async function runCatalogRoutes(origin: string, routes: readonly CatalogRoute[]) {
	console.log(`catalog audit: checking ${routes.length} render routes`)

	const browser = await chromium.launch({
		args: ['--no-sandbox'],
		channel: 'chrome',
		timeout: catalogRouteTimeout
	})

	try {
		await runRoutesInBrowser(browser, origin, routes)
	} finally {
		await browser.close()
	}

	console.log(`catalog audit: passed ${routes.length} render routes`)
}

async function runRoutesInBrowser(
	browser: Browser,
	origin: string,
	routes: readonly CatalogRoute[]
) {
	const page = await browser.newPage({
		deviceScaleFactor: 2,
		viewport: defaultViewport
	})
	let messages: string[] = []

	page.on('console', message => recordConsoleMessage(message, messages))
	page.on('pageerror', error => messages.push(error.message))

	try {
		for (const route of routes) {
			messages = []
			await withTimeout(
				assertCatalogRoute(page, origin, route, () => messages),
				catalogRouteTimeout,
				`${route.label} exceeded ${catalogRouteTimeout}ms`
			)
		}
	} finally {
		await page.close()
	}
}

async function assertCatalogRoute(
	page: Page,
	origin: string,
	route: CatalogRoute,
	readMessages: () => readonly string[]
) {
	const routeUrl = new URL(route.path, origin).toString()
	const response = await page.goto(routeUrl, { timeout: catalogRouteTimeout, waitUntil: 'load' })

	if (!response?.ok()) {
		throw new Error(`${route.label} returned HTTP ${response?.status() ?? 'unknown'}`)
	}

	const stage = page.locator('.renderStage').first()
	await stage.waitFor({ state: 'visible', timeout: 10_000 })

	const box = await stage.boundingBox()

	if (!box || box.width < 120 || box.height < 40) {
		throw new Error(`${route.label} rendered a collapsed stage`)
	}

	const childCount = await stage.locator(':scope > *').count()

	if (childCount === 0) {
		throw new Error(`${route.label} rendered an empty stage`)
	}

	const pageText = await page.locator('.renderShell').textContent()

	if (!pageText?.includes(route.target.entry.name)) {
		throw new Error(`${route.label} did not render catalog metadata`)
	}

	const messages = readMessages()

	if (messages.length > 0) {
		throw new Error(`${route.label} emitted browser errors:\n${messages.join('\n')}`)
	}
}

async function runCommand(command: readonly string[]) {
	const outputLines: string[] = []
	const commandProcess = Bun.spawn({
		cmd: [...command],
		cwd: workspaceRoot,
		stderr: 'pipe',
		stdout: 'pipe'
	})

	drainProcessOutput(commandProcess.stdout, outputLines)
	drainProcessOutput(commandProcess.stderr, outputLines)

	const exitCode = await commandProcess.exited

	if (exitCode !== 0) {
		throw new Error(
			`${command.join(' ')} exited with ${exitCode}\n${outputLines.slice(-80).join('\n')}`
		)
	}
}

async function waitForServer(origin: string, outputLines: readonly string[]) {
	const readinessUrl = new URL('/render/foundation/colors', origin).toString()

	for (let attempt = 0; attempt < 60; attempt += 1) {
		try {
			const response = await fetchWithTimeout(readinessUrl, 1_000)

			if (response.ok) {
				return
			}
		} catch {
			await delay(500)
		}
	}

	throw new Error(`Docs server did not serve ${readinessUrl}\n${outputLines.slice(-40).join('\n')}`)
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
	const abortController = new AbortController()
	const timeout = setTimeout(() => abortController.abort(), timeoutMs)

	try {
		return await fetch(url, { signal: abortController.signal })
	} finally {
		clearTimeout(timeout)
	}
}

async function getOpenPort(): Promise<number> {
	return new Promise((resolvePort, rejectPort) => {
		const server = createServer()

		server.on('error', rejectPort)
		server.listen(0, '127.0.0.1', () => {
			const address = server.address()

			if (typeof address === 'object' && address) {
				const port = address.port

				server.close(() => resolvePort(port))
				return
			}

			server.close(() => rejectPort(new Error('Could not allocate an open port')))
		})
	})
}

async function withTimeout<Result>(
	promise: Promise<Result>,
	timeoutMs: number,
	timeoutMessage: string
): Promise<Result> {
	let timeout: ReturnType<typeof setTimeout> | undefined
	const timeoutPromise = new Promise<never>((_, reject) => {
		timeout = setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs)
	})

	try {
		return await Promise.race([promise, timeoutPromise])
	} finally {
		if (timeout) {
			clearTimeout(timeout)
		}
	}
}

function findDuplicates(items: readonly string[]): readonly string[] {
	return items.filter((item, index) => items.indexOf(item) !== index)
}

function recordConsoleMessage(message: ConsoleMessage, messages: string[]) {
	switch (message.type()) {
		case 'error':
			messages.push(message.text())
			break
		default:
			break
	}
}

function drainProcessOutput(
	stream: ReadableStream<Uint8Array> | null,
	outputLines: string[]
): void {
	if (!stream) {
		return
	}

	const reader = stream.getReader()
	const decoder = new TextDecoder()

	void readProcessOutput(reader, decoder, outputLines)
}

async function readProcessOutput(
	reader: ReadableStreamDefaultReader<Uint8Array>,
	decoder: TextDecoder,
	outputLines: string[]
) {
	let pendingText = ''

	try {
		while (true) {
			const { done, value } = await reader.read()

			if (done) {
				break
			}

			pendingText += decoder.decode(value, { stream: true })

			const lines = pendingText.split(/\r?\n/u)
			pendingText = lines.pop() ?? ''

			for (const line of lines) {
				if (line.trim().length === 0) {
					continue
				}

				outputLines.push(line)

				if (outputLines.length > 80) {
					outputLines.shift()
				}
			}
		}
	} catch {
		return
	}
}
