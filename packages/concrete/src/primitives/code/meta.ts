import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type CodeMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const codeMeta = {
	category: 'typography',
	description: 'Mono code block and inline code treatment.',
	guidance:
		'Code should remain compact and inspectable. Use blocks for excerpts and InlineCode only for short identifiers inside prose.',
	name: 'Code',
	pressure: ['editorial', 'product'],
	props: [
		prop('code', 'string', 'CodeBlock source text.', '', true),
		prop('language', 'string', 'Header label and syntax tokenizer hint.', 'TypeScript'),
		prop('showLineNumbers', 'boolean', 'Renders the numeric gutter.', 'true'),
		prop('copyLabel', 'ReactNode', 'Copy button label.', 'Copy'),
		prop('children', 'ReactNode', 'InlineCode text content.')
	]
} as const satisfies CodeMeta
