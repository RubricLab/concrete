import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type CheckboxMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const checkboxMeta = {
	category: 'form',
	description: 'Binary selection primitive with compact row alignment.',
	guidance: 'Checkbox is the compact binary choice atom for dense forms and list selection.',
	name: 'Checkbox',
	pressure: ['product'],
	props: [
		prop('checked', 'boolean', 'Controlled checked state.'),
		prop('defaultChecked', 'boolean', 'Uncontrolled checked state.'),
		prop('label', 'ReactNode', 'Inline label rendered beside the control.'),
		prop('disabled', 'boolean', 'Native disabled behavior and opacity.')
	]
} as const satisfies CheckboxMeta
