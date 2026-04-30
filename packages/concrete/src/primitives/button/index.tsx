import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Button } from './component'
import { buttonExamples } from './examples'
import { buttonMeta } from './meta'
import { type ButtonValue, buttonSchema } from './schema'

export type { ButtonProps, ButtonSize, ButtonVariant } from './component'
export { Button } from './component'
export type { ButtonInput, ButtonValue } from './schema'
export { buttonPropsSchema, buttonSchema, buttonSizeSchema, buttonVariantSchema } from './schema'

export const buttonPrimitiveDefinition = createPrimitive({
	...buttonMeta,
	component: Button,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(buttonExamples, state),
	renderInput: input => renderButtonInput(buttonSchema.parse(input)),
	schema: buttonSchema,
	slug: 'button',
	states: exampleStates(buttonExamples, ['default', 'sizes', 'signal', 'pressed', 'loading'])
})

function renderButtonInput({ label, leadingIcon, trailingIcon, ...props }: ButtonValue) {
	return (
		<Button
			{...props}
			{...(leadingIcon ? { leadingIcon } : {})}
			{...(trailingIcon ? { trailingIcon } : {})}
		>
			{label}
		</Button>
	)
}
