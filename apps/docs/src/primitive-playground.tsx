'use client'

import {
	getPrimitiveDefinition,
	type PrimitiveRegistryEntry,
	renderDefinitionInput
} from '@rubriclab/concrete'
import { useSearchParams } from 'next/navigation'
import { CatalogPlayground } from './catalog-playground'

type PrimitivePlaygroundProps = {
	entry: PrimitiveRegistryEntry
}

export function PrimitivePlayground({ entry }: PrimitivePlaygroundProps) {
	const searchParams = useSearchParams()
	const definition = getPrimitiveDefinition(entry.slug)

	return (
		<CatalogPlayground
			controls={definition?.controls ?? []}
			preview={definition ? renderDefinitionInput(definition, searchParams) : undefined}
			states={entry.states}
		/>
	)
}
