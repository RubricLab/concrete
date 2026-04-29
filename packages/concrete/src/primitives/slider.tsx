import type { CSSProperties, InputHTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { numberControl, selectControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { clampPercent, cn } from './utils'

export type SliderTone = 'default' | 'sky'

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	tone?: SliderTone
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
	tone = 'default',
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
				tone === 'sky' && concreteClassNames.sliderSky,
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

export const sliderPropsSchema = z
	.object({
		max: z.number().default(100),
		min: z.number().default(0),
		tone: z.enum(['default', 'sky']).default('default'),
		value: z.number().default(62)
	})
	.strict()

export const sliderPrimitiveDefinition = defineConcretePrimitive({
	category: 'form',
	component: Slider,
	controls: [
		numberControl('value', 'Value', '62'),
		numberControl('min', 'Min', '0'),
		numberControl('max', 'Max', '100'),
		selectControl('tone', 'Tone', 'default', ['default', 'sky'])
	],
	description: 'Range input for scalar tuning without custom interaction code.',
	guidance: 'Slider is for approximate scalar tuning; use numeric inputs for exact values.',
	kind: 'primitive',
	name: 'Slider',
	pressure: ['product'],
	props: [
		prop('min', 'number', 'Native minimum.'),
		prop('max', 'number', 'Native maximum.'),
		prop('step', 'number', 'Native step.'),
		prop('defaultValue', 'number', 'Uncontrolled value.'),
		prop('value', 'number', 'Controlled value.'),
		prop('tone', "'default' | 'sky'", 'Track and thumb tone.', 'default')
	],
	renderExample: renderSliderExample,
	schema: sliderPropsSchema,
	slug: 'slider',
	states: states([
		['default', 'Default range input.'],
		['sky', 'Accent range input.']
	])
})

function renderSliderExample() {
	return (
		<Frame>
			<Slider defaultValue={62} />
		</Frame>
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
