import { z } from 'zod/v4'

export const sparklineSchema = z
	.object({
		area: z.boolean().default(false),
		showEndpoint: z.boolean().default(true),
		tone: z.enum(['sky', 'neutral', 'terminal', 'error']).default('sky'),
		values: z.array(z.number()).default([12, 18, 16, 24, 22, 31, 28, 36]),
		variant: z.enum(['line', 'bar', 'dot']).default('line')
	})
	.strict()

export { sparklineSchema as sparklinePropsSchema }
export type SparklineInput = z.input<typeof sparklineSchema>
export type SparklineValue = z.output<typeof sparklineSchema>
