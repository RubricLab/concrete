import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { RangeSlider } from './component'

export const rangeSliderExamples = defineExamples({
	default: {
		description: 'Selected range on a 0-100 scale.',
		render: () => renderRangeSliderExample('default')
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

function renderRangeSliderExample(state: 'default' | 'narrow' | 'wide'): ReactNode {
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
