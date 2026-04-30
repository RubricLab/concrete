import type { InputHTMLAttributes, MouseEventHandler, ReactElement, ReactNode } from 'react'
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

type InputControlActionProps = {
	action: ReactNode
	actionLabel: string
	actionPressed?: boolean | undefined
	onActionClick: MouseEventHandler<HTMLButtonElement>
}

type InputControlStaticProps = {
	action?: undefined
	actionLabel?: undefined
	actionPressed?: undefined
	onActionClick?: undefined
}

export type InputControlProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
	invalid?: boolean | undefined
} & (InputControlActionProps | InputControlStaticProps)

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

export function InputControl({
	action,
	actionLabel,
	actionPressed,
	className,
	invalid,
	onActionClick,
	...props
}: InputControlProps) {
	return (
		<span className={concreteClassNames.formControlWrap}>
			<input
				aria-invalid={invalid}
				className={cn(concreteClassNames.formControl, className)}
				{...props}
			/>
			{action ? (
				<button
					aria-label={actionLabel}
					aria-pressed={actionPressed}
					className={concreteClassNames.formControlIconButton}
					onClick={onActionClick}
					type="button"
				>
					{action}
				</button>
			) : null}
		</span>
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
