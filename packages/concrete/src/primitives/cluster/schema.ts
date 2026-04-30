import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const clusterAlignSchema = z.enum(['start', 'center', 'end', 'stretch'])
export const clusterJustifySchema = z.enum(['start', 'center', 'end', 'between'])

export const clusterSchema = z
	.object({
		align: clusterAlignSchema.default('center'),
		content: z.string().default('Cluster content'),
		density: densitySchema.default('comfortable'),
		justify: clusterJustifySchema.default('start')
	})
	.strict()

export { clusterSchema as clusterPropsSchema }
export type ClusterAlign = z.infer<typeof clusterAlignSchema>
export type ClusterInput = z.input<typeof clusterSchema>
export type ClusterJustify = z.infer<typeof clusterJustifySchema>
export type ClusterValue = z.output<typeof clusterSchema>
