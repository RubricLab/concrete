import { defineExamples } from '../../factories/createExamples'
import { Pill } from '../pill'
import { Spinner } from './component'

export const spinnerExamples = defineExamples({
	default: {
		description: 'Default, sky, and inverse spinners.',
		render: () => (
			<>
				<Spinner size={14} />
				<Spinner size={18} tone="sky" />
				<Pill tone="ink">
					<Spinner size={12} tone="inverse" />
				</Pill>
			</>
		)
	},
	tiny: {
		description: 'Small inline pending indicator.',
		render: () => (
			<>
				<Spinner size={12} />
				<Spinner size={18} tone="sky" />
				<Pill tone="ink">
					<Spinner size={12} tone="inverse" />
				</Pill>
			</>
		)
	}
})
