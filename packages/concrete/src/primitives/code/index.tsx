import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { CodeBlock } from './component'
import { codeExamples } from './examples'
import { codeMeta } from './meta'
import { type CodeValue, codeSchema } from './schema'

export type { CodeBlockMode, CodeBlockProps, CodeLanguage, InlineCodeProps } from './component'
export { CodeBlock, InlineCode } from './component'
export type { CodeBlockModeValue, CodeInput, CodeLanguageValue, CodeValue } from './schema'
export { codeBlockModeSchema, codeLanguageSchema, codePropsSchema, codeSchema } from './schema'

export const codePrimitiveDefinition = createPrimitive({
	...codeMeta,
	component: CodeBlock,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(codeExamples, state),
	renderInput: input => renderCodeInput(codeSchema.parse(input)),
	schema: codeSchema,
	slug: 'code',
	states: exampleStates(codeExamples, ['default', 'typescript', 'html', 'command', 'inline'])
})

function renderCodeInput({ copyValue, showLineNumbers, ...input }: CodeValue) {
	return (
		<CodeBlock
			{...input}
			{...(copyValue ? { copyValue } : {})}
			{...(typeof showLineNumbers === 'boolean' ? { showLineNumbers } : {})}
		/>
	)
}
