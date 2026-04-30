export type ConcreteStyleKind =
	| 'component'
	| 'component-layer'
	| 'foundation'
	| 'primitive'
	| 'primitive-layer'
	| 'root'

export type ConcreteStyleSource = {
	readonly kind: ConcreteStyleKind
	readonly path: string
}

export type ConcreteStyleTransform = 'none' | 'without-layer-imports'

export type PublicStyleSource = ConcreteStyleSource & {
	readonly transform?: ConcreteStyleTransform
}

export type PublicStyleBundle = {
	readonly outputPath: string
	readonly sources: readonly PublicStyleSource[]
}

export const foundationStyleSources = [
	{ kind: 'foundation', path: 'src/foundations/colors/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/typography/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/spacing/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/sizing/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/layout/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/radii/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/elevation/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/motion/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/textures/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/iconography/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/state/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/accessibility/styles.css' }
] as const satisfies readonly ConcreteStyleSource[]

export const primitiveStyleSources = [
	{ kind: 'primitive', path: 'src/primitives/avatar/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/badge/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/brand-mark/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/bubble/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/button/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/calendar-panel/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/card/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/caret/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/chart-legend/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/chart-surface/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/checkbox/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/chip/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/code/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/composer-rail/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/composer-shell/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/concept-connector/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/concept-frame/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/data-card-header/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/data-table-control/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/data-table-pagination/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/data-table-shell/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/delta/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/diagram-controls/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/diagram-edge/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/diagram-item/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/diagram-legend/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/diagram-minimap/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/diagram-node/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/diagram-rail/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/diagram-viewport/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/distribution/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/divider/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/dropzone/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/empty-state/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/feedback-panel/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/field/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/focus-ring/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/flow-node/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/form-layout/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/form-overlay/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/frame/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/icon/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/indicator/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/input/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/kbd/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/link/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/menu-shell/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/message-shell/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/metric-shell/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/option-row/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/picker-control/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/picker-shell/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/pill/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/preview-stage/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/progress/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/radio/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/range-control/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/reasoning-panel/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/row/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/search-field/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/search-token/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/select/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/select-control/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/select-menu/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/skeleton/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/slider/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/sparkline/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/spinner/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/stat/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/stepper-control/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/suggestion-menu/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/switch/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/tag/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/textarea/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/texture/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/time-list/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/tooltip/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/tool-call-panel/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/toolbar-control/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/upload-field/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/upload-item/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/wordmark/styles.css' }
] as const satisfies readonly ConcreteStyleSource[]

export const componentStyleSources: readonly ConcreteStyleSource[] = []

export const ownedItemStyleSources = [
	...foundationStyleSources,
	...primitiveStyleSources,
	...componentStyleSources
] as const satisfies readonly ConcreteStyleSource[]

const rootStyleSource = {
	kind: 'root',
	path: 'src/styles.css',
	transform: 'without-layer-imports'
} as const satisfies PublicStyleSource

const primitiveLayerStyleSource = {
	kind: 'primitive-layer',
	path: 'src/styles/primitives.css'
} as const satisfies PublicStyleSource

const componentLayerStyleSource = {
	kind: 'component-layer',
	path: 'src/styles/components.css'
} as const satisfies PublicStyleSource

export const publicFullStyleSources = [
	rootStyleSource,
	...foundationStyleSources,
	primitiveLayerStyleSource,
	...primitiveStyleSources,
	componentLayerStyleSource,
	...componentStyleSources
] as const satisfies readonly PublicStyleSource[]

export const publicPrimitiveStyleSources = [
	primitiveLayerStyleSource,
	...primitiveStyleSources
] as const satisfies readonly PublicStyleSource[]

export const publicComponentStyleSources = [
	componentLayerStyleSource,
	...componentStyleSources
] as const satisfies readonly PublicStyleSource[]

export const publicStyleBundles = [
	{
		outputPath: 'dist/styles.css',
		sources: publicFullStyleSources
	},
	{
		outputPath: 'dist/styles/primitives.css',
		sources: publicPrimitiveStyleSources
	},
	{
		outputPath: 'dist/styles/components.css',
		sources: publicComponentStyleSources
	}
] as const satisfies readonly PublicStyleBundle[]
