import { defineExamples } from '../../factories/createExamples'
import { Chip } from './component'

export const chipExamples = defineExamples({
	default: {
		description: 'Filter chips with a selected state.',
		render: () => (
			<>
				<Chip selected>Product</Chip>
				<Chip>Generative</Chip>
				<Chip tone="sky">Editorial</Chip>
			</>
		)
	},
	icons: {
		description: 'Icon and selected-check behavior.',
		render: () => (
			<>
				<Chip leadingIcon="filter">Filtered</Chip>
				<Chip leadingIcon="sparkles" tone="sky">
					Generated
				</Chip>
				<Chip selected>Product</Chip>
			</>
		)
	},
	tones: {
		description: 'Available non-selected tones.',
		render: () => (
			<>
				<Chip>Default</Chip>
				<Chip tone="ink">Ink</Chip>
				<Chip tone="sky">Sky</Chip>
				<Chip tone="sunken">Sunken</Chip>
			</>
		)
	}
})
