import { createServer } from 'node:net'
import { dirname, resolve } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { type Browser, type ConsoleMessage, chromium, type Page } from 'playwright'

type ViewportSize = {
	readonly height: number
	readonly width: number
}

type SelectorExpectation = {
	readonly animationName?: string
	readonly label: string
	readonly minimumHeight?: number
	readonly minimumWidth?: number
	readonly pseudoElement?: '::after'
	readonly requireBoxShadow?: boolean
	readonly requireVisibleOpacity?: boolean
	readonly selector: string
}

type SmokeTarget = {
	readonly checks: readonly SelectorExpectation[]
	readonly name: string
	readonly path: string
	readonly scopeSelector?: string
	readonly viewport?: ViewportSize
}

type ScreenshotTarget = {
	readonly contentType: string
	readonly minimumBytes: number
	readonly name: string
	readonly path: string
}

type SelectorSnapshot = {
	readonly animationName: string
	readonly backgroundColor: string
	readonly boxShadow: string
	readonly display: string
	readonly height: number
	readonly opacity: string
	readonly width: number
}

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(scriptDirectory, '../../..')
const docsDirectory = resolve(workspaceRoot, 'apps/docs')
const defaultViewport = { height: 720, width: 1120 } satisfies ViewportSize
const browserLaunchTimeout = 30_000
const smokeTargetTimeout = 45_000
const smokeTargets = [
	{
		checks: [
			{ label: 'docs home', minimumHeight: 400, minimumWidth: 600, selector: '.docsHome' },
			{
				label: 'primitive catalog card',
				minimumHeight: 80,
				minimumWidth: 120,
				selector: '.homePrimitiveCard'
			},
			{
				label: 'component catalog card',
				minimumHeight: 80,
				minimumWidth: 120,
				selector: '.componentFeatureCard'
			}
		],
		name: 'docs home',
		path: '/',
		scopeSelector: 'body'
	},
	{
		checks: [
			{ label: 'pressed button', minimumHeight: 20, minimumWidth: 32, selector: '.concrete-button' },
			{
				label: 'shortcut keycap',
				minimumHeight: 10,
				minimumWidth: 10,
				selector: '.concrete-button-kbd'
			}
		],
		name: 'button pressed',
		path: '/render/primitive/button?state=pressed'
	},
	{
		checks: [
			{ label: 'nav link', minimumHeight: 10, minimumWidth: 40, selector: '.concrete-link-nav' },
			{
				label: 'external link icon',
				minimumHeight: 8,
				minimumWidth: 8,
				selector: '.concrete-link-external svg'
			}
		],
		name: 'link nav',
		path: '/render/primitive/link?state=nav'
	},
	{
		checks: [
			{
				label: 'forced rich tooltip',
				minimumHeight: 24,
				minimumWidth: 72,
				requireVisibleOpacity: true,
				selector: '.concrete-tooltip-force-open'
			},
			{
				label: 'tooltip keycap',
				minimumHeight: 12,
				minimumWidth: 12,
				selector: '.concrete-tooltip-kbd'
			}
		],
		name: 'tooltip rich',
		path: '/render/primitive/tooltip?state=rich'
	},
	{
		checks: [
			{
				animationName: 'concreteSkeleton',
				label: 'skeleton shimmer',
				minimumHeight: 10,
				minimumWidth: 36,
				pseudoElement: '::after',
				selector: '.concrete-skeleton'
			}
		],
		name: 'skeleton avatar',
		path: '/render/primitive/skeleton?state=avatar'
	},
	{
		checks: [
			{ label: 'brand mark', minimumHeight: 20, minimumWidth: 20, selector: '.concrete-brand-mark' },
			{
				label: 'inverse brand mark',
				minimumHeight: 20,
				minimumWidth: 20,
				selector: '.concrete-brand-mark[data-inverse="true"]'
			}
		],
		name: 'brand mark inverse',
		path: '/render/primitive/brand-mark?state=inverse'
	},
	{
		checks: [
			{ label: 'wordmark', minimumHeight: 20, minimumWidth: 80, selector: '.concrete-wordmark' },
			{
				label: 'wordmark svg',
				minimumHeight: 10,
				minimumWidth: 80,
				selector: '.concrete-wordmark svg'
			}
		],
		name: 'wordmark',
		path: '/render/primitive/wordmark'
	},
	{
		checks: [
			{
				label: 'focus ring preview',
				minimumHeight: 20,
				minimumWidth: 40,
				requireBoxShadow: true,
				selector: '.concrete-focus-ring-preview'
			}
		],
		name: 'focus ring',
		path: '/render/primitive/focus-ring'
	},
	{
		checks: [
			{
				label: 'preview stage',
				minimumHeight: 28,
				minimumWidth: 240,
				selector: '.concrete-preview-stage'
			},
			{ label: 'staged button', minimumHeight: 20, minimumWidth: 48, selector: '.concrete-button' }
		],
		name: 'preview stage',
		path: '/render/primitive/preview-stage?state=stack'
	},
	{
		checks: [
			{
				label: 'stepper control',
				minimumHeight: 28,
				minimumWidth: 120,
				selector: '.concrete-number-stepper'
			}
		],
		name: 'stepper control',
		path: '/render/primitive/stepper-control'
	},
	{
		checks: [
			{
				label: 'range control',
				minimumHeight: 24,
				minimumWidth: 160,
				selector: '.concrete-range-slider'
			},
			{
				label: 'range track',
				minimumHeight: 1,
				minimumWidth: 160,
				selector: '.concrete-range-slider-track'
			}
		],
		name: 'range control',
		path: '/render/primitive/range-control?state=narrow'
	},
	{
		checks: [
			{
				label: 'form shell',
				minimumHeight: 160,
				minimumWidth: 360,
				selector: '.concrete-form-shell'
			},
			{
				label: 'form row',
				minimumHeight: 24,
				minimumWidth: 240,
				selector: '.concrete-form-row'
			}
		],
		name: 'form layout rows',
		path: '/render/primitive/form-layout?state=rows'
	},
	{
		checks: [
			{
				label: 'form overlay',
				minimumHeight: 160,
				minimumWidth: 360,
				selector: '.concrete-form-overlay'
			},
			{
				label: 'form drawer',
				minimumHeight: 120,
				minimumWidth: 260,
				selector: '.concrete-form-drawer'
			}
		],
		name: 'form overlay drawer',
		path: '/render/primitive/form-overlay?state=drawer'
	},
	{
		checks: [
			{
				label: 'feedback panel',
				minimumHeight: 80,
				minimumWidth: 320,
				selector: '.concrete-validation-summary'
			},
			{
				label: 'feedback list',
				minimumHeight: 24,
				minimumWidth: 240,
				selector: '.concrete-validation-list'
			}
		],
		name: 'feedback panel',
		path: '/render/primitive/feedback-panel'
	},
	{
		checks: [
			{
				label: 'validation summary',
				minimumHeight: 80,
				minimumWidth: 320,
				selector: '.concrete-validation-summary'
			},
			{
				label: 'validation status icon',
				minimumHeight: 20,
				minimumWidth: 20,
				selector: '.concrete-validation-summary-icon'
			}
		],
		name: 'validation summary composition',
		path: '/render/component/validation-summary?state=mixed'
	},
	{
		checks: [
			{
				label: 'data table card',
				minimumHeight: 160,
				minimumWidth: 520,
				selector: '.concrete-data-table-card'
			},
			{ label: 'data table', minimumHeight: 120, minimumWidth: 520, selector: '.concrete-data-table' }
		],
		name: 'data table composition',
		path: '/render/component/data-table?state=selected'
	},
	{
		checks: [
			{
				label: 'chart surface',
				minimumHeight: 160,
				minimumWidth: 420,
				selector: '.concrete-chart-surface'
			},
			{ label: 'chart svg', minimumHeight: 120, minimumWidth: 320, selector: '.concrete-chart-svg' }
		],
		name: 'chart composition',
		path: '/render/component/chart'
	}
] as const satisfies readonly SmokeTarget[]

