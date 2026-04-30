import { z } from 'zod/v4'
import { concreteRenderKindSchema } from './base'

export type ConcreteJsonPrimitive = boolean | null | number | string
export type ConcreteJsonValue = ConcreteJsonObject | ConcreteJsonPrimitive | ConcreteJsonValue[]

export type ConcreteJsonObject = {
	[key: string]: ConcreteJsonValue
}

export type ConcreteItemReference = {
	kind: ConcreteItemReferenceKind
	slug: string
}

export type ConcreteItemReferenceKind = z.infer<typeof concreteItemReferenceKindSchema>

export type ConcreteTextNode = {
	type: 'text'
	value: string
}

export type ConcreteItemNode = {
	children: ConcreteNode[]
	item: ConcreteItemReference
	props: ConcreteJsonObject
	slots: Record<string, ConcreteNode[]>
	type: 'item'
}

export type ConcreteNode = ConcreteItemNode | ConcreteTextNode

export type ConcreteNodeTree = {
	nodes: ConcreteNode[]
}

export const concreteJsonPrimitiveSchema = z.union([
	z.boolean(),
	z.null(),
	z.number().finite(),
	z.string()
])

export const concreteJsonValueSchema: z.ZodType<ConcreteJsonValue> = z.lazy(() =>
	z.union([
		concreteJsonPrimitiveSchema,
		z.array(concreteJsonValueSchema),
		z.record(z.string(), concreteJsonValueSchema)
	])
)

export const concreteJsonObjectSchema: z.ZodType<ConcreteJsonObject> = z.record(
	z.string(),
	concreteJsonValueSchema
)

export const concreteItemReferenceKindSchema = concreteRenderKindSchema

export const concreteItemSlugSchema = z
	.string()
	.min(1)
	.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u, 'Concrete item slugs must use kebab-case.')

export const concreteItemReferenceSchema: z.ZodType<ConcreteItemReference> = z
	.object({
		kind: concreteItemReferenceKindSchema,
		slug: concreteItemSlugSchema
	})
	.strict()

export const concreteNodeSlotNameSchema = z
	.string()
	.min(1)
	.regex(/^[a-z][a-zA-Z0-9-]*$/u, 'Concrete slot names must start with a letter.')

export const concreteTextNodeSchema: z.ZodType<ConcreteTextNode> = z
	.object({
		type: z.literal('text'),
		value: z.string()
	})
	.strict()

export const concreteNodeSchema: z.ZodType<ConcreteNode> = z.lazy(() =>
	z.union([concreteTextNodeSchema, concreteItemNodeSchema])
)

export const concreteItemNodeSchema: z.ZodType<ConcreteItemNode> = z
	.object({
		children: z.array(concreteNodeSchema).default([]),
		item: concreteItemReferenceSchema,
		props: concreteJsonObjectSchema.default({}),
		slots: z.record(concreteNodeSlotNameSchema, z.array(concreteNodeSchema)).default({}),
		type: z.literal('item')
	})
	.strict()

export const concreteNodeTreeSchema: z.ZodType<ConcreteNodeTree> = z
	.object({
		nodes: z.array(concreteNodeSchema).default([])
	})
	.strict()
