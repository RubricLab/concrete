import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Text } from './component'
import { textExamples } from './examples'
import { textMeta } from './meta'
import { type TextValue, textSchema } from './schema'

export type { TextProps } from './component'
export { Text } from './component'
export type { TextElement, TextInput, TextPurpose, TextTone, TextValue } from './schema'
export {
	textElementSchema,
	textPropsSchema,
	textPurposeSchema,
	textSchema,
	textToneSchema
} from './schema'

export const textPrimitiveDefinition = createPrimitive({
	...textMeta,
	component: Text,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(textExamples, state),
	renderInput: input => renderTextInput(textSchema.parse(input)),
	schema: textSchema,
	slug: 'text',
	states: exampleStates(textExamples, ['default', 'meta', 'numeric'])
})

function renderTextInput({ as, content, purpose, tone }: TextValue) {
	return (
		<Text as={as} purpose={purpose} tone={tone}>
			{content}
		</Text>
	)
}
