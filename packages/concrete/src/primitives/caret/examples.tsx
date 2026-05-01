import { defineExamples } from '../../factories/createExamples'
import { OptionRow } from '../option-row'
import { Caret } from './component'

export const caretExamples = defineExamples({
	default: {
		description: 'Closed disclosure affordance.',
		render: () => (
			<>
				<OptionRow meta="closed" trailing={<Caret />}>
					Environment variables
				</OptionRow>
				<OptionRow meta="open" trailing={<Caret open />}>
					Advanced settings
				</OptionRow>
				<OptionRow meta="up" trailing={<Caret direction="up" />}>
					Tree branch
				</OptionRow>
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
