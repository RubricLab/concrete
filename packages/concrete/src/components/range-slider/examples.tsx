import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { RangeSlider } from './component'

export const rangeSliderExamples = defineExamples({
	default: {
		description: 'Selected range on a 0-100 scale.',
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
	wide: {
		description: 'Broad inclusive range.',
		render: () => renderRangeSliderExample('wide')
	}
})

function renderRangeSliderExample(state: 'default' | 'error' | 'narrow' | 'wide'): ReactNode {
	return (
		<RangeSlider
			defaultValue={state === 'narrow' ? [42, 58] : state === 'wide' ? [5, 95] : [20, 80]}
			error={state === 'error' ? 'Choose a narrower confidence band.' : undefined}
			label="Confidence range"
		/>
	)
}
