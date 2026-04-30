import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
import { CodeBlock, InlineCode } from './component'

export const codeExamples = defineExamples({
	default: {
		description: 'TypeScript code block with inline code.',
		render: () => (
			<Frame>
				<InlineCode>ConcretePressure</InlineCode>
				<CodeBlock code={'const signal = concreteSignalSchema.parse("terminal")'} />
			</Frame>
		)
	},
	html: {
		description: 'HTML tokenizer hint.',
		render: () => (
			<Frame>
				<CodeBlock code={'<button class="concrete-button">Run</button>'} language="HTML" />
			</Frame>
		)
	},
	inline: {
		description: 'Inline code in prose rhythm.',
		render: () => (
			<Frame>
				<span>
					Use <InlineCode>ConcretePressure</InlineCode> to document composition mode.
				</span>
			</Frame>
		)
	}
})
