import { defineExamples } from '../../factories/createExamples'
import { TexturePreview } from './component'

export const textureExamples = defineExamples({
	default: {
		description: 'Dot and line texture grounds.',
		render: () => (
			<>
				<TexturePreview variant="dots" />
				<TexturePreview variant="lines" />
			</>
		)
	},
	lattice: {
		description: 'Lattice texture ground.',
		render: () => (
			<>
				<TexturePreview variant="lattice" />
				<TexturePreview variant="lines" />
			</>
		)
	}
})
