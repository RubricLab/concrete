import { z } from 'zod/v4'

export const formOverlayPresentationValues = ['fixed', 'inline'] as const
export const formOverlaySideValues = ['left', 'right'] as const
export const formOverlaySizeValues = ['compact', 'default', 'wide'] as const
export const formOverlayTypeValues = ['dialog', 'drawer'] as const

export const formOverlaySchema = z
	.object({
		presentation: z.enum(formOverlayPresentationValues).default('inline'),
		side: z.enum(formOverlaySideValues).default('right'),
		size: z.enum(formOverlaySizeValues).default('default'),
		type: z.enum(formOverlayTypeValues).default('dialog')
	})
	.strict()

export { formOverlaySchema as formOverlayPropsSchema }
export type FormOverlayInput = z.input<typeof formOverlaySchema>
export type FormOverlayValue = z.output<typeof formOverlaySchema>