const screenshotTargets = [
	{
		contentType: 'image/jpeg',
		minimumBytes: 8_000,
		name: 'mobile chart screenshot route',
		path: '/render/component/chart/screenshot?viewport=mobile&quality=82'
	}
] as const satisfies readonly ScreenshotTarget[]

await run()

async function run() {
	console.log('visual smoke: building @rubric-labs/concrete')
	await runCommand(['bun', 'run', '--cwd', 'packages/concrete', 'build'])

	const existingOrigin = process.env.CONCRETE_VISUAL_SMOKE_ORIGIN

	if (existingOrigin) {
		console.log(`visual smoke: using existing docs server at ${existingOrigin}`)
		await waitForServer(existingOrigin, [])
		await runSmokeTargets(existingOrigin)
		await runScreenshotTargets(existingOrigin)
		return
	}

	const port = await getOpenPort()
	const origin = `http://127.0.0.1:${port}`
	const outputLines: string[] = []

	console.log(`visual smoke: starting docs server at ${origin}`)

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
		console.log('visual smoke: docs server is ready')
		await runSmokeTargets(origin)
		await runScreenshotTargets(origin)
	} finally {
		docsProcess.kill()
		await docsProcess.exited.catch(() => undefined)
	}
}

async function runSmokeTargets(origin: string) {
	console.log('visual smoke: launching browser')

	const browser = await chromium.launch({
		args: ['--no-sandbox'],
		channel: 'chrome',
		timeout: browserLaunchTimeout
	})

	try {
		for (const target of smokeTargets) {
			await withTimeout(
				runSmokeTarget(browser, origin, target),
				smokeTargetTimeout,
				`${target.name} exceeded ${smokeTargetTimeout}ms`
			)
		}
	} finally {
		await browser.close()
	}
}

