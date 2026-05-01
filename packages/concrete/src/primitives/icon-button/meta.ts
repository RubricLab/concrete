import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type IconButtonMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const iconButtonMeta = {
	category: 'control',
	description: 'Square icon command primitive backed by Button semantics.',
	guidance: 'Use IconButton instead of icon-only Button when the command has no visible text label.',
	name: 'IconButton',
	pressure: ['product', 'generative'],
	props: [
		prop('icon', 'IconName | ReactElement', 'Visible icon slot.'),
		prop('label', 'string', 'Accessible command label.'),
		prop('hierarchy', 'ButtonHierarchy', 'Button hierarchy recipe.'),
		prop('intent', 'ButtonIntent', 'Button intent recipe.'),
		prop('density', 'ButtonDensity', 'Square button rhythm.'),
		prop('pressed', 'boolean', 'Pressed state.')
	]
} as const satisfies IconButtonMeta
