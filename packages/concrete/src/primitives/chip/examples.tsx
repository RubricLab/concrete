import { defineExamples } from '../../factories/createExamples'
import { Chip } from './component'

export const chipExamples = defineExamples({
	default: {
		description: 'Filter chips with a selected state.',
		render: () => (
			<>
				<Chip selected>Product</Chip>
				<Chip>Generative</Chip>
				<Chip intent="sky">Editorial</Chip>
			</>
		)
	},
	icons: {
		description: 'Icon and selected-check behavior.',
		render: () => (
			<>
				<Chip leadingIcon="filter">Filtered</Chip>
				<Chip intent="sky" leadingIcon="sparkles">
					Generated
				</Chip>
				<Chip selected>Product</Chip>
			</>
		)
	},
	intents: {
		description: 'Available non-selected intents.',
		render: () => (
			<>
				<Chip>Default</Chip>
				<Chip intent="strong">Strong</Chip>
				<Chip intent="sky">Sky</Chip>
				<Chip intent="subtle">Subtle</Chip>
			</>
		)
	}
})
