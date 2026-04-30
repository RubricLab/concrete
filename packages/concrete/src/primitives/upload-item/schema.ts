import { z } from 'zod/v4'
import { iconNames } from '../../icons'

export const uploadItemPropsSchema = z
	.object({
		error: z.string().optional(),
		icon: z.enum(iconNames).default('file'),
		meta: z.string().optional(),
		name: z.string().min(1),
		progress: z.number().min(0).max(100).optional(),
		status: z.enum(['error', 'idle', 'success', 'uploading']).default('idle')
	})
	.strict()

export type UploadItemInput = z.input<typeof uploadItemPropsSchema>
export type UploadItemPrimitiveValue = z.output<typeof uploadItemPropsSchema>
