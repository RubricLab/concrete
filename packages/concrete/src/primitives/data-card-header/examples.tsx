import { defineExamples } from '../../factories/createExamples'
import { Indicator } from '../indicator'
import { DataCardHeader } from './component'

export const dataCardHeaderExamples = defineExamples({
	compact: {
		description: 'Title-only header for dense generated panels.',
		render: () => (
			<>
				<DataCardHeader end={<Indicator tone="sky">loading</Indicator>} title="Run intensity" />
			</>
		)
	},
	default: {
		description: 'Data card header with title, description, and status.',
		render: () => (
			<>
				<DataCardHeader
					description="Accepted runs across production workspaces."
					end={<Indicator tone="terminal">ready</Indicator>}
					title="Agent runs"
				/>
			</>
		)
	},
	states: {
		description: 'Header state indicators for generated data panels.',
		render: () => (
			<>
				<DataCardHeader
					description="Current run data is still hydrating."
					end={<Indicator tone="sky">loading</Indicator>}
					title="Routing analysis"
				/>
				<DataCardHeader
					description="No runs match the current workspace filters."
					end={<Indicator tone="muted">empty</Indicator>}
					title="Review queue"
				/>
				<DataCardHeader
					description="The latest evaluation batch could not be loaded."
					end={<Indicator tone="error">error</Indicator>}
					title="Evaluation drift"
				/>
			</>
		)
	}
})
