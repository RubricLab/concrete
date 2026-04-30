import type { ReactNode, TextareaHTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	error?: ReactNode
	help?: ReactNode
	label?: ReactNode
}

export function Textarea({ className, error, help, id, label, ...props }: TextareaProps) {
	return (
		<div className={cn(concreteClassNames.field, className)}>
			{label ? (
				<label className={concreteClassNames.label} htmlFor={id}>
					{label}
				</label>
			) : null}
			<textarea
				aria-invalid={Boolean(error)}
				className={cn(
					concreteClassNames.input,
					concreteClassNames.textarea,
					Boolean(error) && concreteClassNames.inputError
				)}
				id={id}
				{...props}
			/>
			{error ? (
				<span className={cn(concreteClassNames.help, concreteClassNames.helpError)}>{error}</span>
			) : null}
			{!error && help ? <span className={concreteClassNames.help}>{help}</span> : null}
		</div>
	)
}
