import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { PasswordInput } from './component'
import { passwordInputExamples } from './examples'
import { passwordInputMeta } from './meta'
import { type PasswordInputValue, passwordInputComponentSchema } from './schema'

export type { PasswordInputProps } from './component'
export { PasswordInput } from './component'
export type { PasswordInputInput, PasswordInputValue } from './schema'
export { passwordInputComponentSchema } from './schema'

export const passwordInputComponentDefinition = createComponent({
	...passwordInputMeta,
	component: PasswordInput,
	kind: 'component',
	renderExample: (state?: string) => renderExample(passwordInputExamples, state),
	renderInput: input => renderPasswordInputInput(passwordInputComponentSchema.parse(input)),
	schema: passwordInputComponentSchema,
	slug: 'password-input',
	states: exampleStates(passwordInputExamples, ['default', 'success', 'error'])
})

function renderPasswordInputInput({ value, ...input }: PasswordInputValue) {
	return <PasswordInput {...input} defaultValue={value} />
}
