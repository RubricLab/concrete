import type { CSSProperties, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

type RangeCustomProperties = CSSProperties & {
	'--concrete-range-end'?: string
	'--concrete-range-start'?: string
}

export type RangeProps = HTMLAttributes<HTMLDivElement> & {
	end: number | string
	start: number | string
}

export function Range({ className, end, start, style, ...props }: RangeProps) {
	return (
		<div
			className={cn(concreteClassNames.range, className)}
			style={withRangeStyle(style, start, end)}
			{...props}
		/>
	)
}

export type RangeTrackProps = HTMLAttributes<HTMLDivElement>

export function RangeTrack({ className, ...props }: RangeTrackProps) {
	return <div className={cn(concreteClassNames.rangeTrack, className)} {...props} />
}

export type RangeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	label: string
}

export function RangeInput({ label, ...props }: RangeInputProps) {
	return <input aria-label={label} type="range" {...props} />
}

export type RangeValuesProps = HTMLAttributes<HTMLDivElement> & {
	end: ReactNode
	start: ReactNode
}

export function RangeValues({ className, end, start, ...props }: RangeValuesProps) {
	return (
		<div className={cn(concreteClassNames.rangeValues, className)} {...props}>
			<span>{start}</span>
			<span>{end}</span>
		</div>
	)
}

function withRangeStyle(
	style: CSSProperties | undefined,
	start: number | string,
	end: number | string
): CSSProperties {
	return {
		...style,
		'--concrete-range-end': formatRangePercent(end),
		'--concrete-range-start': formatRangePercent(start)
	} as RangeCustomProperties
}

function formatRangePercent(value: number | string): string {
	return typeof value === 'number' ? `${value}%` : value
}
