import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Card } from './component'

export const cardExamples = defineExamples({
	default: {
		description: 'Default hairline surface.',
		render: () => (
			<Frame>
				<Card description="Border only. The canonical surface." title="Default" />
				<Card description="One step of elevation over canvas." title="Raised" variant="raised" />
				<Card description="Recessed. Code, quotes, wells." title="Sunken" variant="sunken" />
			</Frame>
		)
	},
	raised: {
		description: 'One step of elevation above canvas.',
		render: () => (
			<Frame>
				<Card description="One step of elevation over canvas." title="Raised" variant="raised" />
			</Frame>
		)
	},
	sunken: {
		description: 'Recessed surface for code, quotes, and wells.',
		render: () => (
			<Frame>
				<Card description="Recessed. Code, quotes, wells." title="Sunken" variant="sunken" />
			</Frame>
		)
	}
})
