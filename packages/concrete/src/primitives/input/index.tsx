import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Input } from './component'
import { inputExamples } from './examples'
import { inputMeta } from './meta'
import { type InputValue, inputSchema } from './schema'

export type { InputControlProps, InputProps } from './component'
export { Input, InputControl } from './component'
export type { InputInput, InputValue } from './schema'
export { inputPropsSchema, inputSchema } from './schema'

export const inputPrimitiveDefinition = createPrimitive({
	...inputMeta,
	component: Input,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(inputExamples, state),
	renderInput: input => renderInputInput(inputSchema.parse(input)),
	schema: inputSchema,
	slug: 'input',
	states: exampleStates(inputExamples, ['default', 'filled', 'error', 'disabled', 'inlineControl'])
})

function renderInputInput({ value, ...input }: InputValue) {
	return <Input {...input} defaultValue={value} />
}
