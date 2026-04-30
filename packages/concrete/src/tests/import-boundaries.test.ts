import { describe, expect, test } from 'bun:test'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { basename, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { concreteClassNameEntries } from '../styles/class-names'
import { ownedItemStyleSources, publicStyleBundles } from '../styles/manifest'

const repoRoot = fileURLToPath(new URL('../../../../', import.meta.url))
const sourceRoots = ['packages/concrete/src', 'apps/docs/app', 'apps/docs/src']
const sourceExtensions = new Set(['.css', '.ts', '.tsx'])
const ignoredFiles = new Set(['packages/concrete/src/tests/import-boundaries.test.ts'])
const forbiddenSourcePatterns = [/concepts[\\/]/u, /concepts-assets/u, /apps[\\/]showcase/u]
const forbiddenDocsImportPatterns = [
	/@rubriclab\/concrete\/src/u,
	/packages\/concrete\/src/u,
	/packages\\concrete\\src/u
]
const foundationItemFiles = ['examples.tsx', 'index.tsx', 'meta.ts', 'schema.ts', 'styles.css']
const packageItemFiles = [
	'component.tsx',
	'examples.tsx',
	'index.tsx',
	'meta.ts',
	'schema.ts',
	'styles.css'
]
const factoryFiles = ['createControls.ts', 'createExamples.tsx', 'createItems.ts', 'index.ts']

describe('Import boundaries', () => {
	test('source does not depend on archived concept material', () => {
		const violations = scanSourceFiles(sourceRoots, forbiddenSourcePatterns)

		expect(violations).toEqual([])
	})

	test('docs import the public package surface only', () => {
		const violations = scanSourceFiles(
			['apps/docs/app', 'apps/docs/src'],
			forbiddenDocsImportPatterns
		)

		expect(violations).toEqual([])
	})

	test('docs do not own item-specific switchboard files', () => {
		const forbiddenFilePatterns = [
			/apps\/docs\/app\/components\/.*-demo/u,
			/apps\/docs\/app\/styles\/forms\.css/u,
			/component-playground-.*renderers/u,
			/component-playground-fixtures/u,
			/component-playground-stages/u,
			/componentPreviewStates/u,
			/getComponentPreviewState/u,
			/primitiveRoleLabels/u,
			/primitive-concepts/u,
			/primitive-playground-renderers/u
		]
		const docsFiles = [
			...listSourceFiles(join(repoRoot, 'apps/docs/app')),
			...listSourceFiles(join(repoRoot, 'apps/docs/src'))
		]
		const violations = docsFiles
			.map(filePath => relative(repoRoot, filePath))
			.filter(relativePath => forbiddenFilePatterns.some(pattern => pattern.test(relativePath)))

		expect(violations).toEqual([])
	})

	test('temporary architecture doc has been replaced by durable policies', () => {
		expect(existsSync(join(repoRoot, 'CODEBASE_POLICIES.md'))).toBe(true)
		expect(existsSync(join(repoRoot, 'DX_ARCHITECTURE.md'))).toBe(false)
	})

	test('docs routes do not proxy one-line page components', () => {
		const proxyPatterns = [
			/return <[A-Z][A-Za-z0-9]*Page \/>/u,
			/from ['"]@\/(?:home|foundations)-page['"]/u,
			/from ['"]@\/(?:component|primitive)-catalog['"]/u
		]
		const routeFiles = listSourceFiles(join(repoRoot, 'apps/docs/app')).filter(filePath =>
			filePath.endsWith('page.tsx')
		)
		const violations = routeFiles
			.map(filePath => relative(repoRoot, filePath))
			.filter(relativePath =>
				proxyPatterns.some(pattern => pattern.test(readFileSync(join(repoRoot, relativePath), 'utf8')))
			)

		expect(violations).toEqual([])
	})

	test('package item folders keep the exact atomic manifest', () => {
		const itemRoots = [
			{ expectedFiles: foundationItemFiles, root: 'packages/concrete/src/foundations' },
			{ expectedFiles: packageItemFiles, root: 'packages/concrete/src/primitives' },
			{ expectedFiles: packageItemFiles, root: 'packages/concrete/src/components' }
		]
		const violations = itemRoots.flatMap(({ expectedFiles, root }) =>
			listItemDirectories(join(repoRoot, root)).flatMap(directory => {
				const fileNames = listFileNames(directory)
				const isExactManifest =
					fileNames.length === expectedFiles.length &&
					fileNames.every((fileName, index) => fileName === expectedFiles[index])

				return isExactManifest
					? []
					: [
							`${relative(repoRoot, directory)} has ${fileNames.join(',')} instead of ${expectedFiles.join(',')}`
						]
			})
		)

		expect(violations).toEqual([])
	})

	test('package roots do not contain flat public item files', () => {
		const roots = [
			'packages/concrete/src/foundations',
			'packages/concrete/src/primitives',
			'packages/concrete/src/components'
		]
		const violations = roots.flatMap(root => {
			const absoluteRoot = join(repoRoot, root)
			const itemSlugs = new Set(
				listItemDirectories(absoluteRoot).map(directory => basename(directory))
			)

			return listFileNames(absoluteRoot)
				.filter(fileName => itemSlugs.has(fileName.replace(/\.(?:ts|tsx)$/u, '')))
				.map(fileName => `${root}/${fileName}`)
		})

		expect(violations).toEqual([])
	})

	test('internal primitive implementations stay private and minimal', () => {
		const internalRoot = join(repoRoot, 'packages/concrete/src/primitives/internal')
		const violations = listDirectories(internalRoot).flatMap(directory => {
			const fileNames = listFileNames(directory)
			const isMinimal =
				fileNames.length === 2 && fileNames[0] === 'component.tsx' && fileNames[1] === 'index.ts'

			return isMinimal ? [] : [`${relative(repoRoot, directory)} has ${fileNames.join(',')}`]
		})

		expect(violations).toEqual([])
	})

	test('components root contains only item folders and the public barrel', () => {
		const componentsRoot = join(repoRoot, 'packages/concrete/src/components')
		const violations = listFileNames(componentsRoot).filter(fileName => fileName !== 'index.tsx')

		expect(violations).toEqual([])
	})

	test('component implementations do not import sibling components', () => {
		const componentFiles = listItemDirectories(
			join(repoRoot, 'packages/concrete/src/components')
		).map(directory => join(directory, 'component.tsx'))
		const violations = componentFiles
			.filter(filePath => /from ['"]\.\.\/[^./]/u.test(readFileSync(filePath, 'utf8')))
			.map(filePath => relative(repoRoot, filePath))

		expect(violations).toEqual([])
	})

	test('factory layer stays narrow and utilities stay outside components', () => {
		expect(existsSync(join(repoRoot, 'packages/concrete/src/create'))).toBe(false)
		expect(listFileNames(join(repoRoot, 'packages/concrete/src/factories'))).toEqual(factoryFiles)
		expect(existsSync(join(repoRoot, 'packages/concrete/src/utilities'))).toBe(true)
	})

	test('package source no longer imports CSS modules', () => {
		const moduleFiles = listSourceFiles(join(repoRoot, 'packages/concrete/src')).filter(filePath =>
			filePath.endsWith('.module.css')
		)
		const moduleImports = scanSourceFiles(['packages/concrete/src'], [/module\.css/u])

		expect(moduleFiles).toEqual([])
		expect(moduleImports).toEqual([])
	})

	test('public class-name map derives stable concrete selectors', () => {
		const classNameRecord = Object.fromEntries(concreteClassNameEntries)
		const invalidEntries = concreteClassNameEntries.filter(
			([key, value]) => value !== toConcreteSelector(key)
		)

		expect(concreteClassNameEntries.length).toBe(493)
		expect(classNameRecord.button).toBe('concrete-button')
		expect(classNameRecord.diagramCanvasEdgeSelected).toBe('concrete-diagram-canvas-edge-selected')
		expect(classNameRecord.validationSummaryAction).toBe('concrete-validation-summary-action')
		expect(invalidEntries).toEqual([])
	})

	test('style ownership manifest covers every item stylesheet', () => {
		const expectedPaths = [
			...listItemStylePaths('packages/concrete/src/foundations'),
			...listItemStylePaths('packages/concrete/src/primitives'),
			...listItemStylePaths('packages/concrete/src/components')
		].sort()
		const actualPaths = ownedItemStyleSources.map<string>(source => source.path).sort()
		const missingFiles = ownedItemStyleSources
			.map(source => source.path)
			.filter(path => !existsSync(join(repoRoot, 'packages/concrete', path)))
		const duplicatePaths = findDuplicates(actualPaths)

		expect(actualPaths).toEqual(expectedPaths)
		expect(missingFiles).toEqual([])
		expect(duplicatePaths).toEqual([])
	})

	test('public stylesheet build manifest preserves exported bundles', () => {
		const outputPaths = publicStyleBundles.map(bundle => bundle.outputPath)
		const inputPaths = publicStyleBundles.flatMap(bundle => bundle.sources.map(source => source.path))
		const missingInputs = inputPaths.filter(
			path => !existsSync(join(repoRoot, 'packages/concrete', path))
		)

		expect(outputPaths).toEqual([
			'dist/styles.css',
			'dist/styles/primitives.css',
			'dist/styles/components.css'
		])
		expect(publicStyleBundles[0]?.sources.map(source => source.path)).toEqual([
			'src/styles.css',
			'src/styles/primitives.css',
			'src/styles/components.css'
		])
		expect(missingInputs).toEqual([])
	})
})

function scanSourceFiles(roots: readonly string[], patterns: readonly RegExp[]): readonly string[] {
	const violations: string[] = []

	for (const root of roots) {
		const absoluteRoot = join(repoRoot, root)

		if (!existsSync(absoluteRoot)) {
			continue
		}

		for (const filePath of listSourceFiles(absoluteRoot)) {
			const relativePath = relative(repoRoot, filePath)

			if (ignoredFiles.has(relativePath)) {
				continue
			}

			const contents = readFileSync(filePath, 'utf8')

			for (const pattern of patterns) {
				if (pattern.test(contents)) {
					violations.push(`${relativePath} matches ${pattern.source}`)
				}
			}
		}
	}

	return violations
}

function listSourceFiles(directory: string): readonly string[] {
	const files: string[] = []

	for (const entry of readdirSync(directory)) {
		if (entry === '.next' || entry === 'node_modules') {
			continue
		}

		const entryPath = join(directory, entry)
		const stats = statSync(entryPath)

		if (stats.isDirectory()) {
			files.push(...listSourceFiles(entryPath))
			continue
		}

		if (sourceExtensions.has(getExtension(entry))) {
			files.push(entryPath)
		}
	}

	return files
}

function listDirectories(directory: string): readonly string[] {
	return readdirSync(directory)
		.map(entry => join(directory, entry))
		.filter(entryPath => statSync(entryPath).isDirectory())
		.sort()
}

function listItemDirectories(directory: string): readonly string[] {
	return listDirectories(directory).filter(entryPath => basename(entryPath) !== 'internal')
}

function listFileNames(directory: string): readonly string[] {
	return readdirSync(directory)
		.map(entry => join(directory, entry))
		.filter(entryPath => statSync(entryPath).isFile())
		.map(filePath => basename(filePath))
		.sort()
}

function listItemStylePaths(root: string): readonly string[] {
	return listItemDirectories(join(repoRoot, root)).map(directory =>
		relative(join(repoRoot, 'packages/concrete'), join(directory, 'styles.css'))
	)
}

function findDuplicates(items: readonly string[]): readonly string[] {
	return items.filter((item, index) => items.indexOf(item) !== index)
}

function getExtension(fileName: string): string {
	const extensionIndex = fileName.lastIndexOf('.')

	if (extensionIndex === -1) {
		return ''
	}

	return fileName.slice(extensionIndex)
}

function toConcreteSelector(key: string): string {
	return `concrete-${key.replace(/[A-Z]/gu, character => `-${character.toLowerCase()}`)}`
}
