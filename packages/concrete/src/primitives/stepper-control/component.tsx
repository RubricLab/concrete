import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type StepperDirection = 'decrement' | 'increment'

export type StepperControlProps = HTMLAttributes<HTMLDivElement> & {
	disabled?: boolean | undefined
}

export function StepperControl({ className, disabled = false, ...props }: StepperControlProps) {
	return (
		<div
			className={cn(concreteClassNames.numberStepper, className)}
			data-disabled={disabled ? true : undefined}
			{...props}
		/>
	)
}

export type StepperActionProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'children' | 'type'
> & {
	direction: StepperDirection
}

export function StepperAction({
	'aria-label': ariaLabel,
	className,
	direction,
	...props
}: StepperActionProps) {
	return (
		<button
			aria-label={ariaLabel ?? getStepperActionLabel(direction)}
			className={className}
			type="button"
			{...props}
		>
			<ConcreteIcon name={direction === 'decrement' ? 'minus' : 'plus'} />
		</button>
	)
}

export type StepperInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	invalid?: boolean | undefined
}

export function StepperInput({ invalid, ...props }: StepperInputProps) {
	return <input aria-invalid={invalid} inputMode="numeric" type="number" {...props} />
}

function getStepperActionLabel(direction: StepperDirection): string {
	switch (direction) {
		case 'decrement':
			return 'Decrease value'
		case 'increment':
			return 'Increase value'
	}
}
