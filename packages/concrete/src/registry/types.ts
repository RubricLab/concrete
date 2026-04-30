import type { ConcretePressure, PrimitiveCategory } from '../schemas'

export type FoundationSlug =
	| 'accessibility'
	| 'colors'
	| 'elevation'
	| 'iconography'
	| 'layout'
	| 'motion'
	| 'radii'
	| 'sizing'
	| 'spacing'
	| 'state'
	| 'textures'
	| 'typography'

export type PrimitiveSlug =
	| 'avatar'
	| 'badge'
	| 'brand-mark'
	| 'bubble'
	| 'button'
	| 'calendar-panel'
	| 'card'
	| 'caret'
	| 'chart-legend'
	| 'chart-surface'
	| 'checkbox'
	| 'chip'
	| 'code'
	| 'composer-rail'
	| 'composer-shell'
	| 'concept-connector'
	| 'concept-frame'
	| 'data-card-header'
	| 'data-table-control'
	| 'data-table-pagination'
	| 'data-table-shell'
	| 'delta'
	| 'diagram-controls'
	| 'diagram-edge'
	| 'diagram-item'
	| 'diagram-legend'
	| 'diagram-minimap'
	| 'diagram-node'
	| 'diagram-rail'
	| 'diagram-viewport'
	| 'distribution'
	| 'divider'
	| 'dropzone'
	| 'empty-state'
	| 'feedback-panel'
	| 'field'
	| 'focus-ring'
	| 'flow-node'
	| 'form-layout'
	| 'form-overlay'
	| 'frame'
	| 'icon'
	| 'indicator'
	| 'input'
	| 'kbd'
	| 'link'
	| 'menu-shell'
	| 'message-shell'
	| 'metric-shell'
	| 'option-row'
	| 'picker-control'
	| 'picker-shell'
	| 'pill'
	| 'preview-stage'
	| 'progress'
	| 'radio'
	| 'range-control'
	| 'reasoning-panel'
	| 'row'
	| 'search-field'
	| 'search-token'
	| 'scale-frame'
	| 'select'
	| 'select-control'
	| 'select-menu'
	| 'skeleton'
	| 'slider'
	| 'sparkline'
	| 'spinner'
	| 'stat'
	| 'stepper-control'
	| 'suggestion-menu'
	| 'switch'
	| 'tag'
	| 'textarea'
	| 'texture'
	| 'time-list'
	| 'tilt-frame'
	| 'tooltip'
	| 'tool-call-panel'
	| 'toolbar-control'
	| 'upload-field'
	| 'upload-item'
	| 'wordmark'

export type ComponentSlug =
	| 'area-chart'
	| 'bar-chart'
	| 'command-menu'
	| 'composer'
	| 'chart'
	| 'data-table'
	| 'date-picker'
	| 'date-range-picker'
	| 'feature-card'
	| 'file-upload'
	| 'flow-diagram'
	| 'form-dialog'
	| 'form-drawer'
	| 'form-shell'
	| 'donut-chart'
	| 'heatmap'
	| 'diagram-canvas'
	| 'image-upload'
	| 'line-chart'
	| 'message'
	| 'meter'
	| 'metric-card'
	| 'multi-select'
	| 'number-stepper'
	| 'password-input'
	| 'range-slider'
	| 'reasoning-message'
	| 'search-bar'
	| 'settings-panel'
	| 'stacked-bar-chart'
	| 'time-picker'
	| 'toolbar'
	| 'tool-call-message'
	| 'validation-summary'

export type PrimitiveRegistryEntry = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly PrimitiveProp[]
	slug: PrimitiveSlug
	states: readonly PrimitiveState[]
}

export type ComponentRegistryEntry = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly PrimitiveProp[]
	slug: ComponentSlug
	states: readonly PrimitiveState[]
}

export type FoundationTokenValue = number | string | readonly string[]

export type FoundationToken = {
	description?: string
	family?: string
	hex?: string
	kind?: string
	name: string
	role?: string
	size?: string
	value?: FoundationTokenValue
	values?: readonly string[]
}

export type FoundationRegistryEntry = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly PrimitiveProp[]
	slug: FoundationSlug
	states: readonly PrimitiveState[]
	tokens: readonly FoundationToken[]
}

export type PrimitiveProp = {
	defaultValue?: string
	description: string
	name: string
	required?: boolean
	type: string
}

export type PrimitiveState = {
	description: string
	name: string
	query: string
}
