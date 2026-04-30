import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
import { BrandMark } from './component'

export const brandMarkExamples = defineExamples({
	default: {
		description: 'Default mark tile.',
		render: () => (
			<Frame>
				<BrandMark />
				<BrandMark />
			</Frame>
		)
	},
	inverse: {
		description: 'Inverse mark treatment.',
		render: () => (
			<Frame>
				<BrandMark />
				<BrandMark inverse />
			</Frame>
		)
	}
})
