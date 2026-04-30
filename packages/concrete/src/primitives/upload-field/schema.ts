import { z } from 'zod/v4'

export const uploadFieldVariantValues = ['avatar', 'file', 'grid', 'single'] as const

export const uploadFieldSchema = z
	.object({
		variant: z.enum(uploadFieldVariantValues).default('file')
	})
	.strict()

export { uploadFieldSchema as uploadFieldPropsSchema }
export type UploadFieldInput = z.input<typeof uploadFieldSchema>
export type UploadFieldValue = z.output<typeof uploadFieldSchema>
