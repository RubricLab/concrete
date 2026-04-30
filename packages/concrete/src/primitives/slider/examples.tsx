import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Slider } from './component'

export const sliderExamples = defineExamples({
	default: {
		description: 'Default range input.',
		render: () => (
			<Frame>
				<Slider defaultValue={62} />
			</Frame>
		)
	},
	sky: {
		description: 'Accent range input.',
		render: () => (
			<Frame>
				<Slider defaultValue={62} tone="sky" />
			</Frame>
		)
	}
})
