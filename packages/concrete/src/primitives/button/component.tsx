import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import { concreteClassNames, getConcreteClassName } from '../../styles/class-names'
import { cn } from '../utils'

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

type IconSlot = IconName | ReactElement

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

const buttonVariantClassNames = {
	danger: getConcreteClassName('buttonDanger'),
	ghost: getConcreteClassName('buttonGhost'),
	primary: getConcreteClassName('buttonPrimary'),
	secondary: getConcreteClassName('buttonSecondary'),
	sky: getConcreteClassName('buttonSky'),
	'sky-soft': getConcreteClassName('buttonSkySoft'),
	soft: getConcreteClassName('buttonSoft'),
	ultra: getConcreteClassName('buttonUltra')
} satisfies Record<ButtonVariant, string>

const buttonSizeClassNames = {
	large: getConcreteClassName('buttonLarge'),
	medium: undefined,
	small: getConcreteClassName('buttonSmall'),
	tiny: getConcreteClassName('buttonTiny')
} satisfies Record<ButtonSize, string | undefined>

const shortcutKeyLabels: Record<string, string> = {
	alt: '⌥',
	cmd: '⌘',
	command: '⌘',
	enter: '↵',
	meta: '⌘',
	option: '⌥',
	return: '↵',
	shift: '⇧'
}

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
	const leadingIconNode =
		typeof leadingIcon === 'string' ? <ConcreteIcon name={leadingIcon} /> : leadingIcon
	const trailingIconNode =
		typeof trailingIcon === 'string' ? <ConcreteIcon name={trailingIcon} /> : trailingIcon

	return (
		<button
			{...props}
			className={cn(
				concreteClassNames.button,
				buttonVariantClassNames[variant],
				buttonSizeClassNames[size],
				iconOnly && concreteClassNames.buttonIcon,
				className
			)}
			data-loading={loading ? true : undefined}
			data-pressed={pressed ? true : undefined}
			data-variant={variant}
			disabled={disabled || loading}
			type={type}
		>
			{loading ? <span aria-hidden className={concreteClassNames.spinner} /> : leadingIconNode}
			{children}
			{trailingIconNode}
			{shortcut && shortcut.length > 0 ? (
				<span className={concreteClassNames.buttonShortcut}>
					{shortcut.map((shortcutKey, shortcutIndex) => (
						<span
							className={cn(concreteClassNames.kbd, concreteClassNames.buttonKbd)}
							key={`${shortcutKey}-${shortcutIndex}`}
						>
							{shortcutKeyLabels[shortcutKey.toLowerCase()] ?? shortcutKey}
						</span>
					))}
				</span>
			) : null}
		</button>
	)
}
