import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { numberControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { RangeSlider } from './range-slider-view'

export * from './range-slider-view'

export const rangeSliderComponentSchema = z
	.object({
		defaultValue: z.tuple([z.number(), z.number()]).default([20, 80]),
		label: z.string().default('Confidence range'),
		max: z.number().default(100),
		min: z.number().default(0),
		step: z.number().default(1)
	})
	.strict()

export const rangeSliderComponentDefinition = defineConcreteComponent({
	category: 'form',
	component: RangeSlider,
	controls: [
		textControl('label', 'Label', 'Confidence range'),
		numberControl('start', 'Start', '20'),
		numberControl('end', 'End', '80'),
		numberControl('min', 'Min', '0'),
		numberControl('max', 'Max', '100')
	],
	description: 'Two-thumb range adjustment with an aligned filled rail and controlled tuple value.',
	guidance:
		'Range slider is a component because it coordinates two native range inputs while keeping the visual rail deterministic.',
	kind: 'component',
	name: 'Range slider',
	pressure: ['product', 'generative'],
	props: [
		prop('value', 'RangeSliderValue', 'Controlled lower/upper tuple.'),
		prop('defaultValue', 'RangeSliderValue', 'Uncontrolled initial tuple.', '[20, 80]'),
		prop('min', 'number', 'Minimum scale value.', '0'),
		prop('max', 'number', 'Maximum scale value.', '100'),
		prop('step', 'number', 'Native range step.', '1'),
		prop('onValueChange', '(value: RangeSliderValue) => void', 'Receives the ordered tuple.'),
		prop('label', 'ReactNode', 'Field label.')
	],
	renderExample: renderRangeSliderExample,
	schema: rangeSliderComponentSchema,
	slug: 'range-slider',
	states: states([
		['default', 'Selected range on a 0-100 scale.'],
		['narrow', 'Narrow range for filtering.'],
		['wide', 'Broad inclusive range.']
	])
})

function renderRangeSliderExample(state = 'default'): ReactNode {
	return (
		<FormStage>
			<RangeSlider
				defaultValue={state === 'narrow' ? [42, 58] : state === 'wide' ? [5, 95] : [20, 80]}
				label="Confidence range"
			/>
		</FormStage>
	)
}

function FormStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 420, width: '100%' }}>{children}</div>
}
