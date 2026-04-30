import { defineExamples } from '../../factories/createExamples'
import { TexturePreview } from './component'

export const textureExamples = defineExamples({
	default: {
		description: 'Dot, line, lattice, and depth texture grounds.',
		render: () => (
			<>
				<TexturePreview variant="dots" />
				<TexturePreview variant="lines" />
				<TexturePreview variant="lattice" />
			</>
		)
	},
	depth: {
		description: 'Perspective depth ground for system diagrams and high-contrast sections.',
		render: () => <TexturePreview variant="depth" />
	},
	lattice: {
		description: 'Lattice texture ground.',
		render: () => (
			<>
				<TexturePreview variant="lattice" />
				<TexturePreview variant="depth" />
			</>
		)
	}
})
