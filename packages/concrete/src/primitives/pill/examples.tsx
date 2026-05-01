import { defineExamples } from '../../factories/createExamples'
import { Pill } from './component'

export const pillExamples = defineExamples({
	default: {
		description: 'Quiet metadata pills.',
		render: () => (
			<>
				<Pill>ink</Pill>
				<Pill intent="subtle">queued</Pill>
				<Pill intent="sky">pointer</Pill>
			</>
		)
	},
	icons: {
		description: 'Pills with leading glyphs.',
		render: () => (
			<>
				<Pill leadingIcon="file-text">memo</Pill>
				<Pill intent="ultra" leadingIcon="sparkles">
					generated
				</Pill>
				<Pill intent="terminal" leadingIcon="activity">
					running
				</Pill>
			</>
		)
	},
	signals: {
		description: 'Signal tone pills.',
		render: () => (
			<>
				<Pill intent="terminal">live</Pill>
				<Pill intent="ultra">pro</Pill>
				<Pill intent="danger">blocked</Pill>
			</>
		)
	}
})
