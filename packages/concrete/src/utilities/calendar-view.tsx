import type { KeyboardEvent } from 'react'
import { Button } from '../primitives'
import type { DateRangeValue } from '../schemas'
import { concreteClassNames } from '../styles/class-names'

// DX-TODO(calendar): Calendar chrome is shared by date components for structural
// continuity. Promote it to a primitive when visual QA can cover picker regressions.
export type CalendarPanelProps = {
	max?: string | undefined
	min?: string | undefined
	month: string
	onMonthChange: (month: string) => void
	onSelect: (value: string) => void
	selectedEnd?: string | undefined
	selectedStart?: string | undefined
}

export function CalendarPanel({
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
		<div className={concreteClassNames.calendarPanel}>
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
			<div className={concreteClassNames.calendarWeekdays}>
				{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
					<span key={day}>{day}</span>
				))}
			</div>
			<div className={concreteClassNames.calendarGrid}>
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

export function getTodayIsoDate(): string {
	return new Date().toISOString().slice(0, 10)
}

export function getMonthStart(value: string): string {
	return `${value.slice(0, 7)}-01`
}

export function addDays(value: string, days: number): string {
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

export function isDateSelectable(
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

export function getNextRangeValue(currentValue: DateRangeValue, nextDate: string): DateRangeValue {
	if (!currentValue.start || (currentValue.start && currentValue.end)) {
		return { start: nextDate }
	}

	if (nextDate < currentValue.start) {
		return { end: currentValue.start, start: nextDate }
	}

	return { end: nextDate, start: currentValue.start }
}

export function formatDateLabel(value: string): string {
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

export function formatRangeLabel(value: DateRangeValue): string {
	if (!value.start) {
		return 'Select dates'
	}

	if (!value.end) {
		return `${formatDateLabel(value.start)} -`
	}

	return `${formatDateLabel(value.start)} - ${formatDateLabel(value.end)}`
}
