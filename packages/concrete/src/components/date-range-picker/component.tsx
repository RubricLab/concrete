'use client'

import type { HTMLAttributes } from 'react'
import { useState } from 'react'
import { CalendarGrid, Field, PickerButton, PickerSurface } from '../../primitives'
import type { DateRangeValue } from '../../schemas'
import {
	addDays,
	formatRangeLabel,
	getMonthStart,
	getNextRangeValue,
	getTodayIsoDate,
	isDateSelectable
} from '../../utilities/calendar-view'
import type { FieldChromeProps } from '../../utilities/form-field-helpers'

export type DateRangePickerProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	'defaultValue' | 'onChange'
> &
	FieldChromeProps & {
		defaultOpen?: boolean | undefined
		defaultValue?: DateRangeValue | undefined
		max?: string | undefined
		min?: string | undefined
		onValueChange?: ((value: DateRangeValue) => void) | undefined
		value?: DateRangeValue | undefined
	}

export function DateRangePicker({
	className,
	defaultOpen = false,
	defaultValue = { end: addDays(getTodayIsoDate(), 7), start: getTodayIsoDate() },
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
}: DateRangePickerProps) {
	const [internalValue, setInternalValue] = useState<DateRangeValue>(defaultValue)
	const [open, setOpen] = useState(defaultOpen)
	const currentValue = value ?? internalValue
	const [visibleMonth, setVisibleMonth] = useState(() =>
		getMonthStart(currentValue.start ?? getTodayIsoDate())
	)

	function commitValue(nextDate: string) {
		if (!isDateSelectable(nextDate, min, max)) {
			return
		}

		const nextValue = getNextRangeValue(currentValue, nextDate)

		if (value === undefined) {
			setInternalValue(nextValue)
		}

		onValueChange?.(nextValue)

		if (nextValue.end) {
			setOpen(false)
		}
	}

	function toggleOpen() {
		setOpen(current => {
			const nextOpen = !current

			if (nextOpen) {
				setVisibleMonth(getMonthStart(currentValue.start ?? getTodayIsoDate()))
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
					{formatRangeLabel(currentValue)}
				</PickerButton>
				{open ? (
					<CalendarGrid
						max={max}
						min={min}
						month={visibleMonth}
						onMonthChange={setVisibleMonth}
						onSelect={commitValue}
						selectedEnd={currentValue.end}
						selectedStart={currentValue.start}
					/>
				) : null}
			</PickerSurface>
		</Field>
	)
}
