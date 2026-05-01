import { defineExamples } from '../../factories/createExamples'
import { Tag } from './component'

export const tagExamples = defineExamples({
	default: {
		description: 'Entity tag with icon.',
		render: () => (
			<>
				<Tag intent="sky" leadingIcon="filter">
					Agents
				</Tag>
				<Tag intent="subtle">Docs</Tag>
				<Tag dismissible>concrete</Tag>
			</>
		)
	},
	density: {
		description: 'Compact, comfortable, and editorial rhythm.',
		render: () => (
			<>
				<Tag density="compact">compact</Tag>
				<Tag density="comfortable">comfortable</Tag>
				<Tag density="editorial">editorial</Tag>
			</>
		)
	},
	hierarchy: {
		description: 'Outline, active, and selected treatments.',
		render: () => (
			<>
				<Tag hierarchy="outline">Outline</Tag>
				<Tag active intent="sky">
					Active
				</Tag>
				<Tag selected>Selected</Tag>
				<Tag dismissible intent="terminal">
					Running
				</Tag>
			</>
		)
	}
})
