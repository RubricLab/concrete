import { z } from 'zod/v4'

export const sparklineSchema = z
	.object({
		area: z.boolean().default(false),
		display: z.enum(['line', 'bar', 'dot']).default('line'),
		intent: z.enum(['sky', 'neutral', 'terminal', 'error']).default('sky'),
		showEndpoint: z.boolean().default(true),
		values: z.array(z.number()).default([12, 18, 16, 24, 22, 31, 28, 36])
	})
	.strict()

export { sparklineSchema as sparklinePropsSchema }
export type SparklineInput = z.input<typeof sparklineSchema>
export type SparklineValue = z.output<typeof sparklineSchema>
