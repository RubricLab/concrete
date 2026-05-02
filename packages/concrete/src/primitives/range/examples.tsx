import { defineExamples } from '../../factories/createExamples'
import { Field } from '../field'
import { Stack } from '../stack'
import { Range, RangeInput, RangeTrack, RangeValues } from './component'

export const rangeExamples = defineExamples({
	default: {
		description: 'Two-thumb range control with value rail.',
		render: () => (
			<Stack density="compact">
				<Field help="Filter generated runs by model confidence." label="Confidence range">
					<Range end={80} start={20}>
						<RangeTrack />
						<RangeInput defaultValue={20} label="Minimum" />
						<RangeInput defaultValue={80} label="Maximum" />
						<RangeValues end={80} start={20} />
					</Range>
				</Field>
			</Stack>
		)
	},
	disabled: {
		description: 'Locked selected interval.',
		render: () => (
			<Field label="Locked confidence range">
				<Range end={76} start={32}>
					<RangeTrack />
					<RangeInput defaultValue={32} disabled label="Minimum" />
					<RangeInput defaultValue={76} disabled label="Maximum" />
					<RangeValues end={76} start={32} />
				</Range>
			</Field>
		)
	},
	narrow: {
		description: 'Narrow selected range.',
		render: () => (
			<Field label="Confidence range">
				<Range end={58} start={42}>
					<RangeTrack />
					<RangeInput defaultValue={42} label="Minimum" />
					<RangeInput defaultValue={58} label="Maximum" />
					<RangeValues end={58} start={42} />
				</Range>
			</Field>
		)
	}
})
