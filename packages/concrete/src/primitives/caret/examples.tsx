import { defineExamples } from '../../factories/createExamples'
import { Row } from '../row/component'
import { Caret } from './component'

export const caretExamples = defineExamples({
	default: {
		description: 'Closed disclosure affordance.',
		render: () => (
			<>
				<Row leadingIcon={<Caret />} meta="closed">
					Environment variables
				</Row>
				<Row leadingIcon={<Caret open />} meta="open">
					Advanced settings
				</Row>
				<Row leadingIcon={<Caret direction="up" />} meta="up">
					Tree branch
				</Row>
			</>
		)
	},
	direction: {
		description: 'Directional variants.',
		render: () => (
			<>
				<Caret direction="right" />
				<Caret direction="down" />
				<Caret direction="up" />
			</>
		)
	},
	open: {
		description: 'Open disclosure affordance.',
		render: () => (
			<>
				<Caret open />
			</>
		)
	}
})
