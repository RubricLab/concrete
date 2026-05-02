import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../../primitives'
import { NumberStepper } from './component'

export const numberStepperExamples = defineExamples({
	default: {
		description: 'Dense numeric controls for run configuration.',
		render: () => (
			<Stack density="compact">
				<NumberStepper
					defaultValue={42}
					help="Parallel agents available to this run."
					label="Agent slots"
					max={100}
					min={1}
					step={2}
				/>
				<NumberStepper defaultValue={3} label="Retry budget" max={8} min={0} step={1} />
			</Stack>
		)
	},
	disabled: {
		description: 'Disabled bounded numeric adjustment.',
		render: () => (
			<NumberStepper
				defaultValue={4}
				disabled
				help="Locked while the current batch is running."
				label="Workers"
				max={8}
				min={1}
				step={1}
			/>
		)
	},
	error: {
		description: 'Invalid or out-of-policy value.',
		render: () => (
			<NumberStepper
				defaultValue={42}
				error="Choose a value between 1 and 10."
				label="Agent slots"
				max={10}
				min={1}
				step={2}
			/>
		)
	},
	small: {
		description: 'Low-count quantity control.',
		render: () => (
			<NumberStepper
				defaultValue={3}
				help="Use fewer workers for lightweight tasks."
				label="Workers"
				max={8}
				min={1}
				step={1}
			/>
		)
	},
	success: {
		description: 'Accepted value with success feedback.',
		render: () => (
			<NumberStepper
				defaultValue={6}
				label="Review seats"
				max={12}
				min={1}
				step={1}
				success="Capacity fits the selected workspace."
			/>
		)
	}
})
