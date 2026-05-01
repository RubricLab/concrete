import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ButtonMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const buttonMeta = {
	category: 'control',
	description: 'Tight command control with loading, icon, shortcut, and semantic states.',
	guidance:
		'Buttons are short commands. Use hierarchy for priority, intent for semantic color, and density for rhythm.',
	name: 'Button',
	pressure: ['product', 'generative'],
	props: [
		prop('hierarchy', "'primary' | 'secondary' | 'soft' | 'ghost'", 'Command priority.', 'secondary'),
		prop('intent', "'neutral' | 'sky' | 'ultra' | 'danger'", 'Command intent.', 'neutral'),
		prop(
			'density',
			"'tiny' | 'small' | 'medium' | 'large'",
			'Control height and type rhythm.',
			'medium'
		),
		prop('leadingIcon', 'IconName | ReactElement', 'Optional glyph before the label.'),
		prop('trailingIcon', 'IconName | ReactElement', 'Optional glyph after the label.'),
		prop('shortcut', 'readonly string[]', 'Keyboard hints rendered as Concrete keycaps.'),
		prop(
			'pressed',
			'boolean',
			'Temporary active affordance for keyboard-triggered or programmatic button activation.',
			'false'
		),
		prop(
			'loading',
			'boolean',
			'Replaces the leading slot with a spinner and disables the button.',
			'false'
		),
		prop('iconOnly', 'boolean', 'Locks the button to a square icon control.', 'false')
	]
} as const satisfies ButtonMeta
