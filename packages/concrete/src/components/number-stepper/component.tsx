'use client'

import type { InputHTMLAttributes } from 'react'
import { useState } from 'react'
import { Field, StepperAction, StepperControl, StepperInput } from '../../primitives'
import {
	clampOptionalNumber,
	type FieldChromeProps,
	getNumber,
	getOptionalNumber
} from '../../utilities/form-field-helpers'

export type NumberStepperProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> &
	FieldChromeProps & {
		defaultValue?: number | undefined
		onValueChange?: ((value: number) => void) | undefined
		value?: number | undefined
	}

export function NumberStepper({
	className,
	defaultValue = 0,
	description,
	error,
	help,
	id,
	label,
	max,
	min,
	onValueChange,
	optional,
	required,
	step = 1,
	success,
	value,
	...props
}: NumberStepperProps) {
	const [internalValue, setInternalValue] = useState(defaultValue)
	const currentValue = value ?? internalValue
	const disabled = Boolean(props.disabled)
	const minimum = getOptionalNumber(min)
	const maximum = getOptionalNumber(max)
	const stepValue = getNumber(step, 1)
	const canDecrement = !disabled && (minimum === undefined || currentValue > minimum)
	const canIncrement = !disabled && (maximum === undefined || currentValue < maximum)

	function commitValue(nextValue: number) {
		const clampedValue = clampOptionalNumber(nextValue, minimum, maximum)

		if (value === undefined) {
			setInternalValue(clampedValue)
		}

		onValueChange?.(clampedValue)
	}

	return (
		<Field
			className={className}
			description={description}
			error={error}
			help={help}
			htmlFor={id}
			label={label}
			optional={optional}
			required={required}
			success={success}
		>
			<StepperControl disabled={disabled}>
				<StepperAction
					disabled={!canDecrement}
					direction="decrement"
					onClick={() => commitValue(currentValue - stepValue)}
				/>
				<StepperInput
					id={id}
					invalid={Boolean(error)}
					max={max}
					min={min}
					onChange={event => commitValue(getNumber(event.currentTarget.value, currentValue))}
					step={step}
					value={currentValue}
					{...props}
				/>
				<StepperAction
					disabled={!canIncrement}
					direction="increment"
					onClick={() => commitValue(currentValue + stepValue)}
				/>
			</StepperControl>
		</Field>
	)
}
