import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { toolCallStatusSchema } from '../../schemas'

export const toolCallPanelSchema = z
	.object({
		duration: z.string().optional(),
		input: z.string().default('await runTool({ query })'),
		name: z.string().default('runTool'),
		open: z.boolean().default(true),
		output: z.string().default('Tool returned 3 matching records.'),
		status: toolCallStatusSchema.default('running'),
		toolIcon: z.enum(iconNames).default('terminal')
	})
	.strict()

export { toolCallPanelSchema as toolCallPanelPropsSchema }
export type ToolCallPanelInput = z.input<typeof toolCallPanelSchema>
export type ToolCallPanelValue = z.output<typeof toolCallPanelSchema>
