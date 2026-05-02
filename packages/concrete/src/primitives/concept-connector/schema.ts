import { z } from 'zod/v4'

export const conceptConnectorPrimitiveSchema = z
	.object({
		intent: z.enum(['ink', 'muted', 'sky', 'terminal', 'ultra', 'error']).default('muted'),
		kind: z
			.enum([
				'straight',
				'elbow',
				'curved',
				'dashed-relation',
				'bidirectional',
				'branch',
				'feedback-loop',
				'annotation-leader'
			])
			.default('straight'),
		muted: z.boolean().default(false),
		selected: z.boolean().default(false)
	})
	.strict()

export { conceptConnectorPrimitiveSchema as conceptConnectorPrimitivePropsSchema }
export type ConceptConnectorInput = z.input<typeof conceptConnectorPrimitiveSchema>
export type ConceptConnectorValue = z.output<typeof conceptConnectorPrimitiveSchema>
