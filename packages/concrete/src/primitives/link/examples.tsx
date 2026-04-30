import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
import { TextLink } from './component'

export const linkExamples = defineExamples({
	default: {
		description: 'Inline text link.',
		render: () => (
			<Frame>
				<TextLink href="#">Open research note</TextLink>
			</Frame>
		)
	},
	nav: {
		description: 'Compact nav link treatment.',
		render: () => (
			<Frame>
				<TextLink href="#" variant="nav">
					Overview
				</TextLink>
				<TextLink href="#" tone="sky" variant="nav">
					Components
				</TextLink>
				<TextLink external href="#" variant="nav">
					Changelog
				</TextLink>
			</Frame>
		)
	},
	tones: {
		description: 'Default, sky, and muted link tones.',
		render: () => (
			<Frame>
				<TextLink href="#">Default</TextLink>
				<TextLink href="#" tone="sky">
					Sky
				</TextLink>
				<TextLink href="#" tone="muted">
					Muted
				</TextLink>
			</Frame>
		)
	}
})
