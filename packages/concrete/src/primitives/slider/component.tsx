import type { CSSProperties, InputHTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { clampPercent, cn } from '../utils'

export type SliderIntent = 'default' | 'sky'

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	intent?: SliderIntent
}

type SliderStyle = CSSProperties & {
	'--concrete-slider-percent'?: string
}

export function Slider({
	className,
	defaultValue,
	max = 100,
	min = 0,
	style,
	intent = 'default',
	value,
	...props
}: SliderProps) {
	const minimum = getNumericInputValue(min)
	const maximum = getNumericInputValue(max)
	const current = getNumericInputValue(value ?? defaultValue ?? minimum)
	const range = maximum - minimum
	const percent = range === 0 ? 0 : clampPercent(((current - minimum) / range) * 100)
	const sliderStyle: SliderStyle = { '--concrete-slider-percent': `${percent}%`, ...style }

	return (
		<input
			className={cn(
				concreteClassNames.slider,
				intent === 'sky' && concreteClassNames.sliderSky,
				className
			)}
			defaultValue={defaultValue}
			max={max}
			min={min}
			style={sliderStyle}
			type="range"
			value={value}
			{...props}
		/>
	)
}

function getNumericInputValue(value: number | readonly string[] | string | undefined): number {
	switch (typeof value) {
		case 'number':
			return Number.isFinite(value) ? value : 0
		case 'string': {
			const parsedValue = Number.parseFloat(value)
			return Number.isFinite(parsedValue) ? parsedValue : 0
		}
		case 'undefined':
			return 0
		default: {
			const parsedValue = Number.parseFloat(value[0] ?? '0')
			return Number.isFinite(parsedValue) ? parsedValue : 0
		}
	}
}
