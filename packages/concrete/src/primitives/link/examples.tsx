import { defineExamples } from '../../factories/createExamples'
import { TextLink } from './component'

export const linkExamples = defineExamples({
	default: {
		description: 'Inline text link.',
		render: () => (
			<>
				<TextLink href="#">Open research note</TextLink>
			</>
		)
	},
	nav: {
		description: 'Compact nav link treatment with current page state.',
		render: () => (
			<>
				<TextLink current href="#" variant="nav">
					Overview
				</TextLink>
				<TextLink href="#" tone="sky" variant="nav">
					Components
				</TextLink>
				<TextLink external href="#" variant="nav">
					Changelog
				</TextLink>
			</>
		)
	},
	tones: {
		description: 'Default, sky, and muted link tones.',
		render: () => (
			<>
				<TextLink href="#">Default</TextLink>
				<TextLink href="#" tone="sky">
					Sky
				</TextLink>
				<TextLink href="#" tone="muted">
					Muted
				</TextLink>
			</>
		)
	}
})
