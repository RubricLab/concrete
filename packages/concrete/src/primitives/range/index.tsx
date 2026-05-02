import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Range, RangeInput, RangeTrack, RangeValues } from './component'
import { rangeExamples } from './examples'
import { rangeMeta } from './meta'
import { type RangeValue, rangeSchema } from './schema'

export type {
	RangeInputProps,
	RangeProps,
	RangeTrackProps,
	RangeValuesProps
} from './component'
export { Range, RangeInput, RangeTrack, RangeValues } from './component'
export type { RangePrimitiveInput, RangeValue } from './schema'
export { rangePropsSchema, rangeSchema } from './schema'

export const rangePrimitiveDefinition = createPrimitive({
	...rangeMeta,
	component: Range,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(rangeExamples, state),
	renderInput: input => renderRangeInput(rangeSchema.parse(input)),
	schema: rangeSchema,
	slug: 'range',
	states: exampleStates(rangeExamples, ['default', 'disabled', 'narrow'])
})

function renderRangeInput({ end, start }: RangeValue) {
	return (
		<Range end={end} start={start}>
			<RangeTrack />
			<RangeInput defaultValue={start} label="Minimum" />
			<RangeInput defaultValue={end} label="Maximum" />
			<RangeValues end={end} start={start} />
		</Range>
	)
}
