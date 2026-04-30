import type { ReactNode, SelectHTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type SelectOption = {
	disabled?: boolean | undefined
	label: string
	value: string
}

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
	error?: ReactNode
	help?: ReactNode
	label?: ReactNode
	options: readonly SelectOption[]
}

export function Select({ className, error, help, id, label, options, ...props }: SelectProps) {
	return (
		<div className={cn(concreteClassNames.field, className)}>
			{label ? (
				<label className={concreteClassNames.label} htmlFor={id}>
					{label}
				</label>
			) : null}
			<span className={cn(concreteClassNames.inputWrap, concreteClassNames.selectWrap)}>
				<select
					aria-invalid={Boolean(error)}
					className={cn(
						concreteClassNames.input,
						concreteClassNames.select,
						Boolean(error) && concreteClassNames.inputError
					)}
					id={id}
					{...props}
				>
					{options.map(option => (
						<option disabled={option.disabled} key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</span>
			{error ? (
				<span className={cn(concreteClassNames.help, concreteClassNames.helpError)}>{error}</span>
			) : null}
			{!error && help ? <span className={concreteClassNames.help}>{help}</span> : null}
		</div>
	)
}
