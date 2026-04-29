import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'
import { z } from 'zod/v4'
import { ConcreteIcon, type IconName } from '../icons'
import {
	booleanControl,
	iconOptions,
	selectControl,
	selectOptionsControl,
	textControl
} from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

export type ButtonSize = 'tiny' | 'small' | 'medium' | 'large'
export type ButtonVariant =
	| 'danger'
	| 'ghost'
	| 'primary'
	| 'secondary'
	| 'sky'
	| 'sky-soft'
	| 'soft'
	| 'ultra'

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	children?: ReactNode
	iconOnly?: boolean
	leadingIcon?: IconSlot
	loading?: boolean
	pressed?: boolean
	shortcut?: readonly string[]
	size?: ButtonSize
	trailingIcon?: IconSlot
	variant?: ButtonVariant
}

type IconSlot = IconName | ReactElement

export function Button({
	children,
	className,
	disabled,
	iconOnly = false,
	leadingIcon,
	loading = false,
	pressed = false,
	shortcut,
	size = 'medium',
	trailingIcon,
	type = 'button',
	variant = 'secondary',
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			className={cn(
				concreteClassNames.button,
				getButtonVariantClass(variant),
				getButtonSizeClass(size),
				iconOnly && concreteClassNames.buttonIcon,
				className
			)}
			data-loading={loading ? true : undefined}
			data-pressed={pressed ? true : undefined}
			data-variant={variant}
			disabled={disabled || loading}
			type={type}
		>
			{loading ? (
				<span aria-hidden className={concreteClassNames.spinner} />
			) : (
				renderIconSlot(leadingIcon)
			)}
			{children}
			{renderIconSlot(trailingIcon)}
			{shortcut && shortcut.length > 0 ? (
				<span className={concreteClassNames.buttonShortcut}>
					{shortcut.map((shortcutKey, shortcutIndex) => (
						<span
							className={cn(concreteClassNames.kbd, concreteClassNames.buttonKbd)}
							key={`${shortcutKey}-${shortcutIndex}`}
						>
							{formatShortcutKey(shortcutKey)}
						</span>
					))}
				</span>
			) : null}
		</button>
	)
}

export const buttonPropsSchema = z
	.object({
		disabled: z.boolean().default(false),
		iconOnly: z.boolean().default(false),
		label: z.string().default('Continue'),
		leadingIcon: z.string().optional(),
		loading: z.boolean().default(false),
		pressed: z.boolean().default(false),
		size: z.enum(['tiny', 'small', 'medium', 'large']).default('medium'),
		trailingIcon: z.string().optional(),
		variant: z
			.enum(['danger', 'ghost', 'primary', 'secondary', 'sky', 'sky-soft', 'soft', 'ultra'])
			.default('secondary')
	})
	.strict()

export const buttonPrimitiveDefinition = defineConcretePrimitive({
	category: 'control',
	component: Button,
	controls: [
		selectControl('variant', 'Variant', 'secondary', [
			'primary',
			'secondary',
			'soft',
			'ghost',
			'sky',
			'sky-soft',
			'ultra',
			'danger'
		]),
		selectControl('size', 'Size', 'medium', ['tiny', 'small', 'medium', 'large']),
		selectOptionsControl('leadingIcon', 'Leading icon', '', iconOptions),
		selectOptionsControl('trailingIcon', 'Trailing icon', '', iconOptions),
		textControl('label', 'Label', 'Continue'),
		booleanControl('pressed', 'Pressed', 'false'),
		booleanControl('loading', 'Loading', 'false'),
		booleanControl('disabled', 'Disabled', 'false')
	],
	description: 'Tight command control with loading, icon, shortcut, and variant states.',
	guidance:
		'Buttons are short commands. Use primary for the one dominant action, sky for pointer moments, ultra for upgrade/pro moments, and danger only for destructive actions.',
	kind: 'primitive',
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
	],
	renderExample: renderButtonExample,
	schema: buttonPropsSchema,
	slug: 'button',
	states: states([
		['default', 'Variants, icon, and shortcut states.'],
		['signal', 'Ultra and destructive signal actions.'],
		['pressed', 'Keyboard-triggered active affordance with highlighted keycaps.'],
		['loading', 'Disabled pending command state.']
	])
})

function renderButtonExample(state = 'default') {
	switch (state) {
		case 'loading':
			return (
				<Frame>
					<Button loading variant="primary">
						Saving
					</Button>
				</Frame>
			)
		case 'signal':
			return (
				<Frame>
					<Button leadingIcon="sparkles" variant="ultra">
						Upgrade
					</Button>
					<Button leadingIcon="trash-2" variant="danger">
						Delete
					</Button>
				</Frame>
			)
		case 'pressed':
			return (
				<Frame>
					<Button pressed shortcut={['cmd', 'enter']} variant="primary">
						Send
					</Button>
					<Button pressed shortcut={['cmd', 'K']} variant="secondary">
						Search
					</Button>
					<Button pressed iconOnly leadingIcon="search" variant="soft" />
				</Frame>
			)
		default:
			return (
				<Frame>
					<Button leadingIcon="plus" variant="primary">
						New
					</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="soft">Soft</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="sky-soft">Sky soft</Button>
					<Button shortcut={['cmd', 'enter']} variant="sky">
						Ship
					</Button>
				</Frame>
			)
	}
}

function renderIconSlot(icon: IconSlot | undefined): ReactNode {
	switch (typeof icon) {
		case 'string':
			return <ConcreteIcon name={icon} />
		default:
			return icon
	}
}

function getButtonVariantClass(variant: ButtonVariant): string | undefined {
	switch (variant) {
		case 'danger':
			return concreteClassNames.buttonDanger
		case 'ghost':
			return concreteClassNames.buttonGhost
		case 'primary':
			return concreteClassNames.buttonPrimary
		case 'sky':
			return concreteClassNames.buttonSky
		case 'sky-soft':
			return concreteClassNames.buttonSkySoft
		case 'soft':
			return concreteClassNames.buttonSoft
		case 'ultra':
			return concreteClassNames.buttonUltra
		case 'secondary':
			return concreteClassNames.buttonSecondary
	}
}

function getButtonSizeClass(size: ButtonSize): string | undefined {
	switch (size) {
		case 'large':
			return concreteClassNames.buttonLarge
		case 'medium':
			return undefined
		case 'small':
			return concreteClassNames.buttonSmall
		case 'tiny':
			return concreteClassNames.buttonTiny
	}
}

function formatShortcutKey(shortcutKey: string): string {
	switch (shortcutKey.toLowerCase()) {
		case 'cmd':
		case 'command':
		case 'meta':
			return '⌘'
		case 'enter':
		case 'return':
			return '↵'
		case 'shift':
			return '⇧'
		case 'option':
		case 'alt':
			return '⌥'
		default:
			return shortcutKey
	}
}
