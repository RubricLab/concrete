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
	{ kind: 'primitive', path: 'src/primitives/alert/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/axis/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/avatar/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/badge/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/brand-mark/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/button/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/calendar-grid/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/card/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/caret/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/chart-frame/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/chart-grid/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/checkbox/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/chip/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/cluster/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/code/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/token-rail/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/composer-surface/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/concept-connector/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/concept-frame/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/control-group/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/data-surface/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/delta/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/dialog-surface/styles.css' },
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
	{ kind: 'primitive', path: 'src/primitives/disclosure-panel/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/dock/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/donut-ring/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/drawer-surface/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/dropzone/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/empty-state/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/field/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/field-row/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/flow-node/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/frame/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/grid/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/header/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/heading/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/heatmap-grid/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/icon/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/icon-button/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/indicator/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/inline/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/input/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/kbd/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/label/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/legend/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/link/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/listbox/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/menu-group/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/menu-surface/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/message-bubble/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/option-row/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/overlay/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/panel/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/pagination/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/picker-button/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/picker-surface/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/pill/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/plot/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/progress/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/radio/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/rail/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/range/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/row/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/scroll-area/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/search-input/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/select/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/section/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/series-bar/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/series-line/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/series-point/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/skeleton/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/slider/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/sparkline/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/spinner/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/split/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/stack/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/stat/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/stepper/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/surface/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/switch/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/tag/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/target-line/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/table/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/textarea/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/text/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/time-list/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/token/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/tooltip/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/tool-call-panel/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/toolbar-control/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/trace-panel/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/transcript-item/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/upload-field/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/upload-item/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/validation-list/styles.css' },
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
