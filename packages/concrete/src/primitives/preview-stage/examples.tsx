import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Input } from '../input'
import { PreviewStage } from './component'

export const previewStageExamples = defineExamples({
	default: {
		description: 'Narrow control preview constraint.',
		render: () => (
			<PreviewStage width="control">
				<Input defaultValue="concrete-preview" label="Default model" />
			</PreviewStage>
		)
	},
	stack: {
		description: 'Stacked preview content with token gap.',
		render: () => (
			<PreviewStage layout="stack" width="message">
				<Button variant="secondary">Approve</Button>
				<Button variant="ghost">Queue follow-up</Button>
			</PreviewStage>
		)
	}
})
