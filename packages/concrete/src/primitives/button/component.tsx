import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import { concreteClassNames, getConcreteClassName } from '../../styles/class-names'
import { cn } from '../utils'

export type ButtonDensity = 'tiny' | 'small' | 'medium' | 'large'
export type ButtonHierarchy = 'ghost' | 'primary' | 'secondary' | 'soft'
export type ButtonIntent = 'danger' | 'neutral' | 'sky' | 'ultra'
type ButtonClassRecipe =
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
	density?: ButtonDensity
	hierarchy?: ButtonHierarchy
	iconOnly?: boolean
	intent?: ButtonIntent
	leadingIcon?: IconSlot
	loading?: boolean
	pressed?: boolean
	shortcut?: readonly string[]
	trailingIcon?: IconSlot
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
} satisfies Record<ButtonClassRecipe, string>

const buttonDensityClassNames = {
	large: getConcreteClassName('buttonLarge'),
	medium: undefined,
	small: getConcreteClassName('buttonSmall'),
	tiny: getConcreteClassName('buttonTiny')
} satisfies Record<ButtonDensity, string | undefined>

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
	density,
	disabled,
	hierarchy,
	iconOnly = false,
	intent,
	leadingIcon,
	loading = false,
	pressed = false,
	shortcut,
	trailingIcon,
	type = 'button',
	...props
}: ButtonProps) {
	const resolvedDensity = density ?? 'medium'
	const resolvedHierarchy = hierarchy ?? 'secondary'
	const resolvedIntent = intent ?? 'neutral'
	const resolvedVariant = resolveButtonClassRecipe(resolvedHierarchy, resolvedIntent)
	const leadingIconNode =
		typeof leadingIcon === 'string' ? <ConcreteIcon name={leadingIcon} /> : leadingIcon
	const trailingIconNode =
		typeof trailingIcon === 'string' ? <ConcreteIcon name={trailingIcon} /> : trailingIcon

	return (
		<button
			{...props}
			className={cn(
				concreteClassNames.button,
				buttonVariantClassNames[resolvedVariant],
				buttonDensityClassNames[resolvedDensity],
				iconOnly && concreteClassNames.buttonIcon,
				className
			)}
			data-hierarchy={resolvedHierarchy}
			data-intent={resolvedIntent}
			data-loading={loading ? true : undefined}
			data-pressed={pressed ? true : undefined}
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

function resolveButtonClassRecipe(
	hierarchy: ButtonHierarchy,
	intent: ButtonIntent
): ButtonClassRecipe {
	switch (intent) {
		case 'danger':
			return 'danger'
		case 'sky':
			return hierarchy === 'soft' ? 'sky-soft' : 'sky'
		case 'ultra':
			return 'ultra'
		case 'neutral':
			return hierarchy
	}
}
