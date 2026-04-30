import type { ReactNode } from 'react'
import type { z } from 'zod/v4'
import { inputFromSchemaSource, type SchemaInputSource } from './schemaInput'

type DefinitionWithInput = {
	renderInput?: (input: unknown) => ReactNode
	schema: z.ZodType
	seed?: unknown
}

export function renderDefinitionInput(
	definition: DefinitionWithInput,
	source: SchemaInputSource
): ReactNode | undefined {
	if (!definition.renderInput || definition.seed === undefined) {
		return undefined
	}

	return definition.renderInput(inputFromSchemaSource(definition.schema, definition.seed, source))
}
