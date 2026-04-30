import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
import { Row } from '../row/component'
import { Caret } from './component'

export const caretExamples = defineExamples({
	default: {
		description: 'Closed disclosure affordance.',
		render: () => (
			<Frame>
				<Row leadingIcon={<Caret />} meta="closed">
					Environment variables
				</Row>
				<Row leadingIcon={<Caret open />} meta="open">
					Advanced settings
				</Row>
				<Row leadingIcon={<Caret direction="up" />} meta="up">
					Tree branch
				</Row>
			</Frame>
		)
	},
	direction: {
		description: 'Directional variants.',
		render: () => (
			<Frame>
				<Caret direction="right" />
				<Caret direction="down" />
				<Caret direction="up" />
			</Frame>
		)
	},
	open: {
		description: 'Open disclosure affordance.',
		render: () => (
			<Frame>
				<Caret open />
			</Frame>
		)
	}
})
