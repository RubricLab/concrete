import type {
	InputHTMLAttributes,
	ReactElement,
	ReactNode,
	SelectHTMLAttributes,
	TextareaHTMLAttributes
} from 'react'
import { ConcreteIcon, type IconName } from '../icons'
import classes from './primitives.module.css'
import { cn } from './utils'

type IconSlot = IconName | ReactElement

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
	error?: ReactNode
	help?: ReactNode
	label?: ReactNode
	leadingIcon?: IconSlot
}

export function Input({ className, error, help, id, label, leadingIcon, ...props }: InputProps) {
	return (
		<div className={cn(classes.field, className)}>
			{label ? (
				<label className={classes.label} htmlFor={id}>
					{label}
				</label>
			) : null}
			<span className={classes.inputWrap}>
				{leadingIcon ? <span className={classes.inputIcon}>{renderIconSlot(leadingIcon)}</span> : null}
				<input
					aria-invalid={Boolean(error)}
					className={cn(
						classes.input,
						Boolean(leadingIcon) && classes.inputHasIcon,
						Boolean(error) && classes.inputError
					)}
					id={id}
					{...props}
				/>
			</span>
			{error ? <span className={cn(classes.help, classes.helpError)}>{error}</span> : null}
			{!error && help ? <span className={classes.help}>{help}</span> : null}
		</div>
	)
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	error?: ReactNode
	help?: ReactNode
	label?: ReactNode
}

export function Textarea({ className, error, help, id, label, ...props }: TextareaProps) {
	return (
		<div className={cn(classes.field, className)}>
			{label ? (
				<label className={classes.label} htmlFor={id}>
					{label}
				</label>
			) : null}
			<textarea
				aria-invalid={Boolean(error)}
				className={cn(classes.input, classes.textarea, Boolean(error) && classes.inputError)}
				id={id}
				{...props}
			/>
			{error ? <span className={cn(classes.help, classes.helpError)}>{error}</span> : null}
			{!error && help ? <span className={classes.help}>{help}</span> : null}
		</div>
	)
}

export type SelectOption = {
	disabled?: boolean
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
		<div className={cn(classes.field, className)}>
			{label ? (
				<label className={classes.label} htmlFor={id}>
					{label}
				</label>
			) : null}
			<span className={cn(classes.inputWrap, classes.selectWrap)}>
				<select
					aria-invalid={Boolean(error)}
					className={cn(classes.input, classes.select, Boolean(error) && classes.inputError)}
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
			{error ? <span className={cn(classes.help, classes.helpError)}>{error}</span> : null}
			{!error && help ? <span className={classes.help}>{help}</span> : null}
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
