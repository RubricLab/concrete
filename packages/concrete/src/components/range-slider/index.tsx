import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { RangeSlider } from './component'
import { rangeSliderExamples } from './examples'
import { rangeSliderMeta } from './meta'
import { type RangeSliderValueInput, rangeSliderComponentSchema } from './schema'

export type { RangeSliderProps, RangeSliderValue } from './component'
export { RangeSlider } from './component'
export type { RangeSliderInput, RangeSliderValueInput } from './schema'
export { rangeSliderComponentSchema } from './schema'

export const rangeSliderComponentDefinition = createComponent({
	...rangeSliderMeta,
	component: RangeSlider,
	kind: 'component',
	renderExample: (state?: string) => renderExample(rangeSliderExamples, state),
	renderInput: input => renderRangeSliderInput(rangeSliderComponentSchema.parse(input)),
	schema: rangeSliderComponentSchema,
	slug: 'range-slider',
	states: exampleStates(rangeSliderExamples, ['default', 'narrow', 'wide', 'error'])
})

function renderRangeSliderInput(input: RangeSliderValueInput) {
	return <RangeSlider {...input} />
}
