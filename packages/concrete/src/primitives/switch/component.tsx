import type { InputHTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	label?: ReactNode
}

export function Switch({ checked, className, label, ...props }: SwitchProps) {
	return (
		<label className={cn(concreteClassNames.switch, className)}>
			<input
				checked={checked}
				className={concreteClassNames.visuallyHidden}
				type="checkbox"
				{...props}
			/>
			<span
				aria-hidden
				className={cn(concreteClassNames.switchTrack, checked && concreteClassNames.switchChecked)}
			/>
			{label}
		</label>
	)
}
