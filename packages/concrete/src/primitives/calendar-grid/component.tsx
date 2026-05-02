import type { KeyboardEvent } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import {
	addMonths,
	formatMonthLabel,
	getCalendarDays,
	getDayNumber,
	isDateSelectable,
	isInRange,
	isSelectedDate
} from '../../utilities/calendar-view'
import { Button } from '../button'

export type CalendarGridProps = {
	max?: string | undefined
	min?: string | undefined
	month: string
	onMonthChange?: ((month: string) => void) | undefined
	onSelect?: ((value: string) => void) | undefined
	placement?: 'floating' | 'inline' | undefined
	selectedEnd?: string | undefined
	selectedStart?: string | undefined
}

export function CalendarGrid({
	max,
	min,
	month,
	onMonthChange,
	onSelect,
	placement = 'floating',
	selectedEnd,
	selectedStart
}: CalendarGridProps) {
	const days = getCalendarDays(month)

	function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, date: string) {
		if (!onSelect) {
			return
		}

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
		<div className={concreteClassNames.calendarGrid} data-placement={placement}>
			<header>
				<Button
					density="tiny"
					hierarchy="ghost"
					iconOnly
					leadingIcon="chevron-left"
					{...(onMonthChange ? { onClick: () => onMonthChange(addMonths(month, -1)) } : {})}
				/>
				<b>{formatMonthLabel(month)}</b>
				<Button
					density="tiny"
					hierarchy="ghost"
					iconOnly
					leadingIcon="chevron-right"
					{...(onMonthChange ? { onClick: () => onMonthChange(addMonths(month, 1)) } : {})}
				/>
			</header>
			<div className={concreteClassNames.calendarWeekdays}>
				{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
					<span key={day}>{day}</span>
				))}
			</div>
			<div className={concreteClassNames.calendarDays}>
				{days.map(day => (
					<button
						data-in-range={isInRange(day.date, selectedStart, selectedEnd) ? true : undefined}
						data-muted={day.inMonth ? undefined : true}
						data-selected={isSelectedDate(day.date, selectedStart, selectedEnd) ? true : undefined}
						disabled={!isDateSelectable(day.date, min, max)}
						key={day.date}
						{...(onSelect
							? {
									onClick: () => onSelect(day.date),
									onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => handleKeyDown(event, day.date)
								}
							: {})}
						type="button"
					>
						{getDayNumber(day.date)}
					</button>
				))}
			</div>
		</div>
	)
}
