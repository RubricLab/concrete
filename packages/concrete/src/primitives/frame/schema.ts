import { z } from 'zod/v4'

const frameAlignValues = ['start', 'center', 'stretch'] as const
const frameScaleValues = ['compact', 'standard', 'showcase'] as const
const frameTextureValues = [
	'',
	'lattice',
	'dots',
	'lines',
	'field',
	'perspective',
	'depth'
] as const

export const frameSchema = z
	.object({
		align: z.enum(frameAlignValues).default('center'),
		body: z.string().default('body'),
		footer: z.string().optional(),
		footerMeta: z.string().optional(),
		header: z.string().optional(),
		headerMeta: z.string().optional(),
		scale: z.enum(frameScaleValues).default('standard'),
		texture: z.enum(frameTextureValues).default('')
	})
	.strict()

export { frameSchema as framePropsSchema }
export type FrameAlign = (typeof frameAlignValues)[number]
export type FrameInput = z.input<typeof frameSchema>
export type FrameScale = (typeof frameScaleValues)[number]
export type FrameValue = z.output<typeof frameSchema>
