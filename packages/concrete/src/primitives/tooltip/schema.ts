import { z } from 'zod/v4'

export const tooltipSchema = z
	.object({
		content: z.string().default('Use one short sentence.'),
		forceOpen: z.boolean().default(true),
		placement: z.enum(['top', 'right', 'bottom', 'left']).default('top'),
		title: z.string().optional()
	})
	.strict()

export { tooltipSchema as tooltipPropsSchema }
export type TooltipInput = z.input<typeof tooltipSchema>
export type TooltipValue = z.output<typeof tooltipSchema>
