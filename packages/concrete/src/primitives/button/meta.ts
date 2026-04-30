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
	description: 'Tight command control with loading, icon, shortcut, and variant states.',
	guidance:
		'Buttons are short commands. Use primary for the one dominant action, sky for pointer moments, ultra for upgrade/pro moments, and danger only for destructive actions.',
	name: 'Button',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'variant',
			"'primary' | 'secondary' | 'soft' | 'ghost' | 'sky' | 'sky-soft' | 'ultra' | 'danger'",
			'Visual role of the command.',
			'secondary'
		),
		prop(
			'size',
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
