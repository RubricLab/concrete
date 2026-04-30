import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
import { Row } from './component'

export const rowExamples = defineExamples({
	default: {
		description: 'Interactive dense rows.',
		render: () => (
			<Frame>
				<Row interactive leadingIcon="file-text" meta="12m">
					Agent memory architecture
				</Row>
				<Row interactive leadingIcon="git-branch" meta="live">
					Context structuring experiment
				</Row>
				<Row leadingIcon="lock" meta="private">
					Evaluation dataset
				</Row>
			</Frame>
		)
	},
	static: {
		description: 'Passive row treatment.',
		render: () => (
			<Frame>
				<Row leadingIcon="file-text" meta="12m">
					Agent memory architecture
				</Row>
				<Row leadingIcon="git-branch" meta="live">
					Context structuring experiment
				</Row>
				<Row leadingIcon="lock" meta="private">
					Evaluation dataset
				</Row>
			</Frame>
		)
	}
})
