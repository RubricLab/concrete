import { z } from 'zod/v4'

export const conceptFramePrimitiveSchema = z
	.object({
		kind: z
			.enum([
				'browser-window',
				'model-card',
				'database-panel',
				'code-editor',
				'chart-frame',
				'assistant-response',
				'workflow-canvas',
				'mobile-screen'
			])
			.default('browser-window'),
		muted: z.boolean().default(false),
		selected: z.boolean().default(false),
		size: z.enum(['small', 'medium', 'large']).default('medium')
	})
	.strict()

export { conceptFramePrimitiveSchema as conceptFramePrimitivePropsSchema }
export type ConceptFrameInput = z.input<typeof conceptFramePrimitiveSchema>
export type ConceptFrameValue = z.output<typeof conceptFramePrimitiveSchema>
