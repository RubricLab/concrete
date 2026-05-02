import { z } from 'zod/v4'

export const tiltFrameSchema = z
	.object({
		body: z.string().default('Depth-aware surface'),
		intensity: z.enum(['subtle', 'medium']).default('subtle'),
		interactive: z.boolean().default(true),
		surface: z.enum(['raised', 'sunken', 'transparent']).default('raised')
	})
	.strict()

export { tiltFrameSchema as tiltFramePropsSchema }
export type TiltFrameInput = z.input<typeof tiltFrameSchema>
export type TiltFrameValue = z.output<typeof tiltFrameSchema>
