import { defineExamples } from '../../factories/createExamples'
import { Delta } from '../delta/component'
import { Frame } from '../frame/component'
import { Stat } from './component'

export const statExamples = defineExamples({
	default: {
		description: 'Dashboard stat lockup.',
		render: () => (
			<Frame>
				<Stat
					delta={<Delta intent="positive" value="18.6%" />}
					label="Runs"
					meta=" last 7d"
					value="14.8k"
				/>
			</Frame>
		)
	},
	display: {
		description: 'Editorial display treatment.',
		render: () => (
			<Frame>
				<Stat size="xlarge" value="98.2" variant="display" />
				<Stat tone="sky" unit="%" value="42" variant="display" />
			</Frame>
		)
	},
	numeric: {
		description: 'Standalone numeric treatment.',
		render: () => (
			<Frame>
				<Stat size="large" unit="ms" value="184" variant="numeric" />
				<Stat tone="muted" value="0.04" variant="numeric" />
			</Frame>
		)
	}
})
