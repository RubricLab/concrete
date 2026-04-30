import { defineExamples } from '../../factories/createExamples'
import { Card } from './component'

export const cardExamples = defineExamples({
	default: {
		description: 'Default hairline surface.',
		render: () => (
			<>
				<Card description="Border only. The canonical surface." title="Default" />
				<Card description="One step of elevation over canvas." title="Raised" variant="raised" />
				<Card description="Recessed. Code, quotes, wells." title="Sunken" variant="sunken" />
			</>
		)
	},
	raised: {
		description: 'One step of elevation above canvas.',
		render: () => (
			<>
				<Card description="One step of elevation over canvas." title="Raised" variant="raised" />
			</>
		)
	},
	sunken: {
		description: 'Recessed surface for code, quotes, and wells.',
		render: () => (
			<>
				<Card description="Recessed. Code, quotes, wells." title="Sunken" variant="sunken" />
			</>
		)
	}
})
