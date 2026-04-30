import { z } from 'zod/v4'

const formShellStatusValues = ['default', 'error', 'success'] as const
const formShellVariantValues = ['panel', 'modal', 'drawer'] as const

export const formShellComponentSchema = z
	.object({
		compact: z.boolean().default(false),
		description: z.string().optional(),
		status: z.enum(formShellStatusValues).default('default'),
		title: z.string().default('Runtime settings'),
		variant: z.enum(formShellVariantValues).default('panel')
	})
	.strict()

export type FormShellInput = z.input<typeof formShellComponentSchema>
export type FormShellValue = z.output<typeof formShellComponentSchema>
