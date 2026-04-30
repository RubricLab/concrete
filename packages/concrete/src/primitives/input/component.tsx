import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

type IconSlot = IconName | ReactElement

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
	error?: ReactNode
	help?: ReactNode
	label?: ReactNode
	leadingIcon?: IconSlot | undefined
}

export function Input({ className, error, help, id, label, leadingIcon, ...props }: InputProps) {
	return (
		<div className={cn(concreteClassNames.field, className)}>
			{label ? (
				<label className={concreteClassNames.label} htmlFor={id}>
					{label}
				</label>
			) : null}
			<span className={concreteClassNames.inputWrap}>
				{leadingIcon ? (
					<span className={concreteClassNames.inputIcon}>{renderIconSlot(leadingIcon)}</span>
				) : null}
				<input
					aria-invalid={Boolean(error)}
					className={cn(
						concreteClassNames.input,
						Boolean(leadingIcon) && concreteClassNames.inputHasIcon,
						Boolean(error) && concreteClassNames.inputError
					)}
					id={id}
					{...props}
				/>
			</span>
			{error ? (
				<span className={cn(concreteClassNames.help, concreteClassNames.helpError)}>{error}</span>
			) : null}
			{!error && help ? <span className={concreteClassNames.help}>{help}</span> : null}
		</div>
	)
}

function renderIconSlot(icon: IconSlot | undefined): ReactNode {
	switch (typeof icon) {
		case 'string':
			return <ConcreteIcon name={icon} />
		default:
			return icon
	}
}
