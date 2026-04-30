'use client'

import type { HTMLAttributes } from 'react'
import { useMemo, useState } from 'react'
import { ConcreteIcon } from '../../icons'
import { Field } from '../../primitives'
import { concreteClassNames } from '../../styles/class-names'
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
			<div className={concreteClassNames.timePicker} data-open={open ? true : undefined} {...props}>
				<button
					className={concreteClassNames.pickerControl}
					onClick={() => setOpen(current => !current)}
					type="button"
				>
					<span>{formatTimeLabel(currentValue)}</span>
					<ConcreteIcon name="clock" />
				</button>
				{open ? (
					<div className={concreteClassNames.timeMenu} role="listbox">
						{timeOptions.map(option => (
							<button
								aria-selected={option === currentValue}
								data-selected={option === currentValue ? true : undefined}
								key={option}
								onClick={() => commitValue(option)}
								role="option"
								type="button"
							>
								{formatTimeLabel(option)}
							</button>
						))}
					</div>
				) : null}
			</div>
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
