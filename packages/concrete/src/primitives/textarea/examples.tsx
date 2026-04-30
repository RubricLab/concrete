import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Textarea } from './component'

export const textareaExamples = defineExamples({
	default: {
		description: 'Empty field state.',
		render: () => (
			<Frame>
				<Textarea label="Prompt" placeholder="Describe the experiment..." />
			</Frame>
		)
	},
	disabled: {
		description: 'Locked field.',
		render: () => (
			<Frame>
				<Textarea disabled label="Prompt" placeholder="Describe the experiment..." />
			</Frame>
		)
	},
	error: {
		description: 'Validation failure.',
		render: () => (
			<Frame>
				<Textarea
					error="Prompt is too short."
					label="Prompt"
					placeholder="Describe the experiment..."
				/>
			</Frame>
		)
	},
	filled: {
		description: 'Value present.',
		render: () => (
			<Frame>
				<Textarea defaultValue="Summarize the architecture review." label="Prompt" />
			</Frame>
		)
	}
})
