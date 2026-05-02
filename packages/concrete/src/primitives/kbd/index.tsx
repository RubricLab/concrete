import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Kbd } from './component'
import { kbdExamples } from './examples'
import { kbdMeta } from './meta'
import { type KbdValue, kbdSchema } from './schema'

export type { KbdProps } from './component'
export { Kbd } from './component'
export type { KbdInput, KbdValue } from './schema'
export { kbdIntentValues, kbdPropsSchema, kbdSchema } from './schema'

export const kbdPrimitiveDefinition = createPrimitive({
	...kbdMeta,
	component: Kbd,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(kbdExamples, state),
	renderInput: input => renderKbdInput(kbdSchema.parse(input)),
	schema: kbdSchema,
	slug: 'kbd',
	states: exampleStates(kbdExamples, ['default', 'shortcut'])
})

function renderKbdInput({ label, ...input }: KbdValue) {
	return <Kbd {...input}>{label}</Kbd>
}
