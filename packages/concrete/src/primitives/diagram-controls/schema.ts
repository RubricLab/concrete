import { z } from 'zod/v4'

export const diagramControlsSchema = z
	.object({
		disabled: z.boolean().default(false),
		zoom: z.number().positive().default(1)
	})
	.strict()

export { diagramControlsSchema as diagramControlsPropsSchema }
export type DiagramControlsInput = z.input<typeof diagramControlsSchema>
export type DiagramControlsValue = z.output<typeof diagramControlsSchema>
