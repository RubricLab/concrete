import { z } from 'zod/v4'

export const stepperSchema = z
	.object({
		disabled: z.boolean().default(false),
		value: z.number().default(42)
	})
	.strict()

export { stepperSchema as stepperPropsSchema }
export type StepperPrimitiveInput = z.input<typeof stepperSchema>
export type StepperValue = z.output<typeof stepperSchema>
