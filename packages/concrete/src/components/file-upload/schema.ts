import { z } from 'zod/v4'
import { uploadItemSchema } from '../../schemas'

const fileUploadQueueSchema = z.enum(['empty', 'uploading', 'success', 'error'])

export const fileUploadComponentSchema = z
	.object({
		accept: z.string().min(1).optional(),
		defaultValue: z.array(uploadItemSchema).default([]),
		descriptionText: z.string().default('Drop PDFs, images, or source packets.'),
		label: z.string().default('Artifacts'),
		maxSize: z.number().int().positive().optional(),
		multiple: z.boolean().default(true),
		previewImages: z.boolean().default(false),
		queue: fileUploadQueueSchema.default('uploading'),
		title: z.string().default('Upload files')
	})
	.strict()

export type FileUploadInput = z.input<typeof fileUploadComponentSchema>
export type FileUploadValue = z.output<typeof fileUploadComponentSchema>
