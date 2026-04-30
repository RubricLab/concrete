import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type PickerButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> & {
	children: ReactNode
	icon?: IconName
	open?: boolean
}

export function PickerButton({
	children,
	className,
	icon = 'calendar',
	open = false,
	type = 'button',
	...props
}: PickerButtonProps) {
	return (
		<button
			aria-expanded={open}
			className={cn(concreteClassNames.pickerButton, className)}
			data-open={open ? true : undefined}
			type={type}
			{...props}
		>
			<span className={concreteClassNames.pickerButtonLabel}>{children}</span>
			<ConcreteIcon name={icon} />
		</button>
	)
}
