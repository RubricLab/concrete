import { z } from 'zod/v4'
import { messageStatusSchema, reasoningStepSchema } from '../../schemas'

export const reasoningMessageComponentSchema = z
	.object({
		open: z.boolean().default(false),
		status: messageStatusSchema.default('streaming'),
		steps: z.array(reasoningStepSchema).default([]),
		summary: z
			.string()
			.min(1)
			.default(
				'Mapped failing logs to the evaluation fixture, checked schema boundaries, and isolated the change needed before rerunning.'
			),
		title: z.string().min(1).default('Thinking')
	})
	.strict()

export type ReasoningMessageInput = z.input<typeof reasoningMessageComponentSchema>
export type ReasoningMessageValue = z.output<typeof reasoningMessageComponentSchema>
