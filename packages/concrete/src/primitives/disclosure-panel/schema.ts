import { z } from 'zod/v4'

export const disclosurePanelToneSchema = z.enum(['default', 'error', 'terminal'])

export const disclosurePanelSchema = z
	.object({
		content: z.string().default('Disclosure content'),
		open: z.boolean().default(true),
		summary: z.string().default('Trace details'),
		tone: disclosurePanelToneSchema.default('default')
	})
	.strict()

export { disclosurePanelSchema as disclosurePanelPropsSchema }
export type DisclosurePanelInput = z.input<typeof disclosurePanelSchema>
export type DisclosurePanelTone = z.infer<typeof disclosurePanelToneSchema>
export type DisclosurePanelValue = z.output<typeof disclosurePanelSchema>
