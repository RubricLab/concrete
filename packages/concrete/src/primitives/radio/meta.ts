import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type RadioMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const radioMeta = {
	category: 'form',
	description: 'Exclusive choice primitive with the same row rhythm as checkbox.',
	guidance:
		'Radio is for one-of-many selection where every option remains visible in a compact row.',
	name: 'Radio',
	pressure: ['product'],
	props: [
		prop('checked', 'boolean', 'Controlled checked state.'),
		prop('defaultChecked', 'boolean', 'Uncontrolled checked state.'),
		prop('label', 'ReactNode', 'Inline label rendered beside the control.'),
		prop('disabled', 'boolean', 'Native disabled behavior and opacity.')
	]
} as const satisfies RadioMeta
