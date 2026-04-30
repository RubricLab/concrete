import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Pill } from './component'

export const pillExamples = defineExamples({
	default: {
		description: 'Quiet metadata pills.',
		render: () => (
			<Frame>
				<Pill>ink</Pill>
				<Pill tone="sunken">queued</Pill>
				<Pill tone="sky">pointer</Pill>
			</Frame>
		)
	},
	icons: {
		description: 'Pills with leading glyphs.',
		render: () => (
			<Frame>
				<Pill leadingIcon="file-text">memo</Pill>
				<Pill leadingIcon="sparkles" tone="ultra">
					generated
				</Pill>
				<Pill leadingIcon="activity" tone="terminal">
					running
				</Pill>
			</Frame>
		)
	},
	signals: {
		description: 'Signal tone pills.',
		render: () => (
			<Frame>
				<Pill tone="terminal">live</Pill>
				<Pill tone="ultra">pro</Pill>
				<Pill tone="error">blocked</Pill>
			</Frame>
		)
	}
})
