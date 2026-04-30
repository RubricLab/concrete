import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SwitchMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const switchMeta = {
	category: 'form',
	description: 'Binary setting control for product preferences and modes.',
	guidance: 'Switches are for durable on/off settings, not one-shot commands.',
	name: 'Switch',
	pressure: ['product'],
	props: [
		prop('checked', 'boolean', 'Controlled checked state.'),
		prop('defaultChecked', 'boolean', 'Uncontrolled checked state.'),
		prop('label', 'ReactNode', 'Inline label rendered beside the control.'),
		prop('disabled', 'boolean', 'Native disabled behavior and opacity.')
	]
} as const satisfies SwitchMeta
