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
				<TextLink current href="#" purpose="nav">
					Overview
				</TextLink>
				<TextLink href="#" intent="sky" purpose="nav">
					Components
				</TextLink>
				<TextLink external href="#" purpose="nav">
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
				<TextLink href="#" intent="sky">
					Sky
				</TextLink>
				<TextLink href="#" intent="muted">
					Muted
				</TextLink>
			</>
		)
	}
})
