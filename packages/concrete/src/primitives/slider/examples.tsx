import { defineExamples } from '../../factories/createExamples'
import { Field } from '../field'
import { Stack } from '../stack'
import { Slider } from './component'

export const sliderExamples = defineExamples({
	default: {
		description: 'Dense scalar controls with default and accent intents.',
		render: () => (
			<Stack density="compact">
				<Field label="Confidence">
					<Slider defaultValue={62} />
				</Field>
				<Field label="Recall threshold">
					<Slider defaultValue={78} intent="sky" />
				</Field>
			</Stack>
		)
	},
	disabled: {
		description: 'Locked range input.',
		render: () => (
			<Stack density="compact">
				<Field label="Confidence">
					<Slider defaultValue={62} disabled />
				</Field>
			</Stack>
		)
	},
	sky: {
		description: 'Accent range input.',
		render: () => (
			<Stack density="compact">
				<Field label="Recall threshold">
					<Slider defaultValue={62} intent="sky" />
				</Field>
			</Stack>
		)
	}
})
