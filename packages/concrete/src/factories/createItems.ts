import type { ReactNode } from 'react'
import type { z } from 'zod/v4'
import type { ControlDefinition } from '../registry/controls'
import type {
	ComponentDefinition,
	FoundationDefinition,
	PrimitiveDefinition
} from '../registry/definition'
import {
	defineConcreteComponent,
	defineConcreteFoundation,
	defineConcretePrimitive
} from '../registry/definition'
import { seedFromSchema } from '../utilities/schemaSeed'
import { controlsFromSchema } from './createControls'

export type { ComponentDefinition, FoundationDefinition, PrimitiveDefinition }

type DefinitionSeed<Schema extends z.ZodType> = z.output<Schema>

type CreatedDefinition<Definition, Schema extends z.ZodType> = Definition & {
	controls: readonly ControlDefinition[]
	seed: DefinitionSeed<Schema>
}

type CreateDefinitionInput<Definition, Schema extends z.ZodType> = Omit<
	Definition,
	'controls' | 'renderInput' | 'schema' | 'seed'
> & {
	controls?: readonly ControlDefinition[]
	renderInput?: (input: unknown) => ReactNode
	schema: Schema
	seed?: DefinitionSeed<Schema>
}

export function createFoundation<
	const Schema extends z.ZodType,
	const Definition extends CreateDefinitionInput<
		FoundationDefinition<DefinitionSeed<Schema>>,
		Schema
	>
>(definition: Definition): CreatedDefinition<Definition, Schema> {
	return defineConcreteFoundation(createDefinition(definition)) as CreatedDefinition<
		Definition,
		Schema
	>
}

export function createPrimitive<
	const Schema extends z.ZodType,
	const Definition extends CreateDefinitionInput<
		PrimitiveDefinition<DefinitionSeed<Schema>, unknown>,
		Schema
	>
>(definition: Definition): CreatedDefinition<Definition, Schema> {
	return defineConcretePrimitive(createDefinition(definition)) as CreatedDefinition<
		Definition,
		Schema
	>
}

export function createComponent<
	const Schema extends z.ZodType,
	const Definition extends CreateDefinitionInput<
		ComponentDefinition<DefinitionSeed<Schema>, unknown>,
		Schema
	>
>(definition: Definition): CreatedDefinition<Definition, Schema> {
	return defineConcreteComponent(createDefinition(definition)) as CreatedDefinition<
		Definition,
		Schema
	>
}

function createDefinition<
	const Schema extends z.ZodType,
	const Definition extends { schema: Schema }
>(
	definition: Definition & {
		controls?: readonly ControlDefinition[]
		seed?: DefinitionSeed<Schema>
	}
) {
	const seed = definition.seed ?? seedFromSchema(definition.schema)

	return {
		...definition,
		controls: definition.controls ?? controlsFromSchema(definition.schema, seed),
		seed
	}
}
