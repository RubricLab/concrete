import { z } from 'zod/v4'

const formDialogSizeValues = ['compact', 'default', 'wide'] as const
const formDialogStatusValues = ['default', 'error', 'success'] as const
const overlayPresentationValues = ['inline', 'fixed'] as const

export const formDialogComponentSchema = z
	.object({
		description: z.string().optional(),
		open: z.boolean().default(true),
		presentation: z.enum(overlayPresentationValues).default('inline'),
		size: z.enum(formDialogSizeValues).default('default'),
		status: z.enum(formDialogStatusValues).default('default'),
		title: z.string().default('New experiment')
	})
	.strict()

export type FormDialogInput = z.input<typeof formDialogComponentSchema>
export type FormDialogValue = z.output<typeof formDialogComponentSchema>
