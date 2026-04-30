import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Slider } from './component'
import { sliderExamples } from './examples'
import { sliderMeta } from './meta'
import { type SliderValue, sliderSchema } from './schema'

export type { SliderProps, SliderTone } from './component'
export { Slider } from './component'
export type { SliderInput, SliderValue } from './schema'
export { sliderPropsSchema, sliderSchema } from './schema'

export const sliderPrimitiveDefinition = createPrimitive({
	...sliderMeta,
	component: Slider,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(sliderExamples, state),
	renderInput: input => renderSliderInput(sliderSchema.parse(input)),
	schema: sliderSchema,
	slug: 'slider',
	states: exampleStates(sliderExamples, ['default', 'sky'])
})

function renderSliderInput({ value, ...input }: SliderValue) {
	return <Slider {...input} defaultValue={value} />
}
