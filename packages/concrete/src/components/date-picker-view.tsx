'use client'

import type { HTMLAttributes } from 'react'
import { useState } from 'react'
import { ConcreteIcon } from '../icons'
import { Field } from '../primitives'
import { concreteClassNames } from '../styles/class-names'
import {
	CalendarPanel,
	formatDateLabel,
	getMonthStart,
	getTodayIsoDate,
	isDateSelectable
} from './calendar-view'
import type { FieldChromeProps } from './form-field-helpers'

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
			<div className={concreteClassNames.datePicker} data-open={open ? true : undefined} {...props}>
				<button className={concreteClassNames.pickerControl} onClick={toggleOpen} type="button">
					<span>{formatDateLabel(currentValue)}</span>
					<ConcreteIcon name="calendar" />
				</button>
				{open ? (
					<CalendarPanel
						max={max}
						min={min}
						month={visibleMonth}
						onMonthChange={setVisibleMonth}
						onSelect={commitValue}
						selectedEnd={currentValue}
						selectedStart={currentValue}
					/>
				) : null}
			</div>
		</Field>
	)
}
