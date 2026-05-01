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
	showcase: {
		description: 'Larger showcase canvas for generated or component previews.',
		render: () => (
			<Frame
				align="stretch"
				header="Preview"
				headerMeta="showcase"
				scale="showcase"
				texture="perspective"
			>
				body
			</Frame>
		)
	},
	texture: {
		description: 'Textured body ground.',
		render: () => (
			<Frame footer="Footer" footerMeta="meta" header="Eyebrow" headerMeta="meta" texture="field">
				body
			</Frame>
		)
	}
})
