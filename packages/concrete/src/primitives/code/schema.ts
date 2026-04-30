import { z } from 'zod/v4'

export const codeSchema = z
	.object({
		code: z.string().default('const signal = concreteSignalSchema.parse("terminal")'),
		language: z.enum(['TypeScript', 'HTML']).default('TypeScript'),
		showLineNumbers: z.boolean().default(true)
	})
	.strict()

export { codeSchema as codePropsSchema }
export type CodeInput = z.input<typeof codeSchema>
export type CodeValue = z.output<typeof codeSchema>
