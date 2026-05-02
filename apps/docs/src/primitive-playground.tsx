'use client'

import { getPrimitiveDefinition, type PrimitiveRegistryEntry } from '@rubriclab/concrete'
import { useSearchParams } from 'next/navigation'
import { CatalogPlayground } from './catalog-playground'
import { renderDefinitionFromSearchParams } from './rendering'

type PrimitivePlaygroundProps = {
	entry: PrimitiveRegistryEntry
}

export function PrimitivePlayground({ entry }: PrimitivePlaygroundProps) {
	const searchParams = useSearchParams()
	const definition = getPrimitiveDefinition(entry.slug)

	return (
		<CatalogPlayground
			controls={definition?.controls ?? []}
			preview={
				definition
					? renderDefinitionFromSearchParams(
							definition,
							searchParams,
							searchParams.get('state') ?? 'default'
						)
					: undefined
			}
			states={entry.states}
		/>
	)
}
