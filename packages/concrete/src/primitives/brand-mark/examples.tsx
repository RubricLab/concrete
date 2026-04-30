import { defineExamples } from '../../factories/createExamples'
import { BrandMark } from './component'

export const brandMarkExamples = defineExamples({
	default: {
		description: 'Default mark tile.',
		render: () => (
			<>
				<BrandMark />
				<BrandMark />
			</>
		)
	},
	inverse: {
		description: 'Inverse mark treatment.',
		render: () => (
			<>
				<BrandMark />
				<BrandMark inverse />
			</>
		)
	}
})
