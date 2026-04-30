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
	{ kind: 'foundation', path: 'src/foundations/elevation/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/motion/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/radii/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/spacing/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/textures/styles.css' },
	{ kind: 'foundation', path: 'src/foundations/typography/styles.css' }
] as const satisfies readonly ConcreteStyleSource[]

export const primitiveStyleSources = [
	{ kind: 'primitive', path: 'src/primitives/avatar/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/badge/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/brand-mark/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/bubble/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/button/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/card/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/caret/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/checkbox/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/chip/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/code/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/concept-connector/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/concept-frame/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/delta/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/diagram-item/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/diagram-node/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/distribution/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/divider/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/dropzone/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/empty-state/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/field/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/focus-ring/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/frame/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/icon/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/indicator/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/input/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/kbd/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/link/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/pill/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/progress/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/radio/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/row/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/select/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/skeleton/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/slider/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/sparkline/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/spinner/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/stat/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/switch/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/tag/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/textarea/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/texture/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/tooltip/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/upload-item/styles.css' },
	{ kind: 'primitive', path: 'src/primitives/wordmark/styles.css' }
] as const satisfies readonly ConcreteStyleSource[]

export const componentStyleSources = [
	{ kind: 'component', path: 'src/components/area-chart/styles.css' },
	{ kind: 'component', path: 'src/components/bar-chart/styles.css' },
	{ kind: 'component', path: 'src/components/chart/styles.css' },
	{ kind: 'component', path: 'src/components/command-menu/styles.css' },
	{ kind: 'component', path: 'src/components/composer/styles.css' },
	{ kind: 'component', path: 'src/components/data-table/styles.css' },
	{ kind: 'component', path: 'src/components/date-picker/styles.css' },
	{ kind: 'component', path: 'src/components/date-range-picker/styles.css' },
	{ kind: 'component', path: 'src/components/diagram-canvas/styles.css' },
	{ kind: 'component', path: 'src/components/donut-chart/styles.css' },
	{ kind: 'component', path: 'src/components/file-upload/styles.css' },
	{ kind: 'component', path: 'src/components/flow-diagram/styles.css' },
	{ kind: 'component', path: 'src/components/form-dialog/styles.css' },
	{ kind: 'component', path: 'src/components/form-drawer/styles.css' },
	{ kind: 'component', path: 'src/components/form-shell/styles.css' },
	{ kind: 'component', path: 'src/components/heatmap/styles.css' },
	{ kind: 'component', path: 'src/components/image-upload/styles.css' },
	{ kind: 'component', path: 'src/components/line-chart/styles.css' },
	{ kind: 'component', path: 'src/components/message/styles.css' },
	{ kind: 'component', path: 'src/components/meter/styles.css' },
	{ kind: 'component', path: 'src/components/metric-card/styles.css' },
	{ kind: 'component', path: 'src/components/multi-select/styles.css' },
	{ kind: 'component', path: 'src/components/number-stepper/styles.css' },
	{ kind: 'component', path: 'src/components/password-input/styles.css' },
	{ kind: 'component', path: 'src/components/range-slider/styles.css' },
	{ kind: 'component', path: 'src/components/reasoning-message/styles.css' },
	{ kind: 'component', path: 'src/components/search-bar/styles.css' },
	{ kind: 'component', path: 'src/components/settings-panel/styles.css' },
	{ kind: 'component', path: 'src/components/stacked-bar-chart/styles.css' },
	{ kind: 'component', path: 'src/components/time-picker/styles.css' },
	{ kind: 'component', path: 'src/components/tool-call-message/styles.css' },
	{ kind: 'component', path: 'src/components/toolbar/styles.css' },
	{ kind: 'component', path: 'src/components/validation-summary/styles.css' }
] as const satisfies readonly ConcreteStyleSource[]

export const ownedItemStyleSources = [
	...foundationStyleSources,
	...primitiveStyleSources,
	...componentStyleSources
] as const satisfies readonly ConcreteStyleSource[]

export const publicStyleBundles = [
	{
		outputPath: 'dist/styles.css',
		sources: [
			{ kind: 'root', path: 'src/styles.css', transform: 'without-layer-imports' },
			{ kind: 'primitive-layer', path: 'src/styles/primitives.css' },
			{ kind: 'component-layer', path: 'src/styles/components.css' }
		]
	},
	{
		outputPath: 'dist/styles/primitives.css',
		sources: [{ kind: 'primitive-layer', path: 'src/styles/primitives.css' }]
	},
	{
		outputPath: 'dist/styles/components.css',
		sources: [{ kind: 'component-layer', path: 'src/styles/components.css' }]
	}
] as const satisfies readonly PublicStyleBundle[]
