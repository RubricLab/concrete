import { z } from 'zod/v4'
import { uploadItemSchema } from '../../schemas'

const imageUploadVariantSchema = z.enum(['single', 'avatar', 'grid'])
const imageUploadQueueSchema = z.enum(['empty', 'success', 'error'])

export const imageUploadComponentSchema = z
	.object({
		defaultValue: z.array(uploadItemSchema).default([]),
		label: z.string().default('Reference image'),
		queue: imageUploadQueueSchema.default('success'),
		variant: imageUploadVariantSchema.default('single')
	})
	.strict()

export type ImageUploadInput = z.input<typeof imageUploadComponentSchema>
export type ImageUploadValue = z.output<typeof imageUploadComponentSchema>
