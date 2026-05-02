import { z } from 'zod/v4'

export const codeBlockModeSchema = z.enum(['block', 'command'])
export const codeLanguageSchema = z.enum(['Bash', 'HTML', 'Shell', 'TypeScript'])

export const codeSchema = z
	.object({
		code: z.string().default('const signal = concreteSignalSchema.parse("terminal")'),
		copiedLabel: z.string().default('Copied'),
		copyable: z.boolean().default(true),
		copyErrorLabel: z.string().default('Failed'),
		copyLabel: z.string().default('Copy'),
		copyValue: z.string().optional(),
		language: codeLanguageSchema.default('TypeScript'),
		mode: codeBlockModeSchema.default('block'),
		showLineNumbers: z.boolean().optional()
	})
	.strict()

export { codeSchema as codePropsSchema }
export type CodeBlockModeValue = z.infer<typeof codeBlockModeSchema>
export type CodeInput = z.input<typeof codeSchema>
export type CodeLanguageValue = z.infer<typeof codeLanguageSchema>
export type CodeValue = z.output<typeof codeSchema>
