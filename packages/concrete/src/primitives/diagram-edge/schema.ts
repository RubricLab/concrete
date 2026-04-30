import { z } from 'zod/v4'
import { dataToneSchema } from '../../schemas'

export const diagramEdgeVariantValues = [
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
		label: z.string().default('routes'),
		selected: z.boolean().default(false),
		tone: dataToneSchema.default('sky'),
		variant: z.enum(diagramEdgeVariantValues).default('solid')
	})
	.strict()

export { diagramEdgeSchema as diagramEdgePropsSchema }
export type DiagramEdgeInput = z.input<typeof diagramEdgeSchema>
export type DiagramEdgeValue = z.output<typeof diagramEdgeSchema>
