import { z } from 'zod/v4'

export const targetLineSchema = z
	.object({
		label: z.string().default('target 80')
	})
	.strict()

export { targetLineSchema as targetLinePropsSchema }
export type TargetLineInput = z.input<typeof targetLineSchema>
export type TargetLineValue = z.output<typeof targetLineSchema>
