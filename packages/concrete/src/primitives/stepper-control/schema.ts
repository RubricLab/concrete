import { z } from 'zod/v4'

export const stepperControlSchema = z
	.object({
		disabled: z.boolean().default(false),
		value: z.number().default(42)
	})
	.strict()

export { stepperControlSchema as stepperControlPropsSchema }
export type StepperControlInput = z.input<typeof stepperControlSchema>
export type StepperControlValue = z.output<typeof stepperControlSchema>
