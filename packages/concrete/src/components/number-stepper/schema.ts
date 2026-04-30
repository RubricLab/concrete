import { z } from 'zod/v4'

export const numberStepperComponentSchema = z
	.object({
		error: z.string().optional(),
		label: z.string().default('Agents'),
		max: z.number().default(100),
		min: z.number().default(1),
		step: z.number().default(2),
		value: z.number().default(42)
	})
	.strict()

export type NumberStepperInput = z.input<typeof numberStepperComponentSchema>
export type NumberStepperValue = z.output<typeof numberStepperComponentSchema>
