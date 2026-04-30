import { defineExamples } from '../../factories/createExamples'
import { NumberStepper } from './component'

export const numberStepperExamples = defineExamples({
	default: {
		description: 'Bounded numeric adjustment.',
		render: () => (
			<div style={{ maxWidth: 420, width: '100%' }}>
				<NumberStepper defaultValue={42} label="Agents" max={100} min={1} step={2} />
			</div>
		)
	},
	error: {
		description: 'Invalid or out-of-policy value.',
		render: () => (
			<div style={{ maxWidth: 420, width: '100%' }}>
				<NumberStepper
					defaultValue={42}
					error="Choose a value between 1 and 10."
					label="Agents"
					max={10}
					min={1}
					step={2}
				/>
			</div>
		)
	},
	small: {
		description: 'Compact quantity control.',
		render: () => (
			<div style={{ maxWidth: 420, width: '100%' }}>
				<NumberStepper defaultValue={3} label="Agents" max={100} min={1} step={1} />
			</div>
		)
	}
})
