import {
	type ComponentDefinition,
	type ComponentRegistryEntry,
	type FoundationDefinition,
	type FoundationRegistryEntry,
	getComponentDefinition,
	getComponentEntry,
	getFoundationDefinition,
	getFoundationEntry,
	getPrimitiveDefinition,
	getPrimitiveEntry,
	type PrimitiveDefinition,
	type PrimitiveRegistryEntry
} from '@rubriclab/concrete'

export type CatalogRenderItem = {
	definition: ComponentDefinition | FoundationDefinition | PrimitiveDefinition
	entry: ComponentRegistryEntry | FoundationRegistryEntry | PrimitiveRegistryEntry
}

export function getCatalogRenderItem(kind: string, slug: string): CatalogRenderItem | undefined {
	switch (kind) {
		case 'component': {
			const entry = getComponentEntry(slug)
			const definition = entry ? getComponentDefinition(entry.slug) : undefined

			return entry && definition ? { definition, entry } : undefined
		}
		case 'foundation': {
			const entry = getFoundationEntry(slug)
			const definition = entry ? getFoundationDefinition(entry.slug) : undefined

			return entry && definition ? { definition, entry } : undefined
		}
		case 'primitive': {
			const entry = getPrimitiveEntry(slug)
			const definition = entry ? getPrimitiveDefinition(entry.slug) : undefined

			return entry && definition ? { definition, entry } : undefined
		}
		default:
			return undefined
	}
}
