import { describe, expect, test } from 'bun:test'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { basename, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { concreteClassNameEntries } from '../styles/class-names'
import {
	componentStyleSources,
	foundationStyleSources,
	ownedItemStyleSources,
	primitiveStyleSources,
	publicStyleBundles
} from '../styles/manifest'

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
const primitiveItemFiles = [
	'component.tsx',
	'examples.tsx',
	'index.tsx',
	'meta.ts',
	'schema.ts',
	'styles.css'
]
const componentItemFiles = ['component.tsx', 'examples.tsx', 'index.tsx', 'meta.ts', 'schema.ts']
const factoryFiles = ['createControls.ts', 'createExamples.tsx', 'createItems.ts', 'index.ts']
const packageExportKeys = [
	'.',
	'./assets/*',
	'./components',
	'./foundations',
	'./icons',
	'./package.json',
	'./primitives',
	'./registry',
	'./schemas',
	'./styles.css',
	'./styles/components.css',
	'./styles/primitives.css'
] as const
const packageRuntimeExports = [
	{ exportKey: '.', sourcePath: 'src/index.ts', targetPath: './dist/index.mjs' },
	{
		exportKey: './components',
		sourcePath: 'src/components/index.tsx',
		targetPath: './dist/components/index.mjs'
	},
	{
		exportKey: './foundations',
		sourcePath: 'src/foundations/index.ts',
		targetPath: './dist/foundations/index.mjs'
	},
	{
		exportKey: './icons',
		sourcePath: 'src/icons/index.tsx',
		targetPath: './dist/icons/index.mjs'
	},
	{
		exportKey: './primitives',
		sourcePath: 'src/primitives/index.tsx',
		targetPath: './dist/primitives/index.mjs'
	},
	{
		exportKey: './registry',
		sourcePath: 'src/registry/index.tsx',
		targetPath: './dist/registry/index.mjs'
	},
	{
		exportKey: './schemas',
		sourcePath: 'src/schemas/index.ts',
		targetPath: './dist/schemas/index.mjs'
	}
] as const
const packageStyleExports = [
	{ exportKey: './styles.css', sourcePath: 'src/styles.css', targetPath: './dist/styles.css' },
	{
		exportKey: './styles/components.css',
		sourcePath: 'src/styles/components.css',
		targetPath: './dist/styles/components.css'
	},
	{
		exportKey: './styles/primitives.css',
		sourcePath: 'src/styles/primitives.css',
		targetPath: './dist/styles/primitives.css'
	}
] as const
const allowedMediaQueryConditions = new Set(['(width <= 420px)', '(width <= 640px)'])
const scopedItemRoots = [
	'packages/concrete/src/foundations',
	'packages/concrete/src/primitives',
	'packages/concrete/src/components'
]
const dynamicPrimitiveInlineStyleFiles = [
	'packages/concrete/src/primitives/chart-surface/component.tsx',
	'packages/concrete/src/primitives/data-table-shell/component.tsx',
	'packages/concrete/src/primitives/diagram-minimap/component.tsx',
	'packages/concrete/src/primitives/diagram-viewport/component.tsx',
	'packages/concrete/src/primitives/progress/component.tsx',
	'packages/concrete/src/primitives/range-control/component.tsx',
	'packages/concrete/src/primitives/skeleton/component.tsx',
	'packages/concrete/src/primitives/slider/component.tsx',
	'packages/concrete/src/primitives/upload-item/component.tsx'
] as const
const chartRenderingUtilityFiles = [
	'packages/concrete/src/utilities/bar-chart-rendering.tsx',
	'packages/concrete/src/utilities/chart-core-rendering.tsx',
	'packages/concrete/src/utilities/chart-rendering.tsx',
	'packages/concrete/src/utilities/donut-chart-rendering.tsx',
	'packages/concrete/src/utilities/heatmap-rendering.tsx',
	'packages/concrete/src/utilities/line-chart-rendering.tsx',
	'packages/concrete/src/utilities/stacked-bar-rendering.tsx'
] as const
const selfDocumentingPreviewPrimitiveExampleFiles = new Set([
	'packages/concrete/src/primitives/card/examples.tsx',
	'packages/concrete/src/primitives/frame/examples.tsx',
	'packages/concrete/src/primitives/preview-stage/examples.tsx'
])

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

	test('temporary architecture docs have been replaced by CODE.md', () => {
		expect(existsSync(join(repoRoot, 'CODE.md'))).toBe(true)
		expect(existsSync(join(repoRoot, 'CODEBASE_POLICIES.md'))).toBe(false)
		expect(existsSync(join(repoRoot, 'DX_ARCHITECTURE.md'))).toBe(false)
	})

	test('autonomous migration queue stays present and structured', () => {
		const queuePath = join(repoRoot, 'MIGRATION_QUEUE.md')
		const queue = existsSync(queuePath) ? readFileSync(queuePath, 'utf8') : ''

		expect(queue).toContain('## Active Chunk')
		expect(queue).toContain('## Backlog')
		expect(queue).toContain('## Completed')
		expect(readFileSync(join(repoRoot, 'CODE.md'), 'utf8')).toContain('MIGRATION_QUEUE.md')
		expect(readFileSync(join(repoRoot, 'REFACTOR_RUNBOOK.md'), 'utf8')).toContain(
			'MIGRATION_QUEUE.md'
		)
	})

	test('item scope ledger covers every public item folder', () => {
		const scopePath = join(repoRoot, 'ITEM_SCOPE.md')
		const expectedPaths = [...scopedItemRoots.flatMap(listScopedItemPaths)].sort()
		const actualPaths = [...listLedgerItemPaths(scopePath)].sort()
		const duplicatePaths = findDuplicates(actualPaths)

		expect(existsSync(scopePath)).toBe(true)
		expect(actualPaths).toEqual(expectedPaths)
		expect(duplicatePaths).toEqual([])
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

	test('docs expose registry-led foundation render and detail surfaces', () => {
		const requiredFiles = [
			'app/foundations/[slug]/page.tsx',
			'app/render/[kind]/[slug]/page.tsx',
			'app/render/[kind]/[slug]/screenshot/route.ts',
			'scripts/catalog-audit.ts',
			'src/foundation-playground.tsx'
		]
		const missingFiles = requiredFiles.filter(
			filePath => !existsSync(join(repoRoot, 'apps/docs', filePath))
		)
		const renderItemSource = readFileSync(
			join(repoRoot, 'apps/docs/src/catalog-render-item.ts'),
			'utf8'
		)

		expect(missingFiles).toEqual([])
		expect(renderItemSource).toContain("case 'foundation'")
		expect(renderItemSource).toContain('getFoundationEntry')
	})

	test('package item folders keep the exact atomic manifest', () => {
		const requiredItemRoots = [
			{ expectedFiles: foundationItemFiles, root: 'packages/concrete/src/foundations' },
			{ expectedFiles: primitiveItemFiles, root: 'packages/concrete/src/primitives' }
		]
		const requiredViolations = requiredItemRoots.flatMap(({ expectedFiles, root }) =>
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
		const componentViolations = listItemDirectories(
			join(repoRoot, 'packages/concrete/src/components')
		).flatMap(directory => {
			const fileNames = listFileNames(directory)
			const requiredFileNames = fileNames.filter(fileName => fileName !== 'styles.css')
			const hasOnlyExpectedFiles =
				fileNames.every(
					fileName => componentItemFiles.includes(fileName) || fileName === 'styles.css'
				) &&
				requiredFileNames.length === componentItemFiles.length &&
				requiredFileNames.every((fileName, index) => fileName === componentItemFiles[index])

			return hasOnlyExpectedFiles
				? []
				: [
						`${relative(repoRoot, directory)} has ${fileNames.join(',')} instead of ${componentItemFiles.join(',')} with optional styles.css`
					]
		})

		expect([...requiredViolations, ...componentViolations]).toEqual([])
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

	test('component implementations do not own concrete class names', () => {
		const componentFiles = listItemDirectories(
			join(repoRoot, 'packages/concrete/src/components')
		).map(directory => join(directory, 'component.tsx'))
		const concreteClassPatterns = [
			/concreteClassNames/u,
			/getConcreteClassName/u,
			/className\s*=\s*["'`{][^\n]*concrete-/u
		]
		const violations = componentFiles
			.filter(filePath =>
				concreteClassPatterns.some(pattern => pattern.test(readFileSync(filePath, 'utf8')))
			)
			.map(filePath => relative(repoRoot, filePath))

		expect(violations).toEqual([])
	})

	test('components and examples do not own inline visual styles', () => {
		const restrictedFiles = [
			...listExistingItemFiles('packages/concrete/src/components', ['component.tsx', 'examples.tsx']),
			...listExistingItemFiles('packages/concrete/src/primitives', ['examples.tsx', 'index.tsx']),
			join(repoRoot, 'packages/concrete/src/utilities/data-fixtures.tsx')
		]
		const violations = restrictedFiles
			.filter(filePath => /\bstyle\s*=/u.test(readFileSync(filePath, 'utf8')))
			.map(filePath => relative(repoRoot, filePath))

		expect(violations).toEqual([])
	})

	test('examples do not wrap previews in generic chrome primitives', () => {
		const exampleFiles = [
			...listExistingItemFiles('packages/concrete/src/components', ['examples.tsx']),
			...listExistingItemFiles('packages/concrete/src/primitives', ['examples.tsx'])
		]
		const forbiddenPreviewChromePatterns = [
			/<\/?(?:Frame|Card|PreviewStage)\b/u,
			/import\s*\{[^}]*\b(?:Frame|Card|PreviewStage)\b[^}]*\}\s*from ['"][^'"]*primitives['"]/u,
			/from ['"][^'"]*(?:\/|^)(?:frame|card|preview-stage)(?:\/component)?['"]/u
		]
		const violations = exampleFiles.flatMap(filePath => {
			const relativePath = relative(repoRoot, filePath)

			if (selfDocumentingPreviewPrimitiveExampleFiles.has(relativePath)) {
				return []
			}

			const source = readFileSync(filePath, 'utf8')

			return forbiddenPreviewChromePatterns.some(pattern => pattern.test(source))
				? [`${relativePath} wraps an example in generic preview chrome`]
				: []
		})

		expect(violations).toEqual([])
	})

	test('catalog renderers stay serializable for server-rendered docs', () => {
		const restrictedFiles = [
			...listExistingItemFiles('packages/concrete/src/components', ['examples.tsx', 'index.tsx']),
			...listExistingItemFiles('packages/concrete/src/primitives', ['examples.tsx', 'index.tsx'])
		]
		const serverRendererPatterns = [
			/(?:^|[\s{])on[A-Z][A-Za-z0-9]*\s*=/u,
			/=>\s*undefined/u,
			/\b(?:const|function)\s+noop\b/u
		]
		const violations = restrictedFiles.flatMap(filePath => {
			const source = readFileSync(filePath, 'utf8')

			return serverRendererPatterns.some(pattern => pattern.test(source))
				? [`${relative(repoRoot, filePath)} passes callback state through catalog renderers`]
				: []
		})

		expect(violations).toEqual([])
	})

	test('primitive inline styles stay limited to documented dynamic adapters', () => {
		const allowedFiles = new Set<string>(dynamicPrimitiveInlineStyleFiles)
		const primitiveComponentFiles = listExistingItemFiles('packages/concrete/src/primitives', [
			'component.tsx'
		])
		const inlineStyleFiles = primitiveComponentFiles
			.filter(filePath => /\bstyle\s*=/u.test(readFileSync(filePath, 'utf8')))
			.map(filePath => relative(repoRoot, filePath))
			.sort()
		const unlistedFiles = inlineStyleFiles.filter(filePath => !allowedFiles.has(filePath))
		const staleAllowedFiles = dynamicPrimitiveInlineStyleFiles.filter(
			filePath =>
				!inlineStyleFiles.includes(filePath) ||
				!readFileSync(join(repoRoot, filePath), 'utf8').includes('style=')
		)

		expect([...unlistedFiles, ...staleAllowedFiles]).toEqual([])
	})

	test('chart render utilities assemble primitives instead of owning selectors', () => {
		const selectorOwnershipPatterns = [
			/concreteClassNames/u,
			/getConcreteClassName/u,
			/className\s*=\s*["'`{][^\n]*concrete-/u
		]
		const violations = chartRenderingUtilityFiles
			.filter(filePath =>
				selectorOwnershipPatterns.some(pattern =>
					pattern.test(readFileSync(join(repoRoot, filePath), 'utf8'))
				)
			)
			.map(filePath => `${filePath} owns chart selector vocabulary`)

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

	test('package exports stay aligned with public source barrels and build entrypoints', () => {
		const packageJson = readPackageJson()
		const packageExports = isRecord(packageJson.exports) ? packageJson.exports : {}
		const tsdownConfig = readFileSync(join(repoRoot, 'packages/concrete/tsdown.config.ts'), 'utf8')
		const runtimeViolations = packageRuntimeExports.flatMap(exportEntry => {
			const exportValue = packageExports[exportEntry.exportKey]
			const sourceExists = existsSync(join(repoRoot, 'packages/concrete', exportEntry.sourcePath))
			const importTarget = isRecord(exportValue) ? exportValue.import : undefined
			const typesTarget = isRecord(exportValue) ? exportValue.types : undefined
			const expectedTypesTarget = exportEntry.targetPath.replace(/\.mjs$/u, '.d.mts')

			return [
				...(sourceExists ? [] : [`${exportEntry.sourcePath} is missing`]),
				...(importTarget === exportEntry.targetPath
					? []
					: [`${exportEntry.exportKey} import target is ${String(importTarget)}`]),
				...(typesTarget === expectedTypesTarget
					? []
					: [`${exportEntry.exportKey} types target is ${String(typesTarget)}`]),
				...(tsdownConfig.includes(`'${exportEntry.sourcePath}'`)
					? []
					: [`${exportEntry.sourcePath} is missing from tsdown entrypoints`])
			]
		})
		const styleViolations = packageStyleExports.flatMap(exportEntry => {
			const exportValue = packageExports[exportEntry.exportKey]
			const sourceExists = existsSync(join(repoRoot, 'packages/concrete', exportEntry.sourcePath))
			const defaultTarget = isRecord(exportValue) ? exportValue.default : undefined
			const typesTarget = isRecord(exportValue) ? exportValue.types : undefined

			return [
				...(sourceExists ? [] : [`${exportEntry.sourcePath} is missing`]),
				...(defaultTarget === exportEntry.targetPath
					? []
					: [`${exportEntry.exportKey} default target is ${String(defaultTarget)}`]),
				...(typesTarget === `${exportEntry.targetPath}.d.ts`
					? []
					: [`${exportEntry.exportKey} types target is ${String(typesTarget)}`])
			]
		})

		expect(Object.keys(packageExports)).toEqual([...packageExportKeys])
		expect([...runtimeViolations, ...styleViolations]).toEqual([])
	})

	test('public class-name map derives stable concrete selectors', () => {
		const classNameRecord = Object.fromEntries(concreteClassNameEntries)
		const invalidEntries = concreteClassNameEntries.filter(
			([key, value]) => value !== toConcreteSelector(key)
		)

		expect(concreteClassNameEntries.length).toBe(514)
		expect(classNameRecord.button).toBe('concrete-button')
		expect(classNameRecord.diagramCanvasEdgeSelected).toBe('concrete-diagram-canvas-edge-selected')
		expect(classNameRecord.validationSummaryAction).toBe('concrete-validation-summary-action')
		expect(invalidEntries).toEqual([])
	})

	test('style ownership manifest covers every item stylesheet', () => {
		const expectedPaths = [
			...listItemStylePaths('packages/concrete/src/foundations'),
			...listItemStylePaths('packages/concrete/src/primitives'),
			...listExistingItemStylePaths('packages/concrete/src/components')
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

	test('component stylesheets only exist for active local debt', () => {
		const componentStylePaths = listExistingItemStylePaths('packages/concrete/src/components')
		const emptyComponentStyles = componentStylePaths.filter(path => {
			const css = readFileSync(join(repoRoot, 'packages/concrete', path), 'utf8')

			return css.replace(/\/\*[\s\S]*?\*\//gu, '').trim().length === 0
		})

		expect(componentStylePaths).toEqual([])
		expect(emptyComponentStyles).toEqual([])
	})

	test('public stylesheet build manifest preserves exported bundles', () => {
		const outputPaths = publicStyleBundles.map(bundle => bundle.outputPath)
		const inputPaths = publicStyleBundles.flatMap(bundle => bundle.sources.map(source => source.path))
		const missingInputs = inputPaths.filter(
			path => !existsSync(join(repoRoot, 'packages/concrete', path))
		)
		const fullBundle = publicStyleBundles[0]
		const primitiveBundle = publicStyleBundles[1]
		const componentBundle = publicStyleBundles[2]
		const fullSourcePaths = fullBundle?.sources.map<string>(source => source.path) ?? []
		const primitiveSourcePaths = primitiveBundle?.sources.map<string>(source => source.path) ?? []
		const componentSourcePaths = componentBundle?.sources.map<string>(source => source.path) ?? []
		const expectedFullSourcePaths = [
			'src/styles.css',
			...foundationStyleSources.map(source => source.path),
			'src/styles/primitives.css',
			...primitiveStyleSources.map(source => source.path),
			'src/styles/components.css',
			...componentStyleSources.map(source => source.path)
		]

		expect(outputPaths).toEqual([
			'dist/styles.css',
			'dist/styles/primitives.css',
			'dist/styles/components.css'
		])
		expect(fullSourcePaths).toEqual(expectedFullSourcePaths)
		expect(primitiveSourcePaths).toEqual([
			'src/styles/primitives.css',
			...primitiveStyleSources.map(source => source.path)
		])
		expect(componentSourcePaths).toEqual([
			'src/styles/components.css',
			...componentStyleSources.map(source => source.path)
		])
		expect(fullBundle?.sources[0]?.transform).toBe('without-layer-imports')
		expect(missingInputs).toEqual([])
	})

	test('central style layers do not own active selectors', () => {
		const centralLayerPaths = ['src/styles/primitives.css', 'src/styles/components.css']
		const violations = centralLayerPaths.filter(path =>
			/\.concrete-/u.test(
				removeCssComments(readFileSync(join(repoRoot, 'packages/concrete', path), 'utf8'))
			)
		)

		expect(violations).toEqual([])
	})

	test('foundation token names do not use retired component vocabulary', () => {
		const retiredFoundationTokenPatterns = [
			/--concrete-[a-z0-9-]*number-stepper[a-z0-9-]*/u,
			/--concrete-[a-z0-9-]*range-slider[a-z0-9-]*/u
		]
		const violations = foundationStyleSources.flatMap(source => {
			const css = removeCssComments(
				readFileSync(join(repoRoot, 'packages/concrete', source.path), 'utf8')
			)

			return retiredFoundationTokenPatterns.flatMap(pattern =>
				pattern.test(css) ? [`${source.path} matches ${pattern.source}`] : []
			)
		})

		expect(violations).toEqual([])
	})

	test('token consumer styles do not contain raw visual values', () => {
		const tokenConsumerStylePaths = [
			'src/styles.css',
			'src/styles/primitives.css',
			...primitiveStyleSources.map(source => source.path),
			'src/styles/components.css',
			...componentStyleSources.map(source => source.path)
		]
		const violations = tokenConsumerStylePaths.flatMap(path => {
			const absolutePath = join(repoRoot, 'packages/concrete', path)

			return listRawCssValueViolations(path, readFileSync(absolutePath, 'utf8'))
		})

		expect(violations).toEqual([])
	})

	test('token consumer custom property aliases only reference tokens', () => {
		const tokenConsumerStylePaths = [
			'src/styles.css',
			'src/styles/primitives.css',
			...primitiveStyleSources.map(source => source.path),
			'src/styles/components.css',
			...componentStyleSources.map(source => source.path)
		]
		const violations = tokenConsumerStylePaths.flatMap(path => {
			const css = readFileSync(join(repoRoot, 'packages/concrete', path), 'utf8')

			return listCssDeclarations(css).flatMap(declaration => {
				const isCustomProperty = declaration.property.startsWith('--')
				const referencesToken = /^var\(--concrete-[a-z0-9-]+\)$/u.test(declaration.value)

				return isCustomProperty && !referencesToken
					? [`${path} declares ${declaration.property}: ${declaration.value}`]
					: []
			})
		})

		expect(violations).toEqual([])
	})

	test('media query thresholds stay explicit and documented', () => {
		const stylePaths = [
			'src/styles.css',
			...foundationStyleSources.map(source => source.path),
			'src/styles/primitives.css',
			...primitiveStyleSources.map(source => source.path),
			'src/styles/components.css',
			...componentStyleSources.map(source => source.path)
		]
		const violations = stylePaths.flatMap(path => {
			const css = removeCssComments(readFileSync(join(repoRoot, 'packages/concrete', path), 'utf8'))

			return listMediaQueryConditions(css).flatMap(condition =>
				allowedMediaQueryConditions.has(condition)
					? []
					: [`${path} uses undocumented @media ${condition}`]
			)
		})

		expect(violations).toEqual([])
	})
})

function readPackageJson(): Record<string, unknown> {
	return JSON.parse(
		readFileSync(join(repoRoot, 'packages/concrete/package.json'), 'utf8')
	) as Record<string, unknown>
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

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

function listExistingItemStylePaths(root: string): readonly string[] {
	return listItemDirectories(join(repoRoot, root))
		.map(directory => join(directory, 'styles.css'))
		.filter(path => existsSync(path))
		.map(path => relative(join(repoRoot, 'packages/concrete'), path))
}

function listExistingItemFiles(root: string, fileNames: readonly string[]): readonly string[] {
	return listItemDirectories(join(repoRoot, root)).flatMap(directory =>
		fileNames.map(fileName => join(directory, fileName)).filter(filePath => existsSync(filePath))
	)
}

function listScopedItemPaths(root: string): readonly string[] {
	return listItemDirectories(join(repoRoot, root)).map(directory =>
		relative(join(repoRoot, 'packages/concrete/src'), directory)
	)
}

function listLedgerItemPaths(path: string): readonly string[] {
	if (!existsSync(path)) {
		return []
	}

	const ledger = readFileSync(path, 'utf8')
	const entryPattern = /^- `((?:foundations|primitives|components)\/[a-z0-9-]+)`/gmu
	const paths: string[] = []

	for (const match of ledger.matchAll(entryPattern)) {
		const itemPath = match[1]

		if (itemPath) {
			paths.push(itemPath)
		}
	}

	return paths
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

function listRawCssValueViolations(path: string, css: string): readonly string[] {
	return listCssDeclarations(removeAllowedRawCssAtRules(css)).flatMap(declaration => {
		const normalizedValue = normalizeCssValueForRawScan(declaration.value)

		return hasRawCssValue(normalizedValue)
			? [`${path} contains raw ${declaration.property}: ${declaration.value}`]
			: []
	})
}

function removeAllowedRawCssAtRules(css: string): string {
	return removeCssBlock(css.replace(/^@import[^\n]*\n?/gmu, ''), '@font-face')
}

function removeCssBlock(css: string, selector: string): string {
	let remaining = css

	while (remaining.includes(selector)) {
		const start = remaining.indexOf(selector)
		const open = remaining.indexOf('{', start)

		if (open === -1) {
			return remaining
		}

		let depth = 0
		let end = open

		for (; end < remaining.length; end += 1) {
			const character = remaining[end]

			if (character === '{') {
				depth += 1
			}

			if (character === '}') {
				depth -= 1

				if (depth === 0) {
					end += 1
					break
				}
			}
		}

		remaining = `${remaining.slice(0, start)}${remaining.slice(end)}`
	}

	return remaining
}

function listCssDeclarations(css: string): readonly { property: string; value: string }[] {
	const declarations: { property: string; value: string }[] = []
	const declarationPattern = /([^{};@]+):([^{};]+);/gu
	const withoutComments = removeCssComments(css)

	for (const match of withoutComments.matchAll(declarationPattern)) {
		const property = match[1]?.trim()
		const value = match[2]?.trim()

		if (property && value) {
			declarations.push({ property, value })
		}
	}

	return declarations
}

function listMediaQueryConditions(css: string): readonly string[] {
	const mediaQueryPattern = /@media\s+([^{]+)\{/gu
	const conditions: string[] = []

	for (const match of css.matchAll(mediaQueryPattern)) {
		const condition = match[1]?.trim().replace(/\s+/gu, ' ')

		if (condition) {
			conditions.push(condition)
		}
	}

	return conditions
}

function removeCssComments(css: string): string {
	return css.replace(/\/\*[\s\S]*?\*\//gu, '')
}

function normalizeCssValueForRawScan(value: string): string {
	return stripCssFunctions(
		value
			.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/gu, '""')
			.replace(/\b0(?:px|rem|em|ch|vh|vw|vmin|vmax|%|ms|s|deg|fr|turn)?\b/gu, '0'),
		['var', 'url']
	)
}

function stripCssFunctions(value: string, functionNames: readonly string[]): string {
	let stripped = value

	for (const functionName of functionNames) {
		let previous = ''
		const pattern = new RegExp(`${functionName}\\([^()]*\\)`, 'gu')

		while (previous !== stripped) {
			previous = stripped
			stripped = stripped.replace(pattern, `${functionName}()`)
		}
	}

	return stripped
}

function hasRawCssValue(value: string): boolean {
	const rawValuePatterns = [
		/#[0-9a-fA-F]{3,8}\b/u,
		/\b(?:rgb|rgba|hsl|hsla|oklch|lab|lch|color-mix)\(/u,
		/(?<![-\w])[-+]?\d*\.?\d+(?:px|rem|em|ch|vh|vw|vmin|vmax|%|ms|s|deg|fr|turn)\b/u,
		/(?<![-\w.])[-+]?\d*\.\d+\b/u,
		/(?<![-\w.])[-+]?[1-9]\d*(?:\.\d+)?\b/u
	]

	return rawValuePatterns.some(pattern => pattern.test(value))
}
