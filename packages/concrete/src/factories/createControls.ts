import type { z } from 'zod/v4'
import {
	booleanControl,
	type ControlDefinition,
	jsonControl,
	numberControl,
	selectControl,
	textControl
} from '../registry/controls'
import {
	type ConcreteJsonSchema,
	isRecord,
	jsonSchemaFromZod,
	schemaInputControlName,
	schemaProperties,
	schemaType,
	stringEnumValues
} from '../utilities/schemaJson'

export function controlsFromSchema<const Schema extends z.ZodType>(
	schema: Schema,
	seed: z.output<Schema>
): readonly ControlDefinition[] {
	const jsonSchema = jsonSchemaFromZod(schema)

	if (schemaType(jsonSchema) !== 'object') {
		return []
	}

	const seedRecord: Record<string, unknown> = isRecord(seed) ? seed : {}
	const propertyControls = Object.entries(schemaProperties(jsonSchema))
		.map(([name, propertySchema]) => controlFromJsonSchema(name, propertySchema, seedRecord[name]))
		.filter((control): control is ControlDefinition => control !== undefined)

	return [
		...propertyControls,
		jsonControl(schemaInputControlName, 'Props JSON', controlDefaultValue(seed))
	]
}

function controlFromJsonSchema(
	name: string,
	schema: ConcreteJsonSchema,
	seedValue: unknown
): ControlDefinition | undefined {
	const enumValues = stringEnumValues(schema)
	const defaultValue = controlDefaultValue(seedValue)

	if (enumValues.length > 0) {
		const values = defaultValue.length > 0 ? enumValues : ['', ...enumValues]
		return selectControl(name, controlLabel(name), defaultValue, values)
	}

	switch (schemaType(schema)) {
		case 'array':
		case 'object':
			return jsonControl(name, controlLabel(name), defaultValue)
		case 'boolean':
			return booleanControl(name, controlLabel(name), defaultValue || 'false')
		case 'integer':
		case 'number':
			return numberControl(name, controlLabel(name), defaultValue || '0')
		case 'string':
			return textControl(name, controlLabel(name), defaultValue)
		default:
			return undefined
	}
}

function controlDefaultValue(value: unknown): string {
	switch (typeof value) {
		case 'boolean':
		case 'number':
		case 'string':
			return String(value)
		case 'object':
			return value === null ? '' : JSON.stringify(value, null, 2)
		default:
			return ''
	}
}

function controlLabel(name: string): string {
	const spacedName = name
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.replace(/[-_]+/g, ' ')
		.toLowerCase()

	return `${spacedName.slice(0, 1).toUpperCase()}${spacedName.slice(1)}`
}
