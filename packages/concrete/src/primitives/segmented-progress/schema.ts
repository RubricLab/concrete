import { z } from 'zod/v4'

export const segmentedProgressSchema = z
	.object({
		segments: z.number().int().min(1).default(8),
		value: z.number().min(0).default(5)
	})
	.strict()

export { segmentedProgressSchema as segmentedProgressPropsSchema }
export type SegmentedProgressInput = z.input<typeof segmentedProgressSchema>
export type SegmentedProgressValue = z.output<typeof segmentedProgressSchema>
