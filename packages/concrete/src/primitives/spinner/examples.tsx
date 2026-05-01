import { defineExamples } from '../../factories/createExamples'
import { Pill } from '../pill'
import { Spinner } from './component'

export const spinnerExamples = defineExamples({
	default: {
		description: 'Default, sky, and inverse spinners.',
		render: () => (
			<>
				<Spinner density="compact" />
				<Spinner intent="sky" />
				<Pill intent="strong">
					<Spinner density="compact" intent="inverse" />
				</Pill>
			</>
		)
	},
	tiny: {
		description: 'Small inline pending indicator.',
		render: () => (
			<>
				<Spinner density="compact" />
				<Spinner intent="sky" />
				<Pill intent="strong">
					<Spinner density="compact" intent="inverse" />
				</Pill>
			</>
		)
	}
})
