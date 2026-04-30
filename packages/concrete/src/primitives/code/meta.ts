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
		prop('mode', "'block' | 'command'", 'Block excerpt or compact command treatment.', 'block'),
		prop('language', 'string', 'Header label and syntax tokenizer hint.', 'TypeScript'),
		prop('showLineNumbers', 'boolean', 'Renders the numeric gutter. Defaults on for block mode.'),
		prop('copyable', 'boolean', 'Renders the internal clipboard copy action.', 'true'),
		prop('copyValue', 'string', 'Overrides copied text while leaving visible code unchanged.'),
		prop('copyLabel', 'ReactNode', 'Copy button label.', 'Copy'),
		prop('copiedLabel', 'ReactNode', 'Transient successful copy label.', 'Copied'),
		prop('copyErrorLabel', 'ReactNode', 'Transient failed copy label.', 'Failed'),
		prop('children', 'ReactNode', 'InlineCode text content.')
	]
} as const satisfies CodeMeta
