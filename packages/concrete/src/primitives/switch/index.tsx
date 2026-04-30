import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Switch } from './component'
import { switchExamples } from './examples'
import { switchMeta } from './meta'
import { type SwitchValue, switchSchema } from './schema'

export type { SwitchProps } from './component'
export { Switch } from './component'
export type { SwitchInput, SwitchValue } from './schema'
export { switchPropsSchema, switchSchema } from './schema'

export const switchPrimitiveDefinition = createPrimitive({
	...switchMeta,
	component: Switch,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(switchExamples, state),
	renderInput: input => renderSwitchInput(switchSchema.parse(input)),
	schema: switchSchema,
	slug: 'switch',
	states: exampleStates(switchExamples, ['default', 'disabled'])
})

function renderSwitchInput(input: SwitchValue) {
	return <Switch {...input} readOnly />
}
