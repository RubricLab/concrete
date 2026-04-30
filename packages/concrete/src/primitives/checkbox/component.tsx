import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type ChoiceRowProps = LabelHTMLAttributes<HTMLLabelElement> & {
	children: ReactNode
}

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	label?: ReactNode
}

export function Checkbox({ checked, className, label, ...props }: CheckboxProps) {
	return (
		<ChoiceRow className={className}>
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
		</ChoiceRow>
	)
}

export function ChoiceRow({ children, className, ...props }: ChoiceRowProps) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: ChoiceRow callers render the native input as a child.
		<label className={cn(concreteClassNames.checkRow, className)} {...props}>
			{children}
		</label>
	)
}
