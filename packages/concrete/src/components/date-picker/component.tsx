'use client'

import type { HTMLAttributes } from 'react'
import { useState } from 'react'
import { CalendarGrid, Field, PickerButton, PickerSurface } from '../../primitives'
import {
	formatDateLabel,
	getMonthStart,
	getTodayIsoDate,
	isDateSelectable
} from '../../utilities/calendar-view'
import type { FieldChromeProps } from '../../utilities/form-field-helpers'

export type DatePickerProps = Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> &
	FieldChromeProps & {
		defaultOpen?: boolean | undefined
		defaultValue?: string | undefined
		max?: string | undefined
		min?: string | undefined
		onValueChange?: ((value: string) => void) | undefined
		value?: string | undefined
	}

export function DatePicker({
	className,
	defaultOpen = false,
	defaultValue = getTodayIsoDate(),
	description,
	error,
	help,
	label,
	max,
	min,
	onValueChange,
	optional,
	required,
	success,
	value,
	...props
}: DatePickerProps) {
	const [internalValue, setInternalValue] = useState(defaultValue)
	const [open, setOpen] = useState(defaultOpen)
	const currentValue = value ?? internalValue
	const [visibleMonth, setVisibleMonth] = useState(() => getMonthStart(currentValue))

	function commitValue(nextValue: string) {
		if (!isDateSelectable(nextValue, min, max)) {
			return
		}

		if (value === undefined) {
			setInternalValue(nextValue)
		}

		onValueChange?.(nextValue)
		setOpen(false)
	}

	function toggleOpen() {
		setOpen(current => {
			const nextOpen = !current

			if (nextOpen) {
				setVisibleMonth(getMonthStart(currentValue))
			}

			return nextOpen
		})
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
			<PickerSurface open={open} {...props}>
				<PickerButton onClick={toggleOpen} open={open}>
					{formatDateLabel(currentValue)}
				</PickerButton>
				{open ? (
					<CalendarGrid
						max={max}
						min={min}
						month={visibleMonth}
						onMonthChange={setVisibleMonth}
						onSelect={commitValue}
						selectedEnd={currentValue}
						selectedStart={currentValue}
					/>
				) : null}
			</PickerSurface>
		</Field>
	)
}
