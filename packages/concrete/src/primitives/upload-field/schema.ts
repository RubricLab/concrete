import { z } from 'zod/v4'

export const uploadFieldKindValues = ['avatar', 'file', 'grid', 'single'] as const
export const uploadFieldDisplayValues = ['stack', 'grid'] as const

export const uploadFieldSchema = z
	.object({
		display: z.enum(uploadFieldDisplayValues).default('stack'),
		kind: z.enum(uploadFieldKindValues).default('file')
	})
	.strict()

export { uploadFieldSchema as uploadFieldPropsSchema }
export type UploadFieldInput = z.input<typeof uploadFieldSchema>
export type UploadFieldValue = z.output<typeof uploadFieldSchema>
