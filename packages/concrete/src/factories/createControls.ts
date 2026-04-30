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
	schemaUnionOptions,
	selectUnionOptionForValue,
	stringConstDiscriminator,
	stringConstValue,
	stringEnumValues
} from '../utilities/schemaJson'
import { seedFromJsonSchema } from '../utilities/schemaSeed'

export function controlsFromSchema<const Schema extends z.ZodType>(
	schema: Schema,
	seed: z.output<Schema>
): readonly ControlDefinition[] {
	const jsonSchema = jsonSchemaFromZod(schema)
	const propertyControls = uniqueControls(controlsFromJsonSchema(jsonSchema, seed, []))

	return [...propertyControls, jsonControl(schemaInputControlName, 'Props JSON', controlValue(seed))]
}

function controlsFromJsonSchema(
	schema: ConcreteJsonSchema,
	seedValue: unknown,
	path: readonly string[]
): readonly ControlDefinition[] {
	const unionOptions = schemaUnionOptions(schema)

	if (unionOptions.length > 0) {
		return controlsFromUnionJsonSchema(unionOptions, seedValue, path)
	}

	if (schemaType(schema) !== 'object') {
		const control = controlFromJsonSchema(path, schema, seedValue)

		return control ? [control] : []
	}

	return controlsFromObjectJsonSchema(schema, seedValue, path)
}

function controlsFromUnionJsonSchema(
	options: readonly ConcreteJsonSchema[],
	seedValue: unknown,
	path: readonly string[]
): readonly ControlDefinition[] {
	const discriminator = stringConstDiscriminator(options)
	const selectedOption = selectUnionOptionForValue(options, seedValue)
	const orderedOptions = selectedOption
		? [selectedOption, ...options.filter(option => option !== selectedOption)]
		: options
	const seedDiscriminatorValue =
		discriminator && isRecord(seedValue) ? seedValue[discriminator.name] : undefined
	const discriminatorControl =
		discriminator && path.length === 0
			? selectControl(
					discriminator.name,
					controlLabel([discriminator.name]),
					typeof seedDiscriminatorValue === 'string'
						? seedDiscriminatorValue
						: (discriminator.values[0] ?? ''),
					discriminator.values
				)
			: undefined
	const branchControls = orderedOptions.flatMap(option => {
		const optionSeed = option === selectedOption ? seedValue : seedFromJsonSchema(option)

		return controlsFromObjectJsonSchema(
			option,
			optionSeed,
			path,
			discriminator && path.length === 0 ? new Set([discriminator.name]) : new Set()
		)
	})

	return discriminatorControl ? [discriminatorControl, ...branchControls] : branchControls
}

function controlsFromObjectJsonSchema(
	schema: ConcreteJsonSchema,
	seedValue: unknown,
	path: readonly string[],
	skippedNames: ReadonlySet<string> = new Set()
): readonly ControlDefinition[] {
	const seedRecord: Record<string, unknown> = isRecord(seedValue) ? seedValue : {}

	return Object.entries(schemaProperties(schema)).flatMap(([name, propertySchema]) => {
		if (path.length === 0 && skippedNames.has(name)) {
			return []
		}

		return controlsFromJsonSchema(propertySchema, seedRecord[name], [...path, name])
	})
}

function controlFromJsonSchema(
	path: readonly string[],
	schema: ConcreteJsonSchema,
	seedValue: unknown
): ControlDefinition | undefined {
	const name = controlName(path)
	const enumValues = stringEnumValues(schema)
	const constValue = stringConstValue(schema)
	const defaultValue = controlValue(controlSeedValue(schema, seedValue))

	if (enumValues.length > 0) {
		const values = defaultValue.length > 0 ? enumValues : ['', ...enumValues]
		return selectControl(name, controlLabel(path), defaultValue, values)
	}

	if (constValue !== undefined) {
		return selectControl(name, controlLabel(path), constValue, [constValue])
	}

	switch (schemaType(schema)) {
		case 'array':
			return jsonControl(name, controlLabel(path), defaultValue)
		case 'boolean':
			return booleanControl(name, controlLabel(path), defaultValue || 'false')
		case 'integer':
		case 'number':
			return numberControl(name, controlLabel(path), defaultValue || '0')
		case 'object':
			return jsonControl(name, controlLabel(path), defaultValue)
		case 'string':
			return textControl(name, controlLabel(path), defaultValue)
		default:
			return undefined
	}
}

function controlSeedValue(schema: ConcreteJsonSchema, seedValue: unknown): unknown {
	if (seedValue !== undefined) {
		return seedValue
	}

	if (
		schema.default !== undefined ||
		schema.const !== undefined ||
		stringEnumValues(schema).length > 0
	) {
		return seedFromJsonSchema(schema)
	}

	return undefined
}

function controlValue(value: unknown): string {
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

function controlName(path: readonly string[]): string {
	return path.join('.')
}

function controlLabel(path: readonly string[]): string {
	const spacedName = path
		.join(' ')
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.replace(/[-_]+/g, ' ')
		.toLowerCase()

	return `${spacedName.slice(0, 1).toUpperCase()}${spacedName.slice(1)}`
}

function uniqueControls(controls: readonly ControlDefinition[]): readonly ControlDefinition[] {
	const controlsByName = new Map<string, ControlDefinition>()

	for (const control of controls) {
		if (!controlsByName.has(control.name)) {
			controlsByName.set(control.name, control)
		}
	}

	return [...controlsByName.values()]
}
