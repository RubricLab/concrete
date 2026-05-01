import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'
import { surfaceDepthSchema, surfaceIntentSchema } from '../surface/schema'

export const dataSurfacePurposeSchema = z.enum(['chart', 'generic', 'meter', 'metric', 'table'])
export const dataSurfaceLayoutSchema = z.enum(['media', 'stack'])

export const dataSurfaceSchema = z
	.object({
		compact: z.boolean().default(false),
		content: z.string().default('Data surface content'),
		density: densitySchema.default('compact'),
		depth: surfaceDepthSchema.default('raised'),
		description: z.string().optional(),
		footer: z.string().optional(),
		intent: surfaceIntentSchema.default('default'),
		layout: dataSurfaceLayoutSchema.default('stack'),
		meta: z.string().optional(),
		purpose: dataSurfacePurposeSchema.default('generic'),
		title: z.string().default('Data surface')
	})
	.strict()

export { dataSurfaceSchema as dataSurfacePropsSchema }
export type DataSurfaceInput = z.input<typeof dataSurfaceSchema>
export type DataSurfaceLayout = z.output<typeof dataSurfaceLayoutSchema>
export type DataSurfacePurpose = z.output<typeof dataSurfacePurposeSchema>
export type DataSurfaceValue = z.output<typeof dataSurfaceSchema>
