import { defineExamples } from '../../factories/createExamples'
import { NumberStepper } from './component'

export const numberStepperExamples = defineExamples({
	default: {
		description: 'Bounded numeric adjustment.',
		render: () => (
			<>
				<NumberStepper defaultValue={42} label="Agents" max={100} min={1} step={2} />
			</>
		)
	},
	disabled: {
		description: 'Disabled bounded numeric adjustment.',
		render: () => (
			<>
				<NumberStepper defaultValue={4} disabled label="Workers" max={8} min={1} step={1} />
			</>
		)
	},
	error: {
		description: 'Invalid or out-of-policy value.',
		render: () => (
			<>
				<NumberStepper
					defaultValue={42}
					error="Choose a value between 1 and 10."
					label="Agents"
					max={10}
					min={1}
					step={2}
				/>
			</>
		)
	},
	small: {
		description: 'Low-count quantity control.',
		render: () => (
			<>
				<NumberStepper
					defaultValue={3}
					help="Use fewer workers for lightweight tasks."
					label="Workers"
					max={8}
					min={1}
					step={1}
				/>
			</>
		)
	}
})
