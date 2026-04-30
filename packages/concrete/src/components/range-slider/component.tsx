'use client'

import type { HTMLAttributes } from 'react'
import { useState } from 'react'
import { Field, Range, RangeInput, RangeTrack, RangeValues } from '../../primitives'
import { type FieldChromeProps, getNumber, getPercent } from '../../utilities/form-field-helpers'

export type RangeSliderValue = readonly [number, number]

export type RangeSliderProps = Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> &
	FieldChromeProps & {
		defaultValue?: RangeSliderValue | undefined
		max?: number | undefined
		min?: number | undefined
		onValueChange?: ((value: RangeSliderValue) => void) | undefined
		step?: number | undefined
		value?: RangeSliderValue | undefined
	}

export function RangeSlider({
	className,
	defaultValue = [20, 80],
	description,
	error,
	help,
	label,
	max = 100,
	min = 0,
	onValueChange,
	optional,
	required,
	step = 1,
	success,
	value,
	...props
}: RangeSliderProps) {
	const [internalValue, setInternalValue] = useState<RangeSliderValue>(defaultValue)
	const currentValue = value ?? internalValue
	const lowerPercent = getPercent(currentValue[0], min, max)
	const upperPercent = getPercent(currentValue[1], min, max)

	function commitValue(index: 0 | 1, nextNumber: number) {
		const nextValue: RangeSliderValue =
			index === 0
				? [Math.min(nextNumber, currentValue[1]), currentValue[1]]
				: [currentValue[0], Math.max(nextNumber, currentValue[0])]

		if (value === undefined) {
			setInternalValue(nextValue)
		}

		onValueChange?.(nextValue)
	}

	return (
		<Field
			className={className}
			description={description}
			error={error}
			help={help}
			label={label}
			optional={optional}
			required={required}
			success={success}
		>
			<Range end={upperPercent} start={lowerPercent} {...props}>
				<RangeTrack />
				<RangeInput
					label="Minimum"
					max={max}
					min={min}
					onChange={event => commitValue(0, getNumber(event.currentTarget.value, currentValue[0]))}
					step={step}
					value={currentValue[0]}
				/>
				<RangeInput
					label="Maximum"
					max={max}
					min={min}
					onChange={event => commitValue(1, getNumber(event.currentTarget.value, currentValue[1]))}
					step={step}
					value={currentValue[1]}
				/>
				<RangeValues end={currentValue[1]} start={currentValue[0]} />
			</Range>
		</Field>
	)
}
