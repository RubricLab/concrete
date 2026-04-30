import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { CodeBlock } from './component'
import { codeExamples } from './examples'
import { codeMeta } from './meta'
import { type CodeValue, codeSchema } from './schema'

export type { CodeBlockProps, CodeLanguage, InlineCodeProps } from './component'
export { CodeBlock, InlineCode } from './component'
export type { CodeInput, CodeValue } from './schema'
export { codePropsSchema, codeSchema } from './schema'

export const codePrimitiveDefinition = createPrimitive({
	...codeMeta,
	component: CodeBlock,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(codeExamples, state),
	renderInput: input => renderCodeInput(codeSchema.parse(input)),
	schema: codeSchema,
	slug: 'code',
	states: exampleStates(codeExamples, ['default', 'typescript', 'html', 'inline'])
})

function renderCodeInput(input: CodeValue) {
	return <CodeBlock {...input} />
}
