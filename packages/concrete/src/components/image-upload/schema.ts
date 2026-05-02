import { z } from 'zod/v4'
import { uploadItemSchema } from '../../schemas'

const imageUploadKindSchema = z.enum(['single', 'avatar', 'grid'])
const imageUploadQueueSchema = z.enum(['empty', 'error', 'mixed', 'success', 'uploading'])

export const imageUploadComponentSchema = z
	.object({
		defaultValue: z.array(uploadItemSchema).default([]),
		kind: imageUploadKindSchema.default('single'),
		label: z.string().default('Reference image'),
		maxSize: z.number().int().positive().optional(),
		multiple: z.boolean().default(true),
		queue: imageUploadQueueSchema.default('mixed')
	})
	.strict()

export type ImageUploadInput = z.input<typeof imageUploadComponentSchema>
export type ImageUploadValue = z.output<typeof imageUploadComponentSchema>
