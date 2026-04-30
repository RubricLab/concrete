import { z } from 'zod/v4'

export const schemaInputControlName = 'props'

export type ConcreteJsonSchema = {
	anyOf?: readonly ConcreteJsonSchema[]
	const?: unknown
	default?: unknown
	enum?: readonly unknown[]
	items?: ConcreteJsonSchema
	oneOf?: readonly ConcreteJsonSchema[]
	properties?: Record<string, ConcreteJsonSchema>
	required?: readonly string[]
	type?: string | readonly string[]
}

export function jsonSchemaFromZod(schema: z.ZodType): ConcreteJsonSchema {
	return z.toJSONSchema(schema) as ConcreteJsonSchema
}

export function schemaType(schema: ConcreteJsonSchema): string | undefined {
	if (typeof schema.type === 'string') {
		return schema.type
	}

	return schema.type?.find(type => type !== 'null')
}

export function schemaProperties(schema: ConcreteJsonSchema): Record<string, ConcreteJsonSchema> {
	return schema.properties ?? {}
}

export function schemaRequiredNames(schema: ConcreteJsonSchema): ReadonlySet<string> {
	return new Set(schema.required ?? [])
}

export function firstStringEnumValue(schema: ConcreteJsonSchema): string | undefined {
	return schema.enum?.find(value => typeof value === 'string')
}

export function stringEnumValues(schema: ConcreteJsonSchema): readonly string[] {
	return schema.enum?.filter(value => typeof value === 'string') ?? []
}

export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}
