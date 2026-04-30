import type { ButtonHTMLAttributes, ReactElement } from 'react'
import type { IconName } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { Button, type ButtonSize, type ButtonVariant } from '../button'
import { cn } from '../utils'

type IconButtonElementProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'style'>

export type IconButtonProps = IconButtonElementProps & {
	icon: IconName | ReactElement
	label: string
	pressed?: boolean
	size?: ButtonSize
	variant?: ButtonVariant
}

export function IconButton({
	className,
	icon,
	label,
	pressed = false,
	size = 'medium',
	variant = 'ghost',
	...props
}: IconButtonProps) {
	return (
		<Button
			aria-label={label}
			className={cn(concreteClassNames.iconButton, className)}
			iconOnly
			leadingIcon={icon}
			pressed={pressed}
			size={size}
			variant={variant}
			{...props}
		/>
	)
}
