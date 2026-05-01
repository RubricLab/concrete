import { defineExamples } from '../../factories/createExamples'
import { Field } from '../field'
import { Slider } from './component'

export const sliderExamples = defineExamples({
	default: {
		description: 'Default range input.',
		render: () => (
			<>
				<Field label="Confidence">
					<Slider defaultValue={62} />
				</Field>
			</>
		)
	},
	disabled: {
		description: 'Locked range input.',
		render: () => (
			<>
				<Field label="Confidence">
					<Slider defaultValue={62} disabled />
				</Field>
			</>
		)
	},
	sky: {
		description: 'Accent range input.',
		render: () => (
			<>
				<Field label="Recall threshold">
					<Slider defaultValue={62} intent="sky" />
				</Field>
			</>
		)
	}
})
