import {
	type ComponentDefinition,
	type ComponentRegistryEntry,
	getComponentDefinition,
	getComponentEntry,
	getPrimitiveDefinition,
	getPrimitiveEntry,
	type PrimitiveDefinition,
	type PrimitiveRegistryEntry
} from '@rubriclab/concrete'

export type CatalogRenderItem = {
	definition: ComponentDefinition | PrimitiveDefinition
	entry: ComponentRegistryEntry | PrimitiveRegistryEntry
}

export function getCatalogRenderItem(kind: string, slug: string): CatalogRenderItem | undefined {
	switch (kind) {
		case 'component': {
			const entry = getComponentEntry(slug)
			const definition = entry ? getComponentDefinition(entry.slug) : undefined

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