async function runScreenshotTargets(origin: string) {
	for (const target of screenshotTargets) {
		const targetUrl = new URL(target.path, origin).toString()

		console.log(`visual smoke: ${target.name}`)

		const response = await fetchWithTimeout(targetUrl, smokeTargetTimeout)

		if (!response.ok) {
			throw new Error(`${target.name} returned HTTP ${response.status}`)
		}

		const contentType = response.headers.get('content-type') ?? ''

		if (!contentType.includes(target.contentType)) {
			throw new Error(`${target.name} returned ${contentType}`)
		}

		const screenshot = await response.arrayBuffer()

		if (screenshot.byteLength < target.minimumBytes) {
			throw new Error(
				`${target.name} produced ${screenshot.byteLength} bytes < ${target.minimumBytes}`
			)
		}
	}
}

async function runSmokeTarget(browser: Browser, origin: string, target: SmokeTarget) {
	const messages: string[] = []
	const page = await browser.newPage({
		deviceScaleFactor: 2,
		viewport: target.viewport ?? defaultViewport
	})

	page.on('console', message => recordConsoleMessage(message, messages))
	page.on('pageerror', error => messages.push(error.message))

	try {
		const targetUrl = new URL(target.path, origin).toString()

		console.log(`visual smoke: ${target.name}`)

		const response = await page.goto(targetUrl, { timeout: 30_000, waitUntil: 'load' })

		if (!response?.ok()) {
			throw new Error(`${target.name} returned HTTP ${response?.status() ?? 'unknown'}`)
		}

		const scopeSelector = target.scopeSelector ?? '.renderStage'

		await page.locator(scopeSelector).waitFor({ state: 'visible', timeout: 15_000 })

		for (const expectation of target.checks) {
			await assertSelector(page, expectation, target.name, scopeSelector)
		}

		const screenshot = await page.screenshot({ fullPage: false, type: 'png' })

		if (screenshot.byteLength < 5_000) {
			throw new Error(`${target.name} produced a suspiciously small screenshot`)
		}

		if (messages.length > 0) {
			throw new Error(`${target.name} emitted browser errors:\n${messages.join('\n')}`)
		}
	} finally {
		await page.close()
	}
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

async function assertSelector(
	page: Page,
	expectation: SelectorExpectation,
	targetName: string,
	scopeSelector: string
) {
	const locator = page.locator(`${scopeSelector} ${expectation.selector}`).first()

	await locator.waitFor({ state: 'attached', timeout: 10_000 })

	const box = await locator.boundingBox()

	if (!box) {
		throw new Error(`${targetName}: ${expectation.label} has no visible box`)
	}

	const snapshot = await locator.evaluate((element, pseudoElement): SelectorSnapshot => {
		const computedStyle = getComputedStyle(element, pseudoElement ?? undefined)

		return {
			animationName: computedStyle.animationName,
			backgroundColor: computedStyle.backgroundColor,
			boxShadow: computedStyle.boxShadow,
			display: computedStyle.display,
			height: element.getBoundingClientRect().height,
			opacity: computedStyle.opacity,
			width: element.getBoundingClientRect().width
		}
	}, expectation.pseudoElement)

	if (snapshot.display === 'none') {
		throw new Error(`${targetName}: ${expectation.label} is display:none`)
	}

	if (expectation.minimumWidth && box.width < expectation.minimumWidth) {
		throw new Error(
			`${targetName}: ${expectation.label} width ${box.width} < ${expectation.minimumWidth}`
		)
	}

	if (expectation.minimumHeight && box.height < expectation.minimumHeight) {
		throw new Error(
			`${targetName}: ${expectation.label} height ${box.height} < ${expectation.minimumHeight}`
		)
	}

	if (expectation.requireBoxShadow && snapshot.boxShadow === 'none') {
		throw new Error(`${targetName}: ${expectation.label} has no box-shadow`)
	}

	if (expectation.requireVisibleOpacity && Number(snapshot.opacity) < 0.95) {
		throw new Error(`${targetName}: ${expectation.label} opacity is ${snapshot.opacity}`)
	}

	if (expectation.animationName && snapshot.animationName !== expectation.animationName) {
		throw new Error(
			`${targetName}: ${expectation.label} animation ${snapshot.animationName} !== ${expectation.animationName}`
		)
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
	const readinessUrl = new URL(smokeTargets[0]?.path ?? '/', origin).toString()

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
