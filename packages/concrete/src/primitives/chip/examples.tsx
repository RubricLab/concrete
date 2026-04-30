import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Chip } from './component'

export const chipExamples = defineExamples({
	default: {
		description: 'Filter chips with a selected state.',
		render: () => (
			<Frame>
				<Chip selected>Product</Chip>
				<Chip>Generative</Chip>
				<Chip tone="sky">Editorial</Chip>
			</Frame>
		)
	},
	icons: {
		description: 'Icon and selected-check behavior.',
		render: () => (
			<Frame>
				<Chip leadingIcon="filter">Filtered</Chip>
				<Chip leadingIcon="sparkles" tone="sky">
					Generated
				</Chip>
				<Chip selected>Product</Chip>
			</Frame>
		)
	},
	tones: {
		description: 'Available non-selected tones.',
		render: () => (
			<Frame>
				<Chip>Default</Chip>
				<Chip tone="ink">Ink</Chip>
				<Chip tone="sky">Sky</Chip>
				<Chip tone="sunken">Sunken</Chip>
			</Frame>
		)
	}
})
