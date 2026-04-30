import { defineExamples } from '../../factories/createExamples'
import { Tag } from '../tag'
import { SelectControl } from './component'

export const selectControlExamples = defineExamples({
	default: {
		description: 'Multi-value select control with compact tags.',
		render: () => (
			<>
				<SelectControl>
					<Tag size="small" tone="sunken">
						Research
					</Tag>
					<Tag size="small" tone="sunken">
						Design system
					</Tag>
				</SelectControl>
			</>
		)
	},
	empty: {
		description: 'Placeholder state.',
		render: () => (
			<>
				<SelectControl empty>Select options...</SelectControl>
			</>
		)
	},
	open: {
		description: 'Open focus treatment.',
		render: () => (
			<>
				<SelectControl open>Select options...</SelectControl>
			</>
		)
	}
})
