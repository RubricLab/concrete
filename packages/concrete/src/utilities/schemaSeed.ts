import type { z } from 'zod/v4'
import {
	type ConcreteJsonSchema,
	firstStringEnumValue,
	isRecord,
	jsonSchemaFromZod,
	schemaProperties,
	schemaRequiredNames,
	schemaType
} from './schemaJson'

export function seedFromSchema<const Schema extends z.ZodType>(
	schema: Schema,
	overrides?: Partial<z.output<Schema>>
): z.output<Schema> {
	const seed = seedFromJsonSchema(jsonSchemaFromZod(schema))
	const mergedSeed =
		isRecord(seed) && isRecord(overrides) ? { ...seed, ...overrides } : (overrides ?? seed)

	return schema.parse(mergedSeed)
}

export function seedFromJsonSchema(schema: ConcreteJsonSchema): unknown {
	if (schema.default !== undefined) {
		return schema.default
	}

	if (schema.const !== undefined) {
		return schema.const
	}

	const enumValue = firstStringEnumValue(schema)

	if (enumValue !== undefined) {
		return enumValue
	}

	const unionSchema = schema.anyOf?.[0] ?? schema.oneOf?.[0]

	if (unionSchema) {
		return seedFromJsonSchema(unionSchema)
	}

	switch (schemaType(schema)) {
		case 'array':
			return []
		case 'boolean':
			return false
		case 'integer':
		case 'number':
			return 0
		case 'object':
			return seedObjectFromJsonSchema(schema)
		case 'string':
			return 'Text'
		default:
			return undefined
	}
}

function seedObjectFromJsonSchema(schema: ConcreteJsonSchema): Record<string, unknown> {
	const seed: Record<string, unknown> = {}
	const requiredNames = schemaRequiredNames(schema)

	for (const [name, propertySchema] of Object.entries(schemaProperties(schema))) {
		if (requiredNames.has(name) || propertySchema.default !== undefined) {
			seed[name] = seedFromJsonSchema(propertySchema)
		}
	}

	return seed
}
