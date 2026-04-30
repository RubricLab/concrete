import type { z } from 'zod/v4'
import {
	type ConcreteJsonSchema,
	isRecord,
	jsonSchemaFromZod,
	schemaInputControlName,
	schemaProperties,
	schemaType,
	schemaUnionOptions,
	selectUnionOptionForDiscriminatorValue,
	selectUnionOptionForValue,
	stringConstDiscriminator,
	stringConstValue,
	stringEnumValues
} from './schemaJson'
import { seedFromJsonSchema } from './schemaSeed'

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
		const unionInput = inputFromUnionSchemaSource(schema, jsonSchema, seed, source)

		return unionInput ?? seed
	}

	const rootInput = inputRootValue(schema, source.get(schemaInputControlName), seed)
	const input: Record<string, unknown> = isRecord(rootInput) ? { ...rootInput } : { ...seed }

	applyObjectInputValues(jsonSchema, input, source, [])

	const parsedInput = schema.safeParse(input)
	return parsedInput.success ? parsedInput.data : seed
}

function inputFromUnionSchemaSource(
	schema: z.ZodType,
	jsonSchema: ConcreteJsonSchema,
	seed: unknown,
	source: SchemaInputSource
): unknown {
	const unionOptions = schemaUnionOptions(jsonSchema)

	if (unionOptions.length === 0) {
		return undefined
	}

	const rootInput = inputRootValue(schema, source.get(schemaInputControlName), seed)
	const selectedSchema = selectUnionSchemaForSource(unionOptions, rootInput, source)
	const selectedSeed = seedForSelectedUnionSchema(selectedSchema, rootInput)

	if (!selectedSchema || !isRecord(selectedSeed)) {
		return rootInput
	}

	const input = { ...selectedSeed }

	applyObjectInputValues(selectedSchema, input, source, [])

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
	const constValue = stringConstValue(schema)

	if (enumValues.length > 0) {
		return enumValues.includes(value) ? value : fallback
	}

	if (constValue !== undefined) {
		return value === constValue ? value : fallback
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

function applyObjectInputValues(
	schema: ConcreteJsonSchema,
	input: Record<string, unknown>,
	source: SchemaInputSource,
	path: readonly string[]
): boolean {
	let changed = false

	for (const [name, propertySchema] of Object.entries(schemaProperties(schema))) {
		const propertyPath = [...path, name]
		const sourceValue = source.get(inputName(propertyPath))

		if (sourceValue !== null) {
			setPathValue(
				input,
				propertyPath,
				inputValueFromJsonSchema(propertySchema, sourceValue, getPathValue(input, propertyPath))
			)
			changed = true
			continue
		}

		const nestedSchema = activeSchemaForValue(propertySchema, getPathValue(input, propertyPath))

		if (schemaType(nestedSchema) !== 'object') {
			continue
		}

		if (applyObjectInputValues(nestedSchema, input, source, propertyPath)) {
			changed = true
		}
	}

	return changed
}

function activeSchemaForValue(schema: ConcreteJsonSchema, value: unknown): ConcreteJsonSchema {
	const unionOptions = schemaUnionOptions(schema)

	if (unionOptions.length === 0) {
		return schema
	}

	return selectUnionOptionForValue(unionOptions, value) ?? schema
}

function selectUnionSchemaForSource(
	options: readonly ConcreteJsonSchema[],
	rootInput: unknown,
	source: SchemaInputSource
): ConcreteJsonSchema | undefined {
	const discriminator = stringConstDiscriminator(options)
	const discriminatorValue = discriminator ? source.get(discriminator.name) : null

	if (discriminator && discriminatorValue) {
		return selectUnionOptionForDiscriminatorValue(options, discriminator.name, discriminatorValue)
	}

	return selectUnionOptionForValue(options, rootInput)
}

function seedForSelectedUnionSchema(
	selectedSchema: ConcreteJsonSchema | undefined,
	rootInput: unknown
): unknown {
	if (!selectedSchema) {
		return rootInput
	}

	const discriminator = stringConstDiscriminator(schemaUnionOptions({ oneOf: [selectedSchema] }))
	const rootDiscriminatorValue =
		discriminator && isRecord(rootInput) ? rootInput[discriminator.name] : undefined
	const selectedDiscriminatorValue = discriminator
		? stringConstValue(schemaProperties(selectedSchema)[discriminator.name])
		: undefined

	if (
		selectedDiscriminatorValue &&
		rootDiscriminatorValue === selectedDiscriminatorValue &&
		isRecord(rootInput)
	) {
		return rootInput
	}

	if (!selectedDiscriminatorValue && isRecord(rootInput)) {
		return rootInput
	}

	const seed = seedFromJsonSchema(selectedSchema)
	return seed
}

function getPathValue(record: Record<string, unknown>, path: readonly string[]): unknown {
	let current: unknown = record

	for (const part of path) {
		if (!isRecord(current)) {
			return undefined
		}

		current = current[part]
	}

	return current
}

function setPathValue(record: Record<string, unknown>, path: readonly string[], value: unknown) {
	const lastPart = path.at(-1)

	if (!lastPart) {
		return
	}

	let current: Record<string, unknown> = record

	for (const part of path.slice(0, -1)) {
		const nextValue = current[part]

		if (isRecord(nextValue)) {
			current = nextValue
			continue
		}

		const nextRecord: Record<string, unknown> = {}
		current[part] = nextRecord
		current = nextRecord
	}

	current[lastPart] = value
}

function inputName(path: readonly string[]): string {
	return path.join('.')
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
