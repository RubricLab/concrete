import type { ComposerValue } from '../components'
import { componentDefinitions, primitiveDefinitions } from './items'
import type { ComponentRegistryEntry, PrimitiveRegistryEntry } from './types'

type PrimitiveRegistryEntries<Definitions extends readonly PrimitiveRegistryEntry[]> = {
	readonly [Index in keyof Definitions]: PrimitiveRegistryEntry
}

type ComponentRegistryEntries<Definitions extends readonly ComponentRegistryEntry[]> = {
	readonly [Index in keyof Definitions]: ComponentRegistryEntry
}

export const primitiveRegistry = entriesFromPrimitiveDefinitions(primitiveDefinitions)

export const composerExampleValue: ComposerValue = {
	attachments: [{ id: 'router-v2', meta: '3.2 KB', name: 'router-v2.ts', type: 'file' }],
	commands: [{ id: 'eval-triage-v2', kind: 'command', label: '/eval triage-v2' }],
	html: '',
	mentions: [{ id: 'arihan', kind: 'mention', label: 'arihan' }],
	text: "Hey @arihan - can we run /eval triage-v2 against the new contract? I'll pair on the diff."
}

export const componentRegistry = entriesFromComponentDefinitions(componentDefinitions)

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
