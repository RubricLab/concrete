import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ControlGroup } from './component'
import { controlGroupExamples } from './examples'
import { controlGroupMeta } from './meta'
import { type ControlGroupValue, controlGroupSchema } from './schema'

export type { ControlGroupProps } from './component'
export { ControlGroup } from './component'
export type { ControlGroupInput, ControlGroupOrientation, ControlGroupValue } from './schema'
export {
	controlGroupOrientationSchema,
	controlGroupPropsSchema,
	controlGroupSchema
} from './schema'

export const controlGroupPrimitiveDefinition = createPrimitive({
	...controlGroupMeta,
	component: ControlGroup,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(controlGroupExamples, state),
	renderInput: input => renderControlGroupInput(controlGroupSchema.parse(input)),
	schema: controlGroupSchema,
	slug: 'control-group',
	states: exampleStates(controlGroupExamples, ['default', 'attached', 'vertical'])
})

function renderControlGroupInput({
	attached,
	content,
	density,
	label,
	orientation
}: ControlGroupValue) {
	return (
		<ControlGroup
			attached={attached}
			density={density}
			orientation={orientation}
			{...(label ? { label } : {})}
		>
			{content}
		</ControlGroup>
	)
}
