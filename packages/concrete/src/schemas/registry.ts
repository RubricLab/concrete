import { z } from 'zod/v4'
import { concretePressureSchema, concreteViewportSchema } from './base'

export const renderQuerySchema = z
	.object({
		pressure: concretePressureSchema.default('product'),
		quality: z.coerce.number().int().min(1).max(100).default(92),
		state: z.string().min(1).default('default'),
		viewport: concreteViewportSchema.default('desktop')
	})
	.catchall(z.union([z.boolean(), z.number(), z.string()]))

export const primitiveCategorySchema = z.enum([
	'brand',
	'control',
	'data',
	'diagram',
	'feedback',
	'form',
	'foundation',
	'layout',
	'media',
	'navigation',
	'status',
	'surface',
	'typography'
])

export const primitivePropSchema = z
	.object({
		defaultValue: z.string().optional(),
		description: z.string().min(1),
		name: z.string().min(1),
		required: z.boolean().optional(),
		type: z.string().min(1)
	})
	.strict()

export const primitiveStateSchema = z
	.object({
		description: z.string().min(1),
		name: z.string().min(1),
		query: z.string().min(1)
	})
	.strict()

export const registryEntrySchema = z
	.object({
		category: primitiveCategorySchema,
		description: z.string().min(1),
		guidance: z.string().min(1),
		name: z.string().min(1),
		pressure: z.array(concretePressureSchema).min(1),
		props: z.array(primitivePropSchema),
		slug: z.string().min(1),
		states: z.array(primitiveStateSchema).min(1)
	})
	.strict()

export type PrimitiveCategory = z.infer<typeof primitiveCategorySchema>
export type PrimitivePropShape = z.infer<typeof primitivePropSchema>
export type PrimitiveStateShape = z.infer<typeof primitiveStateSchema>
export type RegistryEntryShape = z.infer<typeof registryEntrySchema>
export type RenderQuery = z.infer<typeof renderQuerySchema>
