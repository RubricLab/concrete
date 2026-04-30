import type { InputHTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	label?: ReactNode
}

export function Checkbox({ checked, className, label, ...props }: CheckboxProps) {
	return (
		<label className={cn(concreteClassNames.checkRow, className)}>
			<input
				checked={checked}
				className={concreteClassNames.visuallyHidden}
				type="checkbox"
				{...props}
			/>
			<span
				aria-hidden
				className={cn(concreteClassNames.checkbox, checked && concreteClassNames.checkboxChecked)}
			>
				{checked ? <ConcreteIcon name="check" /> : null}
			</span>
			{label}
		</label>
	)
}
