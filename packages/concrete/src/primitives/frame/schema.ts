import { z } from 'zod/v4'

const frameTextureValues = ['', 'lattice', 'dots', 'lines'] as const

export const frameSchema = z
	.object({
		body: z.string().default('body'),
		footer: z.string().optional(),
		footerMeta: z.string().optional(),
		header: z.string().optional(),
		headerMeta: z.string().optional(),
		texture: z.enum(frameTextureValues).default('')
	})
	.strict()

export { frameSchema as framePropsSchema }
export type FrameInput = z.input<typeof frameSchema>
export type FrameValue = z.output<typeof frameSchema>
