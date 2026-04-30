import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type PickerControlProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode
	icon?: IconName | undefined
	open?: boolean | undefined
}

export function PickerControl({
	children,
	className,
	icon = 'calendar',
	open = false,
	type = 'button',
	...props
}: PickerControlProps) {
	return (
		<button
			className={cn(concreteClassNames.pickerControl, className)}
			data-open={open ? true : undefined}
			type={type}
			{...props}
		>
			<span>{children}</span>
			<ConcreteIcon name={icon} />
		</button>
	)
}
