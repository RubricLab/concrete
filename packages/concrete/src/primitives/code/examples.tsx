import { defineExamples } from '../../factories/createExamples'
import { CodeBlock, InlineCode } from './component'

export const codeExamples = defineExamples({
	default: {
		description: 'TypeScript code block with inline code.',
		render: () => (
			<>
				<InlineCode>ConcretePressure</InlineCode>
				<CodeBlock
					code={'const state = concreteRegistry.find(item => item.slug === "message-shell")'}
				/>
			</>
		)
	},
	html: {
		description: 'HTML tokenizer hint.',
		render: () => (
			<>
				<CodeBlock code={'<button class="concrete-button">Run</button>'} language="HTML" />
			</>
		)
	},
	inline: {
		description: 'Inline code in prose rhythm.',
		render: () => (
			<>
				<span>
					Use <InlineCode>ConcretePressure</InlineCode> to document composition mode.
				</span>
			</>
		)
	},
	typescript: {
		description: 'Multi-line TypeScript with line numbers.',
		render: () => (
			<>
				<CodeBlock
					code={[
						'const queue = migrationQueue.next()',
						'const result = await catalogAudit.run(queue.routes)',
						'return result.status'
					].join('\n')}
				/>
			</>
		)
	}
})
