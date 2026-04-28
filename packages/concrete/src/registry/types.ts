import type { ConcretePressure, PrimitiveCategory } from '../schemas'

export type PrimitiveSlug =
	| 'avatar'
	| 'badge'
	| 'brand-mark'
	| 'bubble'
	| 'button'
	| 'card'
	| 'caret'
	| 'checkbox'
	| 'chip'
	| 'code'
	| 'delta'
	| 'distribution'
	| 'divider'
	| 'dropzone'
	| 'empty-state'
	| 'field'
	| 'focus-ring'
	| 'frame'
	| 'icon'
	| 'indicator'
	| 'input'
	| 'kbd'
	| 'link'
	| 'pill'
	| 'progress'
	| 'radio'
	| 'row'
	| 'select'
	| 'skeleton'
	| 'slider'
	| 'sparkline'
	| 'spinner'
	| 'stat'
	| 'switch'
	| 'tag'
	| 'textarea'
	| 'texture'
	| 'tooltip'
	| 'upload-item'
	| 'wordmark'

export type ComponentSlug =
	| 'command-menu'
	| 'composer'
	| 'date-picker'
	| 'date-range-picker'
	| 'file-upload'
	| 'form-dialog'
	| 'form-drawer'
	| 'form-shell'
	| 'image-upload'
	| 'message'
	| 'multi-select'
	| 'number-stepper'
	| 'password-input'
	| 'range-slider'
	| 'reasoning-message'
	| 'search-bar'
	| 'settings-panel'
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
