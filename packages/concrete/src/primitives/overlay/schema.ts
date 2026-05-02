import { z } from 'zod/v4'

export const overlayPlacementSchema = z.enum(['center', 'end', 'start', 'stretch'])
export const overlayPresentationSchema = z.enum(['fixed', 'inline'])

export const overlaySchema = z
	.object({
		content: z.string().default('Overlay content'),
		open: z.boolean().default(true),
		placement: overlayPlacementSchema.default('center'),
		presentation: overlayPresentationSchema.default('inline'),
		scrim: z.boolean().default(false)
	})
	.strict()

export { overlaySchema as overlayPropsSchema }
export type OverlayInput = z.input<typeof overlaySchema>
export type OverlayPlacement = z.infer<typeof overlayPlacementSchema>
export type OverlayPresentation = z.infer<typeof overlayPresentationSchema>
export type OverlayValue = z.output<typeof overlaySchema>
