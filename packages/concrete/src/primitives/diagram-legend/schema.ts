import { z } from 'zod/v4'

export const diagramLegendKindValues = ['compute', 'data', 'event', 'flow', 'reference'] as const

export const diagramLegendItemSchema = z
	.object({
		kind: z.enum(diagramLegendKindValues).default('compute'),
		label: z.string().default('Compute node')
	})
	.strict()

export const diagramLegendSchema = z
	.object({
		items: z.array(diagramLegendItemSchema).default([
			{ kind: 'compute', label: 'Compute node' },
			{ kind: 'data', label: 'Data / service' },
			{ kind: 'flow', label: 'Flow' }
		])
	})
	.strict()

export { diagramLegendSchema as diagramLegendPropsSchema }
export type DiagramLegendInput = z.input<typeof diagramLegendSchema>
export type DiagramLegendValue = z.output<typeof diagramLegendSchema>
