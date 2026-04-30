import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
import { Texture } from './component'

export const textureExamples = defineExamples({
	default: {
		description: 'Dot and line texture grounds.',
		render: () => (
			<Frame>
				<Texture style={{ height: 96 }} variant="dots" />
				<Texture style={{ height: 96 }} variant="lines" />
			</Frame>
		)
	},
	lattice: {
		description: 'Lattice texture ground.',
		render: () => (
			<Frame>
				<Texture style={{ height: 96 }} variant="lattice" />
				<Texture style={{ height: 96 }} variant="lines" />
			</Frame>
		)
	}
})
