import { defineExamples } from '../../factories/createExamples'
import { Progress } from './component'

export const progressExamples = defineExamples({
	default: {
		description: 'Linear progress.',
		render: () => (
			<>
				<Progress value={62} />
				<Progress density="compact" intent="sky" value={38} />
				<Progress density="editorial" intent="terminal" value={82} />
			</>
		)
	},
	indeterminate: {
		description: 'Unknown-duration shuttle and lined states.',
		render: () => (
			<>
				<Progress indeterminate="shuttle" />
				<Progress indeterminate="shuttle" intent="sky" />
				<Progress indeterminate="lined" />
			</>
		)
	},
	signals: {
		description: 'Signal tone variants.',
		render: () => (
			<>
				<Progress intent="sky" value={68} />
				<Progress intent="terminal" value={42} />
				<Progress intent="ultra" value={58} />
				<Progress intent="danger" value={22} />
			</>
		)
	}
})
