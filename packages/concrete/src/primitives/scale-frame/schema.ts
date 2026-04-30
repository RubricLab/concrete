import { z } from 'zod/v4'

export const scaleFrameSchema = z
	.object({
		align: z.enum(['start', 'center', 'end']).default('center'),
		body: z.string().default('Scaled preview content'),
		scale: z.number().min(0.15).max(1.25).default(1),
		surface: z.enum(['raised', 'sunken', 'transparent']).default('transparent')
	})
	.strict()

export { scaleFrameSchema as scaleFramePropsSchema }
export type ScaleFrameInput = z.input<typeof scaleFrameSchema>
export type ScaleFrameValue = z.output<typeof scaleFrameSchema>
