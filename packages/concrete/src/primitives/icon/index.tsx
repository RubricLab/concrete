import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { IconPrimitive } from './component'
import { iconExamples } from './examples'
import { iconMeta } from './meta'
import { type IconValue, iconSchema } from './schema'

export type { IconInput, IconValue } from './schema'
export { iconPropsSchema, iconSchema } from './schema'

export const iconPrimitiveDefinition = createPrimitive({
	...iconMeta,
	component: IconPrimitive,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(iconExamples, state),
	renderInput: input => renderIconInput(iconSchema.parse(input)),
	schema: iconSchema,
	slug: 'icon',
	states: exampleStates(iconExamples, ['default', 'inline'])
})

function renderIconInput({ name, title }: { name: IconValue['name']; title?: IconValue['title'] }) {
	return <IconPrimitive name={name} {...(title ? { title } : {})} />
}
