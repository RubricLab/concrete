import { defineExamples } from '../../factories/createExamples'
import { Field } from '../field'
import { RangeControl, RangeInput, RangeTrack, RangeValues } from './component'

export const rangeControlExamples = defineExamples({
	default: {
		description: 'Two-thumb range control with value rail.',
		render: () => (
			<Field label="Confidence range">
				<RangeControl end={80} start={20}>
					<RangeTrack />
					<RangeInput defaultValue={20} label="Minimum" />
					<RangeInput defaultValue={80} label="Maximum" />
					<RangeValues end={80} start={20} />
				</RangeControl>
			</Field>
		)
	},
	narrow: {
		description: 'Narrow selected range.',
		render: () => (
			<Field label="Confidence range">
				<RangeControl end={58} start={42}>
					<RangeTrack />
					<RangeInput defaultValue={42} label="Minimum" />
					<RangeInput defaultValue={58} label="Maximum" />
					<RangeValues end={58} start={42} />
				</RangeControl>
			</Field>
		)
	}
})
