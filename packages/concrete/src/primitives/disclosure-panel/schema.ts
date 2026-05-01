import { z } from 'zod/v4'

export const disclosurePanelIntentSchema = z.enum(['default', 'error', 'terminal'])

export const disclosurePanelSchema = z
	.object({
		content: z.string().default('Disclosure content'),
		intent: disclosurePanelIntentSchema.default('default'),
		open: z.boolean().default(true),
		summary: z.string().default('Trace details')
	})
	.strict()

export { disclosurePanelSchema as disclosurePanelPropsSchema }
export type DisclosurePanelInput = z.input<typeof disclosurePanelSchema>
export type DisclosurePanelIntent = z.infer<typeof disclosurePanelIntentSchema>
export type DisclosurePanelValue = z.output<typeof disclosurePanelSchema>
