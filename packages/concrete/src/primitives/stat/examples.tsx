import { defineExamples } from '../../factories/createExamples'
import { Delta } from '../delta/component'
import { Stat } from './component'

export const statExamples = defineExamples({
	default: {
		description: 'Dashboard stat lockup.',
		render: () => (
			<>
				<Stat
					delta={<Delta intent="positive" value="18.6%" />}
					label="Runs"
					meta=" last 7d"
					value="14.8k"
				/>
			</>
		)
	},
	display: {
		description: 'Editorial display treatment.',
		render: () => (
			<>
				<Stat density="display" purpose="display" value="98.2" />
				<Stat intent="sky" purpose="display" unit="%" value="42" />
			</>
		)
	},
	intents: {
		description: 'Stat intent treatments for dashboard hierarchy.',
		render: () => (
			<>
				<Stat intent="sky" label="Accepted" value="64%" />
				<Stat intent="muted" label="Reviewed" value="22%" />
				<Stat label="Blocked" value="5%" />
			</>
		)
	},
	numeric: {
		description: 'Standalone numeric treatment.',
		render: () => (
			<>
				<Stat density="editorial" purpose="numeric" unit="ms" value="184" />
				<Stat intent="muted" purpose="numeric" value="0.04" />
			</>
		)
	}
})
