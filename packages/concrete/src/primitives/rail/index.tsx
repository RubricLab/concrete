import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Rail } from './component'
import { railExamples } from './examples'
import { railMeta } from './meta'
import { type RailValue, railSchema } from './schema'

export type { RailProps } from './component'
export { Rail } from './component'
export type { RailAlign, RailInput, RailOrientation, RailValue } from './schema'
export { railAlignSchema, railOrientationSchema, railPropsSchema, railSchema } from './schema'

export const railPrimitiveDefinition = createPrimitive({
	...railMeta,
	component: Rail,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(railExamples, state),
	renderInput: input => renderRailInput(railSchema.parse(input)),
	schema: railSchema,
	slug: 'rail',
	states: exampleStates(railExamples, ['default', 'horizontal'])
})

function renderRailInput({ align, content, density, orientation }: RailValue) {
	return (
		<Rail align={align} density={density} orientation={orientation}>
			{content}
		</Rail>
	)
}
