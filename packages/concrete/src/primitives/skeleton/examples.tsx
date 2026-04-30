import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Skeleton } from './component'

export const skeletonExamples = defineExamples({
	avatar: {
		description: 'Compact identity placeholder.',
		render: () => (
			<Frame>
				<Skeleton width="70%" />
				<Skeleton height={28} width="100%" />
				<Skeleton height={36} width={36} />
			</Frame>
		)
	},
	default: {
		description: 'Text and block skeletons.',
		render: () => (
			<Frame>
				<Skeleton width="70%" />
				<Skeleton height={28} width="100%" />
				<Skeleton height={14} width="54%" />
			</Frame>
		)
	}
})
