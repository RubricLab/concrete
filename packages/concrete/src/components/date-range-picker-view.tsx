'use client'

import type { HTMLAttributes } from 'react'
import { useState } from 'react'
import { ConcreteIcon } from '../icons'
import { Field } from '../primitives'
import type { DateRangeValue } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import {
	addDays,
	CalendarPanel,
	formatRangeLabel,
	getMonthStart,
	getNextRangeValue,
	getTodayIsoDate,
	isDateSelectable
} from './calendar-view'
import type { FieldChromeProps } from './form-field-helpers'

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
			<div className={concreteClassNames.datePicker} data-open={open ? true : undefined} {...props}>
				<button className={concreteClassNames.pickerControl} onClick={toggleOpen} type="button">
					<span>{formatRangeLabel(currentValue)}</span>
					<ConcreteIcon name="calendar" />
				</button>
				{open ? (
					<CalendarPanel
						max={max}
						min={min}
						month={visibleMonth}
						onMonthChange={setVisibleMonth}
						onSelect={commitValue}
						selectedEnd={currentValue.end}
						selectedStart={currentValue.start}
					/>
				) : null}
			</div>
		</Field>
	)
}
