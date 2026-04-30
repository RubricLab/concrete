import { z } from 'zod/v4'

export const feedbackPanelStatusValues = ['error', 'success'] as const

export const feedbackPanelSchema = z
	.object({
		issueCount: z.number().int().min(0).max(4).default(2),
		status: z.enum(feedbackPanelStatusValues).default('error')
	})
	.strict()

export { feedbackPanelSchema as feedbackPanelPropsSchema }
export type FeedbackPanelInput = z.input<typeof feedbackPanelSchema>
export type FeedbackPanelValue = z.output<typeof feedbackPanelSchema>
