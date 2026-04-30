import { z } from 'zod/v4'

export const previewStageLayoutValues = ['block', 'grid', 'stack'] as const
export const previewStageWidthValues = [
	'composer',
	'control',
	'data',
	'feedback',
	'form',
	'full',
	'media',
	'message',
	'search'
] as const

export const previewStageSchema = z
	.object({
		layout: z.enum(previewStageLayoutValues).default('block'),
		width: z.enum(previewStageWidthValues).default('full')
	})
	.strict()

export { previewStageSchema as previewStagePropsSchema }
export type PreviewStageInput = z.input<typeof previewStageSchema>
export type PreviewStageValue = z.output<typeof previewStageSchema>
