import type { CSSProperties, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

type RangeControlCustomProperties = CSSProperties & {
	'--concrete-range-end'?: string
	'--concrete-range-start'?: string
}

export type RangeControlProps = HTMLAttributes<HTMLDivElement> & {
	end: number | string
	start: number | string
}

export function RangeControl({ className, end, start, style, ...props }: RangeControlProps) {
	return (
		<div
			className={cn(concreteClassNames.rangeSlider, className)}
			style={withRangeControlStyle(style, start, end)}
			{...props}
		/>
	)
}

export type RangeTrackProps = HTMLAttributes<HTMLDivElement>

export function RangeTrack({ className, ...props }: RangeTrackProps) {
	return <div className={cn(concreteClassNames.rangeSliderTrack, className)} {...props} />
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
		<div className={cn(concreteClassNames.rangeSliderValues, className)} {...props}>
			<span>{start}</span>
			<span>{end}</span>
		</div>
	)
}

function withRangeControlStyle(
	style: CSSProperties | undefined,
	start: number | string,
	end: number | string
): CSSProperties {
	return {
		...style,
		'--concrete-range-end': formatRangePercent(end),
		'--concrete-range-start': formatRangePercent(start)
	} as RangeControlCustomProperties
}

function formatRangePercent(value: number | string): string {
	return typeof value === 'number' ? `${value}%` : value
}
