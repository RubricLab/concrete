import type { ButtonHTMLAttributes, ReactElement } from 'react'
import type { IconName } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { Button, type ButtonDensity, type ButtonHierarchy, type ButtonIntent } from '../button'
import { cn } from '../utils'

type IconButtonElementProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'style'>

export type IconButtonProps = IconButtonElementProps & {
	density?: ButtonDensity
	hierarchy?: ButtonHierarchy
	icon: IconName | ReactElement
	intent?: ButtonIntent
	label: string
	pressed?: boolean
}

export function IconButton({
	className,
	density,
	hierarchy,
	icon,
	intent,
	label,
	pressed = false,
	...props
}: IconButtonProps) {
	return (
		<Button
			aria-label={label}
			className={cn(concreteClassNames.iconButton, className)}
			iconOnly
			leadingIcon={icon}
			pressed={pressed}
			density={density ?? 'medium'}
			hierarchy={hierarchy ?? 'ghost'}
			intent={intent ?? 'neutral'}
			{...props}
		/>
	)
}
