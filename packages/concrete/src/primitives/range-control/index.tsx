import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { RangeControl, RangeInput, RangeTrack, RangeValues } from './component'
import { rangeControlExamples } from './examples'
import { rangeControlMeta } from './meta'
import { type RangeControlValue, rangeControlSchema } from './schema'

export type {
	RangeControlProps,
	RangeInputProps,
	RangeTrackProps,
	RangeValuesProps
} from './component'
export { RangeControl, RangeInput, RangeTrack, RangeValues } from './component'
export type { RangeControlInput, RangeControlValue } from './schema'
export { rangeControlPropsSchema, rangeControlSchema } from './schema'

export const rangeControlPrimitiveDefinition = createPrimitive({
	...rangeControlMeta,
	component: RangeControl,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(rangeControlExamples, state),
	renderInput: input => renderRangeControlInput(rangeControlSchema.parse(input)),
	schema: rangeControlSchema,
	slug: 'range-control',
	states: exampleStates(rangeControlExamples, ['default', 'narrow'])
})

function renderRangeControlInput({ end, start }: RangeControlValue) {
	return (
		<RangeControl end={end} start={start}>
			<RangeTrack />
			<RangeInput defaultValue={start} label="Minimum" />
			<RangeInput defaultValue={end} label="Maximum" />
			<RangeValues end={end} start={start} />
		</RangeControl>
	)
}
