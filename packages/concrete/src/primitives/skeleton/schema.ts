import { z } from 'zod/v4'

export const skeletonSchema = z
	.object({
		height: z.string().default('14'),
		width: z.string().default('70%')
	})
	.strict()

export { skeletonSchema as skeletonPropsSchema }
export type SkeletonInput = z.input<typeof skeletonSchema>
export type SkeletonValue = z.output<typeof skeletonSchema>
