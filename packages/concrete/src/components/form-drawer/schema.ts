import { z } from 'zod/v4'

const formDrawerStatusValues = ['default', 'error', 'success'] as const
const overlayPresentationValues = ['inline', 'fixed'] as const
const formDrawerSideValues = ['left', 'right'] as const

export const formDrawerComponentSchema = z
	.object({
		compact: z.boolean().default(false),
		description: z.string().optional(),
		open: z.boolean().default(true),
		presentation: z.enum(overlayPresentationValues).default('inline'),
		side: z.enum(formDrawerSideValues).default('right'),
		status: z.enum(formDrawerStatusValues).default('default'),
		title: z.string().default('Workspace policy')
	})
	.strict()

export type FormDrawerInput = z.input<typeof formDrawerComponentSchema>
export type FormDrawerValue = z.output<typeof formDrawerComponentSchema>
