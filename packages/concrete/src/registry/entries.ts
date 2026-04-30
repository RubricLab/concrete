import type { ComposerValue } from '../components'
import { componentDefinitions, foundationDefinitions, primitiveDefinitions } from './items'
import type {
	ComponentRegistryEntry,
	FoundationRegistryEntry,
	PrimitiveRegistryEntry
} from './types'

type FoundationRegistryEntries<Definitions extends readonly FoundationRegistryEntry[]> = {
	readonly [Index in keyof Definitions]: FoundationRegistryEntry
}

type PrimitiveRegistryEntries<Definitions extends readonly PrimitiveRegistryEntry[]> = {
	readonly [Index in keyof Definitions]: PrimitiveRegistryEntry
}

type ComponentRegistryEntries<Definitions extends readonly ComponentRegistryEntry[]> = {
	readonly [Index in keyof Definitions]: ComponentRegistryEntry
}

export const foundationRegistry = entriesFromFoundationDefinitions(foundationDefinitions)

export const primitiveRegistry = entriesFromPrimitiveDefinitions(primitiveDefinitions)

export const composerExampleValue: ComposerValue = {
	attachments: [{ id: 'router-v2', meta: '3.2 KB', name: 'router-v2.ts', type: 'file' }],
	commands: [{ id: 'eval-triage-v2', kind: 'command', label: '/eval triage-v2' }],
	html: '',
	mentions: [{ id: 'arihan', kind: 'mention', label: 'arihan' }],
	text: "Hey @arihan - can we run /eval triage-v2 against the new contract? I'll pair on the diff."
}

export const componentRegistry = entriesFromComponentDefinitions(componentDefinitions)

export function getFoundationEntry(slug: string): FoundationRegistryEntry | undefined {
	return foundationRegistry.find(entryValue => entryValue.slug === slug)
}

export function getPrimitiveEntry(slug: string): PrimitiveRegistryEntry | undefined {
	return primitiveRegistry.find(entryValue => entryValue.slug === slug)
}

export function getComponentEntry(slug: string): ComponentRegistryEntry | undefined {
	return componentRegistry.find(entryValue => entryValue.slug === slug)
}

function entryFromDefinition(definition: PrimitiveRegistryEntry): PrimitiveRegistryEntry {
	return {
		category: definition.category,
		description: definition.description,
		guidance: definition.guidance,
		name: definition.name,
		pressure: definition.pressure,
		props: definition.props,
		slug: definition.slug,
		states: definition.states
	}
}

function componentEntryFromDefinition(definition: ComponentRegistryEntry): ComponentRegistryEntry {
	return {
		category: definition.category,
		description: definition.description,
		guidance: definition.guidance,
		name: definition.name,
		pressure: definition.pressure,
		props: definition.props,
		slug: definition.slug,
		states: definition.states
	}
}

function foundationEntryFromDefinition(
	definition: FoundationRegistryEntry
): FoundationRegistryEntry {
	return {
		category: definition.category,
		description: definition.description,
		guidance: definition.guidance,
		name: definition.name,
		pressure: definition.pressure,
		props: definition.props,
		slug: definition.slug,
		states: definition.states,
		tokens: definition.tokens
	}
}

function entriesFromFoundationDefinitions<
	const Definitions extends readonly FoundationRegistryEntry[]
>(definitions: Definitions): FoundationRegistryEntries<Definitions> {
	return definitions.map(foundationEntryFromDefinition) as FoundationRegistryEntries<Definitions>
}

function entriesFromPrimitiveDefinitions<
	const Definitions extends readonly PrimitiveRegistryEntry[]
>(definitions: Definitions): PrimitiveRegistryEntries<Definitions> {
	return definitions.map(entryFromDefinition) as PrimitiveRegistryEntries<Definitions>
}

function entriesFromComponentDefinitions<
	const Definitions extends readonly ComponentRegistryEntry[]
>(definitions: Definitions): ComponentRegistryEntries<Definitions> {
	return definitions.map(componentEntryFromDefinition) as ComponentRegistryEntries<Definitions>
}
