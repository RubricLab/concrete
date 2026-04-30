import { defineExamples } from '../../factories/createExamples'
import { Field } from '../field'
import { Range, RangeInput, RangeTrack, RangeValues } from './component'

export const rangeExamples = defineExamples({
	default: {
		description: 'Two-thumb range control with value rail.',
		render: () => (
			<Field label="Confidence range">
				<Range end={80} start={20}>
					<RangeTrack />
					<RangeInput defaultValue={20} label="Minimum" />
					<RangeInput defaultValue={80} label="Maximum" />
					<RangeValues end={80} start={20} />
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
