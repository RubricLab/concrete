'use client'

import { getPrimitiveDefinition, type PrimitiveRegistryEntry } from '@rubriclab/concrete'
import { useSearchParams } from 'next/navigation'
import { CatalogPlayground } from './catalog-playground'
import { renderPlaygroundPrimitive } from './primitive-playground-renderers'

type PrimitivePlaygroundProps = {
	entry: PrimitiveRegistryEntry
}

export function PrimitivePlayground({ entry }: PrimitivePlaygroundProps) {
	const searchParams = useSearchParams()

	return (
		<CatalogPlayground
			controls={getPrimitiveDefinition(entry.slug)?.controls ?? []}
			preview={renderPlaygroundPrimitive(entry.slug, searchParams)}
			states={entry.states}
		/>
	)
}
