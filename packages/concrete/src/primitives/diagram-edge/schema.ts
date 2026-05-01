import { z } from 'zod/v4'
import { dataToneSchema } from '../../schemas'

export const diagramEdgeRelationValues = [
	'bidirectional',
	'branch',
	'control',
	'dashed',
	'dotted',
	'reference',
	'solid'
] as const

export const diagramEdgeSchema = z
	.object({
		intent: dataToneSchema.default('sky'),
		label: z.string().default('routes'),
		relation: z.enum(diagramEdgeRelationValues).default('solid'),
		selected: z.boolean().default(false)
	})
	.strict()

export { diagramEdgeSchema as diagramEdgePropsSchema }
export type DiagramEdgeInput = z.input<typeof diagramEdgeSchema>
export type DiagramEdgeValue = z.output<typeof diagramEdgeSchema>
