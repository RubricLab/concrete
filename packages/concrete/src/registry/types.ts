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
	| 'alert'
	| 'axis'
	| 'avatar'
	| 'badge'
	| 'brand-mark'
	| 'button'
	| 'calendar-grid'
	| 'card'
	| 'caret'
	| 'chart-frame'
	| 'chart-grid'
	| 'checkbox'
	| 'chip'
	| 'cluster'
	| 'code'
	| 'container'
	| 'token-rail'
	| 'composer-surface'
	| 'concept-connector'
	| 'concept-frame'
	| 'control-group'
	| 'data-surface'
	| 'delta'
	| 'dialog-surface'
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
	| 'disclosure-panel'
	| 'dock'
	| 'donut-ring'
	| 'drawer-surface'
	| 'dropzone'
	| 'empty-state'
	| 'field'
	| 'field-row'
	| 'flow-node'
	| 'frame'
	| 'grid'
	| 'header'
	| 'heading'
	| 'heatmap-grid'
	| 'icon'
	| 'icon-button'
	| 'indicator'
	| 'inline'
	| 'input'
	| 'kbd'
	| 'label'
	| 'legend'
	| 'link'
	| 'listbox'
	| 'menu-group'
	| 'menu-surface'
	| 'message-bubble'
	| 'option-row'
	| 'overlay'
	| 'panel'
	| 'pagination'
	| 'picker-button'
	| 'picker-surface'
	| 'pill'
	| 'plot'
	| 'progress'
	| 'radio'
	| 'rail'
	| 'range'
	| 'row'
	| 'scale-frame'
	| 'scroll-area'
	| 'search-input'
	| 'select'
	| 'section'
	| 'series-bar'
	| 'series-line'
	| 'series-point'
	| 'skeleton'
	| 'slider'
	| 'sparkline'
	| 'spinner'
	| 'split'
	| 'stack'
	| 'stat'
	| 'stepper'
	| 'surface'
	| 'switch'
	| 'tag'
	| 'table'
	| 'target-line'
	| 'textarea'
	| 'text'
	| 'time-list'
	| 'tilt-frame'
	| 'token'
	| 'tooltip'
	| 'tool-call-panel'
	| 'toolbar-control'
	| 'trace-panel'
	| 'transcript-item'
	| 'upload-field'
	| 'upload-item'
	| 'validation-list'
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
	| 'footer'
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
	| 'nav'
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
