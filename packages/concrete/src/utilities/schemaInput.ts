import type { z } from 'zod/v4'
import {
	type ConcreteJsonSchema,
	isRecord,
	jsonSchemaFromZod,
	schemaInputControlName,
	schemaProperties,
	schemaType,
	stringEnumValues
} from './schemaJson'

export type SchemaInputSource = {
	get: (name: string) => string | null
}

export function inputFromSchemaSource(
	schema: z.ZodType,
	seed: unknown,
	source: SchemaInputSource
): unknown {
	const jsonSchema = jsonSchemaFromZod(schema)

	if (schemaType(jsonSchema) !== 'object' || !isRecord(seed)) {
		return seed
	}

	const rootInput = inputRootValue(schema, source.get(schemaInputControlName), seed)
	const input: Record<string, unknown> = isRecord(rootInput) ? { ...rootInput } : { ...seed }

	for (const [name, propertySchema] of Object.entries(schemaProperties(jsonSchema))) {
		const sourceValue = source.get(name)

		if (sourceValue !== null) {
			input[name] = inputValueFromJsonSchema(propertySchema, sourceValue, input[name])
		}
	}

	const parsedInput = schema.safeParse(input)
	return parsedInput.success ? parsedInput.data : seed
}

function inputRootValue(schema: z.ZodType, value: string | null, fallback: unknown): unknown {
	if (value === null) {
		return fallback
	}

	const parsedValue = schema.safeParse(parseJsonValue(value, fallback))
	return parsedValue.success ? parsedValue.data : fallback
}

function inputValueFromJsonSchema(
	schema: ConcreteJsonSchema,
	value: string,
	fallback: unknown
): unknown {
	const enumValues = stringEnumValues(schema)

	if (enumValues.length > 0) {
		return enumValues.includes(value) ? value : fallback
	}

	switch (schemaType(schema)) {
		case 'array':
		case 'object':
			return parseJsonValue(value, fallback)
		case 'boolean':
			return value === 'true'
		case 'integer':
		case 'number':
			return numberInputValue(value, fallback)
		case 'string':
			return value
		default:
			return fallback
	}
}

function numberInputValue(value: string, fallback: unknown): unknown {
	const parsedValue = Number(value)
	return Number.isFinite(parsedValue) ? parsedValue : fallback
}

function parseJsonValue(value: string, fallback: unknown): unknown {
	try {
		return JSON.parse(value) as unknown
	} catch {
		return fallback
	}
}
