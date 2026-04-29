import type { ReactNode } from 'react'
import type { z } from 'zod/v4'
import type { ConcretePressure, PrimitiveCategory } from '../schemas'
import type { ControlDefinition } from './controls'
import type {
	ComponentRegistryEntry,
	ComponentSlug,
	PrimitiveProp,
	PrimitiveRegistryEntry,
	PrimitiveSlug,
	PrimitiveState
} from './types'

export type FoundationSlug =
	| 'colors'
	| 'elevation'
	| 'motion'
	| 'radii'
	| 'spacing'
	| 'textures'
	| 'typography'

export type ConcreteDefinitionSchema<Output = unknown> = z.ZodType<Output>

type ConcreteDefinitionBase<Kind extends string, Slug extends string, SchemaOutput> = {
	category: PrimitiveCategory
	controls: readonly ControlDefinition[]
	description: string
	guidance: string
	kind: Kind
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly PrimitiveProp[]
	renderExample: (state?: string) => ReactNode
	schema: ConcreteDefinitionSchema<SchemaOutput>
	slug: Slug
	states: readonly PrimitiveState[]
}

export type FoundationDefinition<SchemaOutput = unknown> = ConcreteDefinitionBase<
	'foundation',
	FoundationSlug,
	SchemaOutput
>

export type PrimitiveDefinition<
	SchemaOutput = unknown,
	Implementation = unknown
> = ConcreteDefinitionBase<'primitive', PrimitiveSlug, SchemaOutput> &
	PrimitiveRegistryEntry & {
		component: Implementation
	}

export type ComponentDefinition<
	SchemaOutput = unknown,
	Implementation = unknown
> = ConcreteDefinitionBase<'component', ComponentSlug, SchemaOutput> &
	ComponentRegistryEntry & {
		component: Implementation
	}

export function defineConcreteFoundation<const Definition extends FoundationDefinition>(
	definition: Definition
): Definition {
	return definition
}

export function defineConcretePrimitive<const Definition extends PrimitiveDefinition>(
	definition: Definition
): Definition {
	return definition
}

export function defineConcreteComponent<const Definition extends ComponentDefinition>(
	definition: Definition
): Definition {
	return definition
}
