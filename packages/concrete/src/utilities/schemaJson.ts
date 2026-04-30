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

export type ConcreteJsonSchemaDiscriminator = {
	name: string
	values: readonly string[]
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

export function stringConstValue(schema: ConcreteJsonSchema | undefined): string | undefined {
	return typeof schema?.const === 'string' ? schema.const : undefined
}

export function stringEnumValues(schema: ConcreteJsonSchema): readonly string[] {
	return schema.enum?.filter(value => typeof value === 'string') ?? []
}

export function schemaUnionOptions(schema: ConcreteJsonSchema): readonly ConcreteJsonSchema[] {
	return [...(schema.oneOf ?? []), ...(schema.anyOf ?? [])]
}

export function stringConstDiscriminator(
	options: readonly ConcreteJsonSchema[]
): ConcreteJsonSchemaDiscriminator | undefined {
	const firstOption = options[0]

	if (!firstOption || schemaType(firstOption) !== 'object') {
		return undefined
	}

	for (const [name, propertySchema] of Object.entries(schemaProperties(firstOption))) {
		const firstValue = stringConstValue(propertySchema)

		if (firstValue === undefined) {
			continue
		}

		const values = options.map(option => stringConstValue(schemaProperties(option)[name]))

		if (
			values.every((value): value is string => value !== undefined) &&
			new Set(values).size === values.length
		) {
			return { name, values }
		}
	}

	return undefined
}

export function selectUnionOptionForValue(
	options: readonly ConcreteJsonSchema[],
	value: unknown
): ConcreteJsonSchema | undefined {
	const discriminator = stringConstDiscriminator(options)

	if (!discriminator || !isRecord(value)) {
		return options[0]
	}

	const discriminatorValue = value[discriminator.name]

	return (
		options.find(
			option => stringConstValue(schemaProperties(option)[discriminator.name]) === discriminatorValue
		) ?? options[0]
	)
}

export function selectUnionOptionForDiscriminatorValue(
	options: readonly ConcreteJsonSchema[],
	discriminatorName: string,
	discriminatorValue: string
): ConcreteJsonSchema | undefined {
	return options.find(
		option => stringConstValue(schemaProperties(option)[discriminatorName]) === discriminatorValue
	)
}

export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}
