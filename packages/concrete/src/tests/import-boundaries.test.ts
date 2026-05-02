import { describe, expect, test } from 'bun:test'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { basename, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
	componentDefinitions,
	foundationDefinitions,
	primitiveDefinitions
} from '../registry/items'
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
const retiredPublicPrimitiveSlugs = [
	'bubble',
	'calendar-panel',
	'chart-legend',
	'chart-surface',
	'composer-rail',
	'composer-shell',
	'data-card-header',
	'data-table-control',
	'data-table-pagination',
	'data-table-shell',
	'feedback-panel',
	'focus-ring',
	'form-layout',
	'form-overlay',
	'menu-shell',
	'message-shell',
	'metric-shell',
	'picker-control',
	'picker-shell',
	'preview-stage',
	'range-control',
	'reasoning-panel',
	'row',
	'search-field',
	'search-token',
	'select-control',
	'select-menu',
	'stepper-control',
	'suggestion-menu',
	'texture'
] as const
const retiredPublicComponentSlugs = ['feature-card', 'form-shell', 'toolbar'] as const
const allowedComponentImplementationImports = new Map<string, readonly string[]>([
	['packages/concrete/src/components/reasoning-message/component.tsx', ['message']],
	['packages/concrete/src/components/tool-call-message/component.tsx', ['message']]
])
const allowedComponentDemoImports = new Map<string, readonly string[]>([
	[
		'packages/concrete/src/components/form-dialog/examples.tsx',
		['date-range-picker', 'file-upload', 'multi-select', 'validation-summary']
	],
	[
		'packages/concrete/src/components/form-dialog/index.tsx',
		['date-range-picker', 'file-upload', 'multi-select', 'validation-summary']
	],
	[
		'packages/concrete/src/components/form-drawer/examples.tsx',
		['date-picker', 'file-upload', 'multi-select', 'number-stepper', 'validation-summary']
	],
	[
		'packages/concrete/src/components/form-drawer/index.tsx',
		['date-picker', 'file-upload', 'multi-select', 'number-stepper', 'validation-summary']
	],
	['packages/concrete/src/components/search-bar/examples.tsx', ['command-menu']],
	['packages/concrete/src/components/search-bar/index.tsx', ['command-menu']],
	['packages/concrete/src/components/settings-panel/examples.tsx', ['number-stepper']],
	['packages/concrete/src/components/settings-panel/index.tsx', ['number-stepper']]
])
const allowedMediaQueryConditions = new Set(['(width <= 420px)', '(width <= 640px)'])
const dynamicPrimitiveInlineStyleFiles = [
	'packages/concrete/src/primitives/chart-frame/component.tsx',
	'packages/concrete/src/primitives/diagram-minimap/component.tsx',
	'packages/concrete/src/primitives/diagram-viewport/component.tsx',
	'packages/concrete/src/primitives/donut-ring/component.tsx',
	'packages/concrete/src/primitives/heatmap-grid/component.tsx',
	'packages/concrete/src/primitives/progress/component.tsx',
	'packages/concrete/src/primitives/range/component.tsx',
	'packages/concrete/src/primitives/scale-frame/component.tsx',
	'packages/concrete/src/primitives/skeleton/component.tsx',
	'packages/concrete/src/primitives/slider/component.tsx',
	'packages/concrete/src/primitives/table/component.tsx',
	'packages/concrete/src/primitives/upload-item/component.tsx'
] as const
const dynamicPrimitiveSchemaFieldExceptions = new Map<string, readonly string[]>([
	['packages/concrete/src/primitives/diagram-viewport/schema.ts', ['height', 'width']],
	['packages/concrete/src/primitives/flow-node/schema.ts', ['height', 'width']],
	['packages/concrete/src/primitives/skeleton/schema.ts', ['height', 'width']]
])
const genericDiagramPrimitivePublicFiles = [
	'packages/concrete/src/primitives/diagram-controls/component.tsx',
	'packages/concrete/src/primitives/diagram-controls/index.tsx',
	'packages/concrete/src/primitives/diagram-edge/component.tsx',
	'packages/concrete/src/primitives/diagram-edge/index.tsx',
	'packages/concrete/src/primitives/diagram-viewport/component.tsx',
	'packages/concrete/src/primitives/diagram-viewport/index.tsx'
]
const genericDiagramStyleVocabularyFiles = [
	'packages/concrete/src/styles/class-names.ts',
	'packages/concrete/src/foundations/colors/styles.css',
	'packages/concrete/src/foundations/elevation/styles.css',
	'packages/concrete/src/foundations/layout/styles.css',
	'packages/concrete/src/foundations/sizing/examples.tsx',
	'packages/concrete/src/foundations/sizing/schema.ts',
	'packages/concrete/src/foundations/sizing/styles.css',
	'packages/concrete/src/foundations/textures/examples.tsx',
	'packages/concrete/src/foundations/textures/styles.css',
	'packages/concrete/src/primitives/diagram-controls/component.tsx',
	'packages/concrete/src/primitives/diagram-controls/styles.css',
	'packages/concrete/src/primitives/diagram-edge/component.tsx',
	'packages/concrete/src/primitives/diagram-edge/styles.css',
	'packages/concrete/src/primitives/diagram-legend/component.tsx',
	'packages/concrete/src/primitives/diagram-legend/styles.css',
	'packages/concrete/src/primitives/diagram-minimap/component.tsx',
	'packages/concrete/src/primitives/diagram-minimap/styles.css',
	'packages/concrete/src/primitives/diagram-rail/component.tsx',
	'packages/concrete/src/primitives/diagram-rail/styles.css',
	'packages/concrete/src/primitives/diagram-viewport/component.tsx',
	'packages/concrete/src/primitives/diagram-viewport/styles.css',
	'packages/concrete/src/primitives/flow-node/component.tsx',
	'packages/concrete/src/primitives/flow-node/styles.css'
]
const bannedComponentSpecificUtilityFiles = [
	'packages/concrete/src/utilities/composer-parts.tsx',
	'packages/concrete/src/utilities/data-table-logic.ts',
	'packages/concrete/src/utilities/diagram-canvas-logic.ts'
]
const bannedFoundationTokenNouns = [
	'command',
	'composer',
	'data-table',
	'diagram-canvas',
	'file-upload',
	'flow-diagram',
	'form-shell',
	'image-upload',
	'meter',
	'metric',
	'number-stepper',
	'range',
	'range-slider',
	'search',
	'stepper',
	'toolbar',
	'tooltip',
	'upload'
] as const
const bannedPrimitiveVisualSchemaKeys = new Set([
	'background',
	'borderColor',
	'borderRadius',
	'className',
	'color',
	'colors',
	'fontSize',
	'fontWeight',
	'foreground',
	'gap',
	'height',
	'inset',
	'margin',
	'padding',
	'radius',
	'shadow',
	'spacing',
	'style',
	'styles',
	'width'
])
const loosePrimitiveSchemaKeys = new Set(['size', 'tone', 'variant'])
const looseComponentSchemaKeys = new Set(['size', 'tone', 'variant'])
const semanticPrimitiveSchemaContracts = [
	{
		banned: ['signal', 'size', 'variant'],
		required: ['hierarchy', 'intent', 'purpose'],
		schemaPath: 'packages/concrete/src/primitives/badge/schema.ts'
	},
	{
		banned: ['size', 'variant'],
		required: ['density', 'hierarchy', 'intent'],
		schemaPath: 'packages/concrete/src/primitives/button/schema.ts'
	},
	{
		banned: ['tone'],
		required: ['intent'],
		schemaPath: 'packages/concrete/src/primitives/chip/schema.ts'
	},
	{
		banned: ['size', 'variant'],
		required: ['density', 'hierarchy', 'intent'],
		schemaPath: 'packages/concrete/src/primitives/delta/schema.ts'
	},
	{
		banned: ['size', 'variant'],
		required: ['density', 'hierarchy', 'intent'],
		schemaPath: 'packages/concrete/src/primitives/icon-button/schema.ts'
	},
	{
		banned: ['tone'],
		required: ['intent'],
		schemaPath: 'packages/concrete/src/primitives/indicator/schema.ts'
	},
	{
		banned: ['tone'],
		required: ['intent'],
		schemaPath: 'packages/concrete/src/primitives/label/schema.ts'
	},
	{
		banned: ['tone'],
		required: ['intent'],
		schemaPath: 'packages/concrete/src/primitives/pill/schema.ts'
	},
	{
		banned: ['size', 'tone'],
		required: ['density', 'intent'],
		schemaPath: 'packages/concrete/src/primitives/progress/schema.ts'
	},
	{
		banned: ['size', 'tone'],
		required: ['density', 'intent'],
		schemaPath: 'packages/concrete/src/primitives/progress-ring/schema.ts'
	},
	{
		banned: ['size', 'tone'],
		required: ['density', 'intent'],
		schemaPath: 'packages/concrete/src/primitives/spinner/schema.ts'
	},
	{
		banned: ['size', 'tone', 'variant'],
		required: ['density', 'intent', 'purpose'],
		schemaPath: 'packages/concrete/src/primitives/stat/schema.ts'
	},
	{
		banned: ['size', 'tone', 'variant'],
		required: ['density', 'hierarchy', 'intent'],
		schemaPath: 'packages/concrete/src/primitives/tag/schema.ts'
	},
	{
		banned: ['size'],
		required: ['density'],
		schemaPath: 'packages/concrete/src/primitives/avatar/schema.ts'
	},
	{
		banned: ['size', 'tone'],
		required: ['density', 'intent'],
		schemaPath: 'packages/concrete/src/primitives/empty-state/schema.ts'
	}
] as const
const dynamicDataSchemaContracts = [
	{
		banned: ['variant'],
		required: ['kind'],
		schemaPath: 'packages/concrete/src/primitives/chart-frame/schema.ts'
	},
	{
		banned: ['tone', 'variant'],
		required: ['display', 'intent'],
		schemaPath: 'packages/concrete/src/primitives/sparkline/schema.ts'
	},
	{
		banned: ['tone'],
		required: ['hierarchy'],
		schemaPath: 'packages/concrete/src/primitives/flow-node/schema.ts'
	},
	{
		banned: ['tone', 'variant'],
		required: ['intent', 'relation'],
		schemaPath: 'packages/concrete/src/primitives/diagram-edge/schema.ts'
	},
	{
		banned: ['tone'],
		required: ['intent'],
		schemaPath: 'packages/concrete/src/primitives/diagram-item/schema.ts'
	},
	{
		banned: ['tone'],
		required: ['intent'],
		schemaPath: 'packages/concrete/src/primitives/concept-connector/schema.ts'
	},
	{
		banned: ['variant'],
		required: ['kind'],
		schemaPath: 'packages/concrete/src/schemas/data-charts.ts'
	},
	{
		banned: ['tone', 'trendTone', 'variant'],
		required: ['display', 'intent', 'trendIntent'],
		schemaPath: 'packages/concrete/src/schemas/data-core.ts'
	},
	{
		banned: ['tone'],
		required: ['intent'],
		schemaPath: 'packages/concrete/src/schemas/data-table.ts'
	},
	{
		banned: ['tone', 'variant'],
		required: ['hierarchy', 'intent', 'relation'],
		schemaPath: 'packages/concrete/src/schemas/diagram.ts'
	}
] as const
const documentedPrimitiveRuntimeExports = new Map<string, readonly string[]>([
	[
		'axis',
		[
			'ChartAxis',
			'ChartBaseline',
			'ChartTickLabel',
			'ChartAxisLabel',
			'ChartRowLabel',
			'ChartValueLabel',
			'ChartEndLabel'
		]
	],
	['chart-frame', ['ChartFrame', 'ChartMessage']],
	['chart-grid', ['ChartGrid', 'ChartPlotBackground']],
	['checkbox', ['Checkbox', 'ChoiceRow']],
	['code', ['CodeBlock', 'InlineCode']],
	[
		'composer-surface',
		[
			'ComposerSurface',
			'ComposerEditor',
			'ComposerFooter',
			'ComposerToolbar',
			'ComposerMenuLayer',
			'ComposerSubmitDock',
			'ComposerSendButton'
		]
	],
	['diagram-edge', ['DiagramEdges', 'DiagramEdgePath']],
	[
		'diagram-viewport',
		[
			'DiagramShell',
			'DiagramHeader',
			'DiagramViewport',
			'DiagramStage',
			'DiagramElement',
			'DiagramElementButton',
			'DiagramFooter',
			'DiagramSvg'
		]
	],
	['donut-ring', ['DonutPlot', 'DonutCenter', 'DonutTrack', 'DonutSegment']],
	[
		'heatmap-grid',
		['HeatmapGrid', 'HeatmapCorner', 'HeatmapColumnLabel', 'HeatmapRowLabel', 'HeatmapCell']
	],
	['input', ['Input', 'InputControl']],
	['legend', ['Legend', 'LegendItem']],
	['pagination', ['Pagination', 'PaginationButton']],
	['range', ['Range', 'RangeTrack', 'RangeInput', 'RangeValues']],
	['series-bar', ['ChartBar', 'ChartBarTrack', 'ChartBarComparison', 'ChartStackSegment']],
	['series-line', ['ChartArea', 'ChartLine']],
	['series-point', ['ChartPoint', 'ChartEndpoint']],
	['stepper', ['Stepper', 'StepperAction', 'StepperInput']],
	[
		'table',
		[
			'TableViewport',
			'Table',
			'TableHead',
			'TableBody',
			'TableRow',
			'TableHeaderCell',
			'TableCell',
			'TableSelectionHeaderCell',
			'TableSelectionCell',
			'TableSelectionInput',
			'TableSortButton',
			'TableEmpty',
			'TableEmptyCell'
		]
	],
	['token-rail', ['TokenRail', 'TokenRailItem']],
	[
		'tool-call-panel',
		['ToolCallPanel', 'ToolCallStatusChip', 'ToolCallBody', 'ToolOutput', 'ToolCodeBlock']
	],
	[
		'toolbar-control',
		[
			'ToolbarControl',
			'ToolbarControlGroup',
			'ToolbarControlSeparator',
			'ToolbarControlButton',
			'ToolbarFormatGlyph'
		]
	],
	['trace-panel', ['TracePanel', 'TraceSteps', 'TraceStep']],
	['transcript-item', ['TranscriptItem', 'TranscriptPlain', 'TranscriptMetaItem']]
])
const documentedComponentRuntimeExports = new Map<string, readonly string[]>([])
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
	'packages/concrete/src/primitives/frame/examples.tsx'
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

	test('temporary architecture docs have been replaced by CODE.md and PLAN.md', () => {
		expect(existsSync(join(repoRoot, 'CODE.md'))).toBe(true)
		expect(existsSync(join(repoRoot, 'PLAN.md'))).toBe(true)
		expect(existsSync(join(repoRoot, 'CODEBASE_POLICIES.md'))).toBe(false)
		expect(existsSync(join(repoRoot, 'DX_ARCHITECTURE.md'))).toBe(false)
		expect(existsSync(join(repoRoot, 'CONCRETE_ONTOLOGY_PROPOSAL.md'))).toBe(false)
		expect(existsSync(join(repoRoot, 'CONCRETE_ONTOLOGY_TODO.md'))).toBe(false)
		expect(existsSync(join(repoRoot, 'ITEM_SCOPE.md'))).toBe(false)
		expect(existsSync(join(repoRoot, 'MIGRATION_QUEUE.md'))).toBe(false)
		expect(existsSync(join(repoRoot, 'REFACTOR_RUNBOOK.md'))).toBe(false)
	})

	test('actionable plan stays present and structured', () => {
		const planPath = join(repoRoot, 'PLAN.md')
		const plan = existsSync(planPath) ? readFileSync(planPath, 'utf8') : ''

		expect(plan).toContain('## Current Baseline')
		expect(plan).toContain('## Active Work')
		expect(plan).toContain('## Phase 7A: Foundation Perfection')
		expect(plan).toContain('## Phase 7B: Primitive Scope Closure')
		expect(plan).toContain('## Phase 7C: Primitive Family Consistency')
		expect(plan).toContain('## Phase 7D: Enforcement')
		expect(plan).toContain('## Phase 7D Gates')
		expect(plan).toContain('## Per-Item Audit Template')
		expect(readFileSync(join(repoRoot, 'CODE.md'), 'utf8')).toContain('PLAN.md')
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
			'app/(site)/foundations/[slug]/page.tsx',
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

	test('registry definitions stay aligned with public item folders', () => {
		expect(foundationDefinitions.map(definition => String(definition.slug)).sort()).toEqual(
			listItemSlugs('packages/concrete/src/foundations')
		)
		expect(primitiveDefinitions.map(definition => String(definition.slug)).sort()).toEqual(
			listItemSlugs('packages/concrete/src/primitives')
		)
		expect(componentDefinitions.map(definition => String(definition.slug)).sort()).toEqual(
			listItemSlugs('packages/concrete/src/components')
		)
	})

	test('retired public items stay deleted from folders, barrels, registry, and styles', () => {
		const primitiveSource = [
			readFileSync(join(repoRoot, 'packages/concrete/src/primitives/index.tsx'), 'utf8'),
			readFileSync(join(repoRoot, 'packages/concrete/src/registry/items.tsx'), 'utf8'),
			readFileSync(join(repoRoot, 'packages/concrete/src/registry/types.ts'), 'utf8'),
			readFileSync(join(repoRoot, 'packages/concrete/src/styles/manifest.ts'), 'utf8')
		].join('\n')
		const componentSource = [
			readFileSync(join(repoRoot, 'packages/concrete/src/components/index.tsx'), 'utf8'),
			readFileSync(join(repoRoot, 'packages/concrete/src/registry/items.tsx'), 'utf8'),
			readFileSync(join(repoRoot, 'packages/concrete/src/registry/types.ts'), 'utf8')
		].join('\n')
		const primitiveViolations = retiredPublicPrimitiveSlugs.flatMap(slug => {
			const folderExists = existsSync(join(repoRoot, 'packages/concrete/src/primitives', slug))
			const sourceIncludesSlug = hasSlugToken(primitiveSource, slug)

			return folderExists || sourceIncludesSlug ? [`retired primitive ${slug} is still public`] : []
		})
		const componentViolations = retiredPublicComponentSlugs.flatMap(slug => {
			const folderExists = existsSync(join(repoRoot, 'packages/concrete/src/components', slug))
			const sourceIncludesSlug = hasSlugToken(componentSource, slug)

			return folderExists || sourceIncludesSlug ? [`retired component ${slug} is still public`] : []
		})

		expect([...primitiveViolations, ...componentViolations]).toEqual([])
	})

	test('phase 7B primitive scope decisions stay closed', () => {
		const progressComponentSource = readFileSync(
			join(repoRoot, 'packages/concrete/src/primitives/progress/component.tsx'),
			'utf8'
		)
		const progressIndexSource = readFileSync(
			join(repoRoot, 'packages/concrete/src/primitives/progress/index.tsx'),
			'utf8'
		)
		const timeListSource = readFileSync(
			join(repoRoot, 'packages/concrete/src/primitives/time-list/component.tsx'),
			'utf8'
		)
		const toolCallPanelSource = readFileSync(
			join(repoRoot, 'packages/concrete/src/primitives/tool-call-panel/component.tsx'),
			'utf8'
		)
		const plan = readFileSync(join(repoRoot, 'PLAN.md'), 'utf8')
		const primitiveSlugs = new Set(primitiveDefinitions.map(definition => String(definition.slug)))
		const toolCallExportNames = listExportedFunctionNames(toolCallPanelSource)
		const allowedToolCallPanelSubparts = [
			'ToolCallBody',
			'ToolCallStatusChip',
			'ToolCodeBlock',
			'ToolOutput'
		]
		const violations = [
			...(['ProgressRing', 'SegmentedProgress'].some(name =>
				progressComponentSource.includes(`export function ${name}`)
			)
				? ['progress component still exports split progress subparts']
				: []),
			...(progressIndexSource.includes('ProgressRing') ||
			progressIndexSource.includes('SegmentedProgress')
				? ['progress index still re-exports split progress subparts']
				: []),
			...(primitiveSlugs.has('progress-ring') ? [] : ['progress-ring is missing from primitives']),
			...(primitiveSlugs.has('segmented-progress')
				? []
				: ['segmented-progress is missing from primitives']),
			...(timeListSource.includes('../listbox/component') &&
			timeListSource.includes('../option-row/component')
				? []
				: ['time-list is not assembled from Listbox and OptionRow']),
			...(/<button\b/u.test(timeListSource) ? ['time-list owns raw option button chrome'] : []),
			...toolCallExportNames.flatMap(name =>
				name === 'ToolCallPanel' || allowedToolCallPanelSubparts.includes(name)
					? []
					: [`tool-call-panel exports undocumented subpart ${name}`]
			),
			...allowedToolCallPanelSubparts.flatMap(name =>
				toolCallExportNames.includes(name) && plan.includes(name)
					? []
					: [`tool-call-panel subpart ${name} is missing or undocumented`]
			)
		]

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

	test('phase 5C upload workflow behavior stays component-owned', () => {
		const internalUploadRoot = join(repoRoot, 'packages/concrete/src/primitives/internal/file-upload')
		const fileUploadSource = readFileSync(
			join(repoRoot, 'packages/concrete/src/components/file-upload/component.tsx'),
			'utf8'
		)
		const imageUploadSource = readFileSync(
			join(repoRoot, 'packages/concrete/src/components/image-upload/component.tsx'),
			'utf8'
		)
		const violations = [
			...(existsSync(internalUploadRoot)
				? ['primitives/internal/file-upload still owns upload workflow JSX']
				: []),
			...(fileUploadSource.includes('primitives/internal/file-upload')
				? ['file-upload component still imports internal upload primitive']
				: []),
			...(imageUploadSource.includes('primitives/internal/file-upload')
				? ['image-upload component still imports internal upload primitive']
				: []),
			...(fileUploadSource.includes('createUploadQueueItems')
				? []
				: ['file-upload lost queue utility boundary']),
			...(imageUploadSource.includes('createUploadQueueItems')
				? []
				: ['image-upload lost queue utility boundary']),
			...(fileUploadSource.includes('<UploadField')
				? []
				: ['file-upload no longer assembles UploadField']),
			...(imageUploadSource.includes('<UploadField')
				? []
				: ['image-upload no longer assembles UploadField'])
		]

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
		const plan = readFileSync(join(repoRoot, 'PLAN.md'), 'utf8')
		const violations = componentFiles.flatMap(filePath => {
			const relativePath = relative(repoRoot, filePath)
			const allowedSlugs = new Set(allowedComponentImplementationImports.get(relativePath) ?? [])

			return listSiblingComponentImports(readFileSync(filePath, 'utf8')).flatMap(componentSlug =>
				allowedSlugs.has(componentSlug)
					? []
					: [`${relativePath} imports sibling component ${componentSlug}`]
			)
		})
		const staleAllowedImports = [...allowedComponentImplementationImports.entries()].flatMap(
			([relativePath, componentSlugs]) => {
				const absolutePath = join(repoRoot, relativePath)
				const imports = existsSync(absolutePath)
					? new Set(listSiblingComponentImports(readFileSync(absolutePath, 'utf8')))
					: new Set<string>()

				return componentSlugs.flatMap(componentSlug =>
					imports.has(componentSlug)
						? []
						: [`${relativePath} no longer imports allowed component ${componentSlug}`]
				)
			}
		)
		const undocumentedAllowedImports = [...allowedComponentImplementationImports.entries()].flatMap(
			([relativePath, componentSlugs]) => {
				const componentSlug = basename(relativePath.replace(/\/component\.tsx$/u, ''))

				return componentSlugs.flatMap(dependencySlug =>
					plan.includes(`| \`${componentSlug}\` | \`${dependencySlug}\` |`)
						? []
						: [`PLAN.md does not document component tier ${componentSlug} -> ${dependencySlug}`]
				)
			}
		)

		expect([...violations, ...staleAllowedImports, ...undocumentedAllowedImports]).toEqual([])
	})

	test('component examples and render adapters compose only documented sibling components', () => {
		const plan = readFileSync(join(repoRoot, 'PLAN.md'), 'utf8')
		const compositionFiles = listExistingItemFiles('packages/concrete/src/components', [
			'examples.tsx',
			'index.tsx'
		])
		const violations = compositionFiles.flatMap(filePath => {
			const relativePath = relative(repoRoot, filePath)
			const allowedSlugs = new Set(allowedComponentDemoImports.get(relativePath) ?? [])

			return listSiblingComponentImports(readFileSync(filePath, 'utf8')).flatMap(componentSlug =>
				allowedSlugs.has(componentSlug)
					? []
					: [`${relativePath} composes undocumented sibling component ${componentSlug}`]
			)
		})
		const staleAllowedImports = [...allowedComponentDemoImports.entries()].flatMap(
			([relativePath, componentSlugs]) => {
				const absolutePath = join(repoRoot, relativePath)
				const imports = existsSync(absolutePath)
					? new Set(listSiblingComponentImports(readFileSync(absolutePath, 'utf8')))
					: new Set<string>()

				return componentSlugs.flatMap(componentSlug =>
					imports.has(componentSlug)
						? []
						: [`${relativePath} no longer composes allowed component ${componentSlug}`]
				)
			}
		)
		const undocumentedAllowedImports = [...allowedComponentDemoImports.entries()].flatMap(
			([relativePath, componentSlugs]) =>
				componentSlugs.flatMap(componentSlug =>
					plan.includes(`| \`${relativePath}\` | \`${componentSlug}\` |`)
						? []
						: [`PLAN.md does not document demo composition ${relativePath} -> ${componentSlug}`]
				)
		)

		expect([...violations, ...staleAllowedImports, ...undocumentedAllowedImports]).toEqual([])
	})

	test('phase 5C message workflow uses declared component tier', () => {
		const internalMessageRoot = join(repoRoot, 'packages/concrete/src/primitives/internal/message')
		const messageSource = readFileSync(
			join(repoRoot, 'packages/concrete/src/components/message/component.tsx'),
			'utf8'
		)
		const reasoningMessageSource = readFileSync(
			join(repoRoot, 'packages/concrete/src/components/reasoning-message/component.tsx'),
			'utf8'
		)
		const toolCallMessageSource = readFileSync(
			join(repoRoot, 'packages/concrete/src/components/tool-call-message/component.tsx'),
			'utf8'
		)
		const violations = [
			...(existsSync(internalMessageRoot)
				? ['primitives/internal/message still owns message workflow JSX']
				: []),
			...(messageSource.includes('TranscriptItem')
				? []
				: ['message no longer owns TranscriptItem JSX']),
			...(messageSource.includes('MessageBubble') ? [] : ['message no longer owns MessageBubble JSX']),
			...(reasoningMessageSource.includes('../message/component')
				? []
				: ['reasoning-message does not use the declared message component tier']),
			...(toolCallMessageSource.includes('../message/component')
				? []
				: ['tool-call-message does not use the declared message component tier'])
		]

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

	test('component raw DOM stays semantic and unstyled', () => {
		const componentFiles = listItemDirectories(
			join(repoRoot, 'packages/concrete/src/components')
		).map(directory => join(directory, 'component.tsx'))
		const styledRawDomPattern =
			/<(?!form\b)(?:div|span|section|header|footer|main|aside|button|input|label|select|textarea|table|thead|tbody|tr|th|td|ul|ol|li|p|h[1-6])\b[^>]*\bclassName\s*=/u
		const violations = componentFiles
			.filter(filePath => styledRawDomPattern.test(readFileSync(filePath, 'utf8')))
			.map(filePath => `${relative(repoRoot, filePath)} styles raw DOM instead of primitives`)

		expect(violations).toEqual([])
	})

	test('examples do not wrap previews in generic chrome primitives', () => {
		const exampleFiles = [
			...listExistingItemFiles('packages/concrete/src/components', ['examples.tsx']),
			...listExistingItemFiles('packages/concrete/src/primitives', ['examples.tsx'])
		]
		const forbiddenPreviewChromePatterns = [
			/<\/?(?:Frame|Card)\b/u,
			/import\s*\{[^}]*\b(?:Frame|Card)\b[^}]*\}\s*from ['"][^'"]*primitives['"]/u,
			/from ['"][^'"]*(?:\/|^)(?:frame|card)(?:\/component)?['"]/u
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

	test('public primitive schemas do not expose visual override props', () => {
		const primitiveSchemaFiles = listExistingItemFiles('packages/concrete/src/primitives', [
			'schema.ts'
		])
		const violations = primitiveSchemaFiles.flatMap(filePath => {
			const relativePath = relative(repoRoot, filePath)
			const allowedFields = new Set(dynamicPrimitiveSchemaFieldExceptions.get(relativePath) ?? [])
			const schemaKeys = listObjectPropertyKeys(readFileSync(filePath, 'utf8'))

			return schemaKeys.flatMap(key => {
				const isBannedVisualKey = bannedPrimitiveVisualSchemaKeys.has(key)
				const isAllowedDynamicGeometryKey = allowedFields.has(key)

				return isBannedVisualKey && !isAllowedDynamicGeometryKey
					? [`${relativePath} exposes visual override prop ${key}`]
					: []
			})
		})
		const staleExceptions = [...dynamicPrimitiveSchemaFieldExceptions.entries()].flatMap(
			([relativePath, allowedFields]) => {
				const absolutePath = join(repoRoot, relativePath)
				const schemaKeys = existsSync(absolutePath)
					? listObjectPropertyKeys(readFileSync(absolutePath, 'utf8'))
					: []

				return allowedFields.flatMap(field =>
					schemaKeys.includes(field) ? [] : [`${relativePath} no longer exposes ${field}`]
				)
			}
		)

		expect([...violations, ...staleExceptions]).toEqual([])
	})

	test('phase 4B primitive schemas use semantic control vocabulary', () => {
		const violations = semanticPrimitiveSchemaContracts.flatMap(contract => {
			const source = readFileSync(join(repoRoot, contract.schemaPath), 'utf8')
			const schemaKeys = new Set(listObjectPropertyKeys(source))
			const missingKeys = contract.required.flatMap(key =>
				schemaKeys.has(key) ? [] : [`${contract.schemaPath} is missing semantic prop ${key}`]
			)
			const bannedKeys = contract.banned.flatMap(key =>
				schemaKeys.has(key) ? [`${contract.schemaPath} still exposes legacy prop ${key}`] : []
			)

			return [...missingKeys, ...bannedKeys]
		})

		expect(violations).toEqual([])
	})

	test('phase 4C dynamic data schemas use semantic data vocabulary', () => {
		const violations = dynamicDataSchemaContracts.flatMap(contract => {
			const source = readFileSync(join(repoRoot, contract.schemaPath), 'utf8')
			const schemaKeys = new Set(listObjectPropertyKeys(source))
			const missingKeys = contract.required.flatMap(key =>
				schemaKeys.has(key) ? [] : [`${contract.schemaPath} is missing semantic prop ${key}`]
			)
			const bannedKeys = contract.banned.flatMap(key =>
				schemaKeys.has(key) ? [`${contract.schemaPath} still exposes legacy prop ${key}`] : []
			)

			return [...missingKeys, ...bannedKeys]
		})

		expect(violations).toEqual([])
	})

	test('primitive runtime subpart exports are exact and documented', () => {
		const plan = readFileSync(join(repoRoot, 'PLAN.md'), 'utf8')
		const primitiveComponentFiles = listExistingItemFiles('packages/concrete/src/primitives', [
			'component.tsx'
		])
		const violations = primitiveComponentFiles.flatMap(filePath => {
			const slug = basename(filePath.replace(/\/component\.tsx$/u, ''))
			const source = readFileSync(filePath, 'utf8')
			const actualExports = listExportedRuntimeComponentNames(source)
			const expectedExports = documentedPrimitiveRuntimeExports.get(slug)

			if (expectedExports) {
				const undocumentedNames = expectedExports.flatMap(name =>
					plan.includes(name) ? [] : [`PLAN.md does not document primitive export ${name}`]
				)

				return actualExports.length > 1 && areStringArraysEqual(actualExports, expectedExports)
					? undocumentedNames
					: [
							`${relative(repoRoot, filePath)} exports ${actualExports.join(', ')} instead of ${expectedExports.join(', ')}`
						]
			}

			return actualExports.length <= 1
				? []
				: [
						`${relative(repoRoot, filePath)} exports undocumented runtime subparts ${actualExports.join(', ')}`
					]
		})
		const staleDocumentedSlugs = [...documentedPrimitiveRuntimeExports.keys()].flatMap(slug =>
			existsSync(join(repoRoot, 'packages/concrete/src/primitives', slug, 'component.tsx'))
				? []
				: [`documented primitive subpart slug ${slug} no longer exists`]
		)

		expect([...violations, ...staleDocumentedSlugs]).toEqual([])
	})

	test('component runtime exports are singular unless documented', () => {
		const plan = readFileSync(join(repoRoot, 'PLAN.md'), 'utf8')
		const componentFiles = listExistingItemFiles('packages/concrete/src/components', [
			'component.tsx'
		])
		const violations = componentFiles.flatMap(filePath => {
			const slug = basename(filePath.replace(/\/component\.tsx$/u, ''))
			const source = readFileSync(filePath, 'utf8')
			const actualExports = listExportedRuntimeComponentNames(source)
			const expectedExports = documentedComponentRuntimeExports.get(slug)

			if (expectedExports) {
				const undocumentedNames = expectedExports.flatMap(name =>
					plan.includes(name) ? [] : [`PLAN.md does not document component export ${name}`]
				)

				return actualExports.length > 1 && areStringArraysEqual(actualExports, expectedExports)
					? undocumentedNames
					: [
							`${relative(repoRoot, filePath)} exports ${actualExports.join(', ')} instead of ${expectedExports.join(', ')}`
						]
			}

			return actualExports.length <= 1
				? []
				: [
						`${relative(repoRoot, filePath)} exports undocumented runtime subparts ${actualExports.join(', ')}`
					]
		})
		const staleDocumentedSlugs = [...documentedComponentRuntimeExports.keys()].flatMap(slug =>
			existsSync(join(repoRoot, 'packages/concrete/src/components', slug, 'component.tsx'))
				? []
				: [`documented component subpart slug ${slug} no longer exists`]
		)

		expect([...violations, ...staleDocumentedSlugs]).toEqual([])
	})

	test('phase 4D primitive schemas do not expose loose vocabulary props', () => {
		const primitiveSchemaFiles = listExistingItemFiles('packages/concrete/src/primitives', [
			'schema.ts'
		])
		const violations = primitiveSchemaFiles.flatMap(filePath => {
			const relativePath = relative(repoRoot, filePath)
			const schemaKeys = listObjectPropertyKeys(readFileSync(filePath, 'utf8'))

			return schemaKeys.flatMap(key =>
				loosePrimitiveSchemaKeys.has(key) ? [`${relativePath} exposes loose primitive prop ${key}`] : []
			)
		})

		expect(violations).toEqual([])
	})

	test('phase 5B component schemas do not expose loose vocabulary props', () => {
		const componentSchemaFiles = listExistingItemFiles('packages/concrete/src/components', [
			'schema.ts'
		])
		const violations = componentSchemaFiles.flatMap(filePath => {
			const relativePath = relative(repoRoot, filePath)
			const schemaKeys = listObjectPropertyKeys(readFileSync(filePath, 'utf8'))

			return schemaKeys.flatMap(key =>
				looseComponentSchemaKeys.has(key) ? [`${relativePath} exposes loose component prop ${key}`] : []
			)
		})

		expect(violations).toEqual([])
	})

	test('phase 5B shared interaction and form schemas use semantic vocabulary', () => {
		const interactionSource = readFileSync(
			join(repoRoot, 'packages/concrete/src/schemas/interaction.ts'),
			'utf8'
		)
		const formsSource = readFileSync(join(repoRoot, 'packages/concrete/src/schemas/forms.ts'), 'utf8')
		const violations = [
			...(interactionSource.includes('tone:') ? ['interaction schema still exposes tone'] : []),
			...(interactionSource.includes('commandItemTone')
				? ['interaction schema still names command item tone']
				: []),
			...(interactionSource.includes('intent:') ? [] : ['interaction schema is missing intent']),
			...(formsSource.includes('formShellVariant')
				? ['form schema still names form shell variant']
				: []),
			...(formsSource.includes('variant:') ? ['form schema still exposes variant'] : [])
		]

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

	test('component implementations do not proxy render utilities', () => {
		const componentFiles = listItemDirectories(
			join(repoRoot, 'packages/concrete/src/components')
		).map(directory => join(directory, 'component.tsx'))
		const proxyPatterns = [
			/\breturn\s+render[A-Z][A-Za-z0-9]*\(/u,
			/\brenderParsed[A-Z][A-Za-z0-9]*\b/u
		]
		const violations = componentFiles
			.filter(filePath => proxyPatterns.some(pattern => pattern.test(readFileSync(filePath, 'utf8'))))
			.map(filePath => `${relative(repoRoot, filePath)} proxies runtime JSX to a utility`)

		expect(violations).toEqual([])
	})

	test('component implementations are not pure re-export proxies', () => {
		const componentFiles = listItemDirectories(
			join(repoRoot, 'packages/concrete/src/components')
		).map(directory => join(directory, 'component.tsx'))
		const pureReExportPattern = /^(?:export\s+(?:type\s+)?\{[^}]+\}\s+from\s+['"][^'"]+['"];?\s*)+$/u
		const violations = componentFiles
			.filter(filePath => pureReExportPattern.test(readFileSync(filePath, 'utf8').trim()))
			.map(filePath => `${relative(repoRoot, filePath)} is only a re-export proxy`)

		expect(violations).toEqual([])
	})

	test('diagram support primitives expose generic public names', () => {
		const exportNamePattern =
			/\bexport\s+(?:type\s+)?(?:function|type)\s+(?:DiagramCanvas|FlowDiagram)\w*/u
		const violations = genericDiagramPrimitivePublicFiles.flatMap(filePath => {
			const source = readFileSync(join(repoRoot, filePath), 'utf8')

			if (filePath.endsWith('/index.tsx') && /\b(?:DiagramCanvas|FlowDiagram)\w*/u.test(source)) {
				return [filePath]
			}

			return exportNamePattern.test(source) ? [filePath] : []
		})

		expect(violations).toEqual([])
	})

	test('diagram support style vocabulary stays primitive-owned', () => {
		const componentNamedDiagramStylePatterns = [
			/diagram-canvas-/u,
			/diagramCanvas/u,
			/flow-diagram-/u,
			/flowDiagram/u
		]
		const violations = genericDiagramStyleVocabularyFiles.flatMap(filePath => {
			const source = readFileSync(join(repoRoot, filePath), 'utf8')

			return componentNamedDiagramStylePatterns.flatMap(pattern =>
				pattern.test(source) ? [`${filePath} matches ${pattern.source}`] : []
			)
		})

		expect(violations).toEqual([])
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

	test('chart shell JSX belongs to component files', () => {
		const shellPrimitiveNames = ['DataSurface', 'ChartFrame', 'Legend']
		const chartComponentFiles = [
			'packages/concrete/src/components/area-chart/component.tsx',
			'packages/concrete/src/components/bar-chart/component.tsx',
			'packages/concrete/src/components/chart/component.tsx',
			'packages/concrete/src/components/donut-chart/component.tsx',
			'packages/concrete/src/components/heatmap/component.tsx',
			'packages/concrete/src/components/line-chart/component.tsx',
			'packages/concrete/src/components/stacked-bar-chart/component.tsx'
		]
		const componentViolations = chartComponentFiles.flatMap(filePath => {
			const source = readFileSync(join(repoRoot, filePath), 'utf8')

			return shellPrimitiveNames.flatMap(primitiveName =>
				source.includes(`<${primitiveName}`) ? [] : [`${filePath} does not render ${primitiveName}`]
			)
		})
		const utilityViolations = chartRenderingUtilityFiles.flatMap(filePath => {
			const source = readFileSync(join(repoRoot, filePath), 'utf8')

			return shellPrimitiveNames.flatMap(primitiveName =>
				source.includes(`<${primitiveName}`)
					? [`${filePath} renders shell primitive ${primitiveName}`]
					: []
			)
		})

		expect([...componentViolations, ...utilityViolations]).toEqual([])
	})

	test('factory layer stays narrow and utilities stay outside components', () => {
		expect(existsSync(join(repoRoot, 'packages/concrete/src/create'))).toBe(false)
		expect(listFileNames(join(repoRoot, 'packages/concrete/src/factories'))).toEqual(factoryFiles)
		expect(existsSync(join(repoRoot, 'packages/concrete/src/utilities'))).toBe(true)
	})

	test('single-component workflow helpers stay with their owning component', () => {
		const lingeringUtilityFiles = bannedComponentSpecificUtilityFiles.filter(filePath =>
			existsSync(join(repoRoot, filePath))
		)

		expect(lingeringUtilityFiles).toEqual([])
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

		expect(concreteClassNameEntries.length).toBe(515)
		expect(classNameRecord.button).toBe('concrete-button')
		expect(classNameRecord.diagramEdgeSelected).toBe('concrete-diagram-edge-selected')
		expect(classNameRecord.alertAction).toBe('concrete-alert-action')
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

	test('foundation token names do not use component-shaped vocabulary', () => {
		const violations = foundationStyleSources.flatMap(source => {
			const css = removeCssComments(
				readFileSync(join(repoRoot, 'packages/concrete', source.path), 'utf8')
			)

			return listCssDeclarations(css).flatMap(declaration =>
				declaration.property.startsWith('--concrete-')
					? bannedFoundationTokenNouns.flatMap(noun =>
							hasCssTokenSegment(declaration.property, noun)
								? [`${source.path} declares ${declaration.property} with banned noun ${noun}`]
								: []
						)
					: []
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
	if (!existsSync(directory)) {
		return []
	}

	return readdirSync(directory)
		.map(entry => join(directory, entry))
		.filter(entryPath => statSync(entryPath).isDirectory())
		.sort()
}

function listSiblingComponentImports(source: string): readonly string[] {
	const importPattern = /from ['"]\.\.\/([^./][^'"]*)['"]/gu
	const componentSlugs: string[] = []

	for (const match of source.matchAll(importPattern)) {
		const importPath = match[1]
		const componentSlug = importPath?.split('/')[0]

		if (componentSlug) {
			componentSlugs.push(componentSlug)
		}
	}

	return componentSlugs
}

function listItemDirectories(directory: string): readonly string[] {
	return listDirectories(directory).filter(entryPath => basename(entryPath) !== 'internal')
}

function listItemSlugs(root: string): string[] {
	return listItemDirectories(join(repoRoot, root))
		.map(directory => basename(directory))
		.sort()
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

function findDuplicates(items: readonly string[]): readonly string[] {
	return items.filter((item, index) => items.indexOf(item) !== index)
}

function hasSlugToken(source: string, slug: string): boolean {
	return new RegExp(`(^|[^A-Za-z0-9-])${escapeRegex(slug)}([^A-Za-z0-9-]|$)`, 'u').test(source)
}

function listExportedFunctionNames(source: string): readonly string[] {
	const names: string[] = []
	const functionPattern = /^export function ([A-Z][A-Za-z0-9]*)\b/gmu

	for (const match of source.matchAll(functionPattern)) {
		const name = match[1]

		if (name) {
			names.push(name)
		}
	}

	return names
}

function listExportedRuntimeComponentNames(source: string): readonly string[] {
	const names: string[] = []
	const exportPattern = /^export\s+(?:function|const)\s+([A-Z][A-Za-z0-9]*)\b/gmu

	for (const match of source.matchAll(exportPattern)) {
		const name = match[1]

		if (name) {
			names.push(name)
		}
	}

	return names
}

function areStringArraysEqual(
	left: readonly string[] | undefined,
	right: readonly string[] | undefined
): boolean {
	return (
		Array.isArray(left) &&
		Array.isArray(right) &&
		left.length === right.length &&
		left.every((value, index) => value === right[index])
	)
}

function hasCssTokenSegment(tokenName: string, segment: string): boolean {
	const tokenSegments = tokenName.replace(/^--concrete-/u, '').split('-')
	const segmentParts = segment.split('-')
	const lastStartIndex = tokenSegments.length - segmentParts.length

	for (let startIndex = 0; startIndex <= lastStartIndex; startIndex += 1) {
		const tokenSlice = tokenSegments.slice(startIndex, startIndex + segmentParts.length)

		if (tokenSlice.every((part, index) => part === segmentParts[index])) {
			return true
		}
	}

	return false
}

function escapeRegex(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
}

function listObjectPropertyKeys(source: string): readonly string[] {
	const propertyPattern = /^\s*([A-Za-z][A-Za-z0-9]*)\s*:/gmu
	const keys: string[] = []

	for (const match of source.matchAll(propertyPattern)) {
		const key = match[1]

		if (key) {
			keys.push(key)
		}
	}

	return keys
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
