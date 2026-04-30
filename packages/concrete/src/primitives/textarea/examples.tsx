import { defineExamples } from '../../factories/createExamples'
import { Textarea } from './component'

export const textareaExamples = defineExamples({
	default: {
		description: 'Empty field state.',
		render: () => (
			<>
				<Textarea label="Evaluation prompt" placeholder="Describe the experiment..." />
			</>
		)
	},
	disabled: {
		description: 'Locked field.',
		render: () => (
			<>
				<Textarea disabled label="Evaluation prompt" placeholder="Describe the experiment..." />
			</>
		)
	},
	error: {
		description: 'Validation failure.',
		render: () => (
			<>
				<Textarea
					error="Prompt is too short."
					label="Evaluation prompt"
					placeholder="Describe the experiment..."
				/>
			</>
		)
	},
	filled: {
		description: 'Value present.',
		render: () => (
			<>
				<Textarea defaultValue="Summarize the architecture review." label="Evaluation prompt" />
			</>
		)
	}
})
