import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
import { Distribution } from './component'

export const distributionExamples = defineExamples({
	default: {
		description: 'Labeled part-to-whole bars.',
		render: () => (
			<Frame>
				<Distribution
					data={[
						{ label: 'Direct', value: 47 },
						{ label: 'Referral', tone: 'sky', value: 28 },
						{ label: 'Agentic', tone: 'terminal', value: 18 }
					]}
				/>
			</Frame>
		)
	}
})
