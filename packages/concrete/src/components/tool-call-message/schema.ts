import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { toolCallSchema, toolCallStatusSchema } from '../../schemas'

export const toolCallMessageComponentSchema = toolCallSchema
	.omit({ id: true })
	.extend({
		input: z.string().optional(),
		language: z.string().default('ts'),
		open: z.boolean().optional(),
		output: z.string().optional(),
		status: toolCallStatusSchema.default('running'),
		toolIcon: z.enum(iconNames).default('terminal')
	})
	.strict()

export type ToolCallMessageInput = z.input<typeof toolCallMessageComponentSchema>
export type ToolCallMessageValue = z.output<typeof toolCallMessageComponentSchema>
