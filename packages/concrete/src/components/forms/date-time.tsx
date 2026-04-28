'use client'

import type { HTMLAttributes, KeyboardEvent } from 'react'
import { useMemo, useState } from 'react'
import { ConcreteIcon } from '../../icons'
import { Button, Field } from '../../primitives'
import type { DateRangeValue } from '../../schemas'
import classes from '../components.module.css'
import type { FieldChromeProps } from './shared'

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
			<div className={classes.datePicker} data-open={open ? true : undefined} {...props}>
				<button className={classes.pickerControl} onClick={toggleOpen} type="button">
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
			<div className={classes.datePicker} data-open={open ? true : undefined} {...props}>
				<button className={classes.pickerControl} onClick={toggleOpen} type="button">
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
			<div className={classes.timePicker} data-open={open ? true : undefined} {...props}>
				<button
					className={classes.pickerControl}
					onClick={() => setOpen(current => !current)}
					type="button"
				>
					<span>{formatTimeLabel(currentValue)}</span>
					<ConcreteIcon name="clock" />
				</button>
				{open ? (
					<div className={classes.timeMenu} role="listbox">
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

type CalendarPanelProps = {
	max?: string | undefined
	min?: string | undefined
	month: string
	onMonthChange: (month: string) => void
	onSelect: (value: string) => void
	selectedEnd?: string | undefined
	selectedStart?: string | undefined
}

function CalendarPanel({
	max,
	min,
	month,
	onMonthChange,
	onSelect,
	selectedEnd,
	selectedStart
}: CalendarPanelProps) {
	const days = getCalendarDays(month)

	function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, date: string) {
		switch (event.key) {
			case 'Enter':
			case ' ':
				event.preventDefault()
				onSelect(date)
				return
			default:
				return
		}
	}

	return (
		<div className={classes.calendarPanel}>
			<header>
				<Button
					iconOnly
					leadingIcon="chevron-left"
					onClick={() => onMonthChange(addMonths(month, -1))}
					size="tiny"
					variant="ghost"
				/>
				<b>{formatMonthLabel(month)}</b>
				<Button
					iconOnly
					leadingIcon="chevron-right"
					onClick={() => onMonthChange(addMonths(month, 1))}
					size="tiny"
					variant="ghost"
				/>
			</header>
			<div className={classes.calendarWeekdays}>
				{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
					<span key={day}>{day}</span>
				))}
			</div>
			<div className={classes.calendarGrid}>
				{days.map(day => (
					<button
						data-in-range={isInRange(day.date, selectedStart, selectedEnd) ? true : undefined}
						data-muted={day.inMonth ? undefined : true}
						data-selected={isSelectedDate(day.date, selectedStart, selectedEnd) ? true : undefined}
						disabled={!isDateSelectable(day.date, min, max)}
						key={day.date}
						onClick={() => onSelect(day.date)}
						onKeyDown={event => handleKeyDown(event, day.date)}
						type="button"
					>
						{getDayNumber(day.date)}
					</button>
				))}
			</div>
		</div>
	)
}

function getTodayIsoDate(): string {
	return new Date().toISOString().slice(0, 10)
}

function getMonthStart(value: string): string {
	return `${value.slice(0, 7)}-01`
}

function addDays(value: string, days: number): string {
	const date = parseIsoDate(value)
	date.setUTCDate(date.getUTCDate() + days)
	return date.toISOString().slice(0, 10)
}

function addMonths(value: string, months: number): string {
	const date = parseIsoDate(value)
	date.setUTCMonth(date.getUTCMonth() + months)
	date.setUTCDate(1)
	return date.toISOString().slice(0, 10)
}

function parseIsoDate(value: string): Date {
	return new Date(`${value}T00:00:00.000Z`)
}

function getCalendarDays(month: string): readonly { date: string; inMonth: boolean }[] {
	const start = parseIsoDate(month)
	const monthIndex = start.getUTCMonth()
	const weekday = (start.getUTCDay() + 6) % 7
	const firstDate = new Date(start)
	firstDate.setUTCDate(start.getUTCDate() - weekday)

	return Array.from({ length: 42 }, (_, index) => {
		const date = new Date(firstDate)
		date.setUTCDate(firstDate.getUTCDate() + index)
		const isoDate = date.toISOString().slice(0, 10)

		return {
			date: isoDate,
			inMonth: date.getUTCMonth() === monthIndex
		}
	})
}

function getDayNumber(value: string): number {
	return parseIsoDate(value).getUTCDate()
}

function isDateSelectable(
	value: string,
	minimum: string | undefined,
	maximum: string | undefined
): boolean {
	if (minimum && value < minimum) {
		return false
	}

	if (maximum && value > maximum) {
		return false
	}

	return true
}

function isSelectedDate(
	value: string,
	start: string | undefined,
	end: string | undefined
): boolean {
	return value === start || value === end
}

function isInRange(value: string, start: string | undefined, end: string | undefined): boolean {
	if (!start || !end) {
		return false
	}

	return value > start && value < end
}

function getNextRangeValue(currentValue: DateRangeValue, nextDate: string): DateRangeValue {
	if (!currentValue.start || (currentValue.start && currentValue.end)) {
		return { start: nextDate }
	}

	if (nextDate < currentValue.start) {
		return { end: currentValue.start, start: nextDate }
	}

	return { end: nextDate, start: currentValue.start }
}

function formatDateLabel(value: string): string {
	const date = parseIsoDate(value)
	return new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'short',
		timeZone: 'UTC',
		year: 'numeric'
	}).format(date)
}

function formatMonthLabel(value: string): string {
	const date = parseIsoDate(value)
	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		timeZone: 'UTC',
		year: 'numeric'
	}).format(date)
}

function formatRangeLabel(value: DateRangeValue): string {
	if (!value.start) {
		return 'Select dates'
	}

	if (!value.end) {
		return `${formatDateLabel(value.start)} -`
	}

	return `${formatDateLabel(value.start)} - ${formatDateLabel(value.end)}`
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
