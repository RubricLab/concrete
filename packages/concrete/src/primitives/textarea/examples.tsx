import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../stack'
import { Textarea } from './component'

export const textareaExamples = defineExamples({
	default: {
		description: 'Prompt field with help and compact product copy.',
		render: () => (
			<Stack density="compact">
				<Textarea
					help="Keep the instruction specific and inspectable."
					label="Evaluation prompt"
					placeholder="Describe the experiment..."
				/>
			</Stack>
		)
	},
	disabled: {
		description: 'Locked field.',
		render: () => (
			<Stack density="compact">
				<Textarea defaultValue="Prompt locked by release policy." disabled label="Evaluation prompt" />
			</Stack>
		)
	},
	error: {
		description: 'Validation failure.',
		render: () => (
			<Stack density="compact">
				<Textarea
					error="Prompt is too short."
					label="Evaluation prompt"
					placeholder="Describe the experiment..."
				/>
			</Stack>
		)
	},
	filled: {
		description: 'Value present.',
		render: () => (
			<Stack density="compact">
				<Textarea
					defaultValue="Summarize the architecture review and call out unresolved primitive polish."
					label="Evaluation prompt"
				/>
			</Stack>
		)
	}
})
