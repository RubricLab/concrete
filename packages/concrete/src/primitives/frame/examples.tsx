import { defineExamples } from '../../factories/createExamples'
import { Frame } from './component'

export const frameExamples = defineExamples({
	default: {
		description: 'Header, body, and footer chrome.',
		render: () => (
			<Frame footer="Footer" footerMeta="meta" header="Eyebrow" headerMeta="meta">
				body
			</Frame>
		)
	},
	texture: {
		description: 'Textured body ground.',
		render: () => (
			<Frame footer="Footer" footerMeta="meta" header="Eyebrow" headerMeta="meta" texture="lattice">
				body
			</Frame>
		)
	}
})
