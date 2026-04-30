import { defineExamples } from '../../factories/createExamples'
import { Pill } from './component'

export const pillExamples = defineExamples({
	default: {
		description: 'Quiet metadata pills.',
		render: () => (
			<>
				<Pill>ink</Pill>
				<Pill tone="sunken">queued</Pill>
				<Pill tone="sky">pointer</Pill>
			</>
		)
	},
	icons: {
		description: 'Pills with leading glyphs.',
		render: () => (
			<>
				<Pill leadingIcon="file-text">memo</Pill>
				<Pill leadingIcon="sparkles" tone="ultra">
					generated
				</Pill>
				<Pill leadingIcon="activity" tone="terminal">
					running
				</Pill>
			</>
		)
	},
	signals: {
		description: 'Signal tone pills.',
		render: () => (
			<>
				<Pill tone="terminal">live</Pill>
				<Pill tone="ultra">pro</Pill>
				<Pill tone="error">blocked</Pill>
			</>
		)
	}
})
