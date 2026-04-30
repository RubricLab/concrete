import { defineExamples } from '../../factories/createExamples'
import { Tag } from './component'

export const tagExamples = defineExamples({
	default: {
		description: 'Entity tag with icon.',
		render: () => (
			<>
				<Tag leadingIcon="filter" tone="sky">
					Agents
				</Tag>
				<Tag tone="sunken">Docs</Tag>
				<Tag dismissible>concrete</Tag>
			</>
		)
	},
	sizes: {
		description: 'Small, medium, and large rhythm.',
		render: () => (
			<>
				<Tag size="small">small</Tag>
				<Tag size="medium">medium</Tag>
				<Tag size="large">large</Tag>
			</>
		)
	},
	variants: {
		description: 'Outline, active, and selected treatments.',
		render: () => (
			<>
				<Tag variant="outline">Outline</Tag>
				<Tag tone="sky" variant="active">
					Active
				</Tag>
				<Tag variant="selected">Selected</Tag>
				<Tag dismissible tone="terminal">
					Running
				</Tag>
			</>
		)
	}
})
