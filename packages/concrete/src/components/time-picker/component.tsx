'use client'

import type { HTMLAttributes } from 'react'
import { useMemo, useState } from 'react'
import { Field, PickerButton, PickerSurface, TimeList } from '../../primitives'
import type { FieldChromeProps } from '../../utilities/form-field-helpers'

export type TimePickerProps = Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> &
	FieldChromeProps & {
		defaultOpen?: boolean | undefined
		defaultValue?: string | undefined
		interval?: number | undefined
		onValueChange?: ((value: string) => void) | undefined
		value?: string | undefined
	}

export function TimePicker({
	className,
	defaultOpen = false,
	defaultValue = '14:30',
	description,
	error,
	help,
	interval = 30,
	label,
	onValueChange,
	optional,
	required,
	success,
	value,
	...props
}: TimePickerProps) {
	const [internalValue, setInternalValue] = useState(defaultValue)
	const [open, setOpen] = useState(defaultOpen)
	const currentValue = value ?? internalValue
	const timeOptions = useMemo(() => createTimeOptions(interval), [interval])

	function commitValue(nextValue: string) {
		if (value === undefined) {
			setInternalValue(nextValue)
		}

		onValueChange?.(nextValue)
		setOpen(false)
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
				<PickerButton icon="clock" onClick={() => setOpen(current => !current)} open={open}>
					{formatTimeLabel(currentValue)}
				</PickerButton>
				{open ? (
					<TimeList
						formatOption={formatTimeLabel}
						onSelect={commitValue}
						options={timeOptions}
						value={currentValue}
					/>
				) : null}
			</PickerSurface>
		</Field>
	)
}

function createTimeOptions(interval: number): readonly string[] {
	const step = Math.max(5, interval)
	const options: string[] = []

	for (let minute = 0; minute < 24 * 60; minute += step) {
		const hours = Math.floor(minute / 60)
		const minutes = minute % 60
		options.push(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`)
	}

	return options
}

function formatTimeLabel(value: string): string {
	const [hourText = '0', minuteText = '0'] = value.split(':')
	const hours = Number(hourText)
	const minutes = Number(minuteText)
	const date = new Date(Date.UTC(2024, 0, 1, hours, minutes))
	return new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		timeZone: 'UTC'
	}).format(date)
}
