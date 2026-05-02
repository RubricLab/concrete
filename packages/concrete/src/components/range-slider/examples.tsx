import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../../primitives'
import { RangeSlider } from './component'

export const rangeSliderExamples = defineExamples({
	default: {
		description: 'Dense range controls for confidence and cost filters.',
		render: () => renderRangeSliderExample('default')
	},
	error: {
		description: 'Range with validation feedback.',
		render: () => renderRangeSliderExample('error')
	},
	narrow: {
		description: 'Narrow range for filtering.',
		render: () => renderRangeSliderExample('narrow')
	},
	stepped: {
		description: 'Stepped range on a bounded score scale.',
		render: () => renderRangeSliderExample('stepped')
	},
	wide: {
		description: 'Broad inclusive range.',
		render: () => renderRangeSliderExample('wide')
	}
})

function renderRangeSliderExample(
	state: 'default' | 'error' | 'narrow' | 'stepped' | 'wide'
): ReactNode {
	switch (state) {
		case 'default':
			return (
				<Stack>
					<RangeSlider
						defaultValue={[72, 94]}
						help="Keeps only high-confidence model outputs in the review queue."
						label="Confidence band"
					/>
					<RangeSlider defaultValue={[12, 48]} label="Cost window" max={100} min={0} step={4} />
				</Stack>
			)
		case 'error':
			return (
				<RangeSlider
					defaultValue={[20, 80]}
					error="Choose a narrower confidence band."
					label="Confidence range"
				/>
			)
		case 'narrow':
			return <RangeSlider defaultValue={[42, 58]} label="Confidence range" />
		case 'stepped':
			return (
				<RangeSlider
					defaultValue={[25, 75]}
					help="Quarter-step filter for coarse generated interface scoring."
					label="Quality score"
					step={25}
				/>
			)
		case 'wide':
			return <RangeSlider defaultValue={[5, 95]} label="Confidence range" />
	}
}
