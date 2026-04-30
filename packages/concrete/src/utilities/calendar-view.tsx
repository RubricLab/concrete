import type { DateRangeValue } from '../schemas'

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

export function addMonths(value: string, months: number): string {
	const date = parseIsoDate(value)
	date.setUTCMonth(date.getUTCMonth() + months)
	date.setUTCDate(1)
	return date.toISOString().slice(0, 10)
}

function parseIsoDate(value: string): Date {
	return new Date(`${value}T00:00:00.000Z`)
}

export function getCalendarDays(month: string): readonly { date: string; inMonth: boolean }[] {
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

export function getDayNumber(value: string): number {
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

export function isSelectedDate(
	value: string,
	start: string | undefined,
	end: string | undefined
): boolean {
	return value === start || value === end
}

export function isInRange(
	value: string,
	start: string | undefined,
	end: string | undefined
): boolean {
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

export function formatMonthLabel(value: string): string {
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
