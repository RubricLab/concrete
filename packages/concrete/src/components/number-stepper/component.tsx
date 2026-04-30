'use client'

import type { InputHTMLAttributes } from 'react'
import { useState } from 'react'
import { ConcreteIcon } from '../../icons'
import { Field } from '../../primitives'
import { concreteClassNames } from '../../styles/class-names'
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
			<div className={concreteClassNames.numberStepper} data-disabled={disabled ? true : undefined}>
				<button
					aria-label="Decrease value"
					disabled={!canDecrement}
					onClick={() => commitValue(currentValue - stepValue)}
					type="button"
				>
					<ConcreteIcon name="minus" />
				</button>
				<input
					aria-invalid={Boolean(error)}
					id={id}
					inputMode="numeric"
					max={max}
					min={min}
					onChange={event => commitValue(getNumber(event.currentTarget.value, currentValue))}
					step={step}
					type="number"
					value={currentValue}
					{...props}
				/>
				<button
					aria-label="Increase value"
					disabled={!canIncrement}
					onClick={() => commitValue(currentValue + stepValue)}
					type="button"
				>
					<ConcreteIcon name="plus" />
				</button>
			</div>
		</Field>
	)
}
