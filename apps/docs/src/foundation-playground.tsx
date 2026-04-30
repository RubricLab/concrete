'use client'

import {
	type FoundationRegistryEntry,
	getFoundationDefinition,
	renderDefinitionInput
} from '@rubriclab/concrete'
import { useSearchParams } from 'next/navigation'
import { CatalogPlayground } from './catalog-playground'
import { getQueryValue } from './playground-query'

type FoundationPlaygroundProps = {
	entry: FoundationRegistryEntry
}

export function FoundationPlayground({ entry }: FoundationPlaygroundProps) {
	const searchParams = useSearchParams()
	const state = getQueryValue(searchParams, 'state', 'default')
	const definition = getFoundationDefinition(entry.slug)
	const preview = definition
		? (renderDefinitionInput(definition, searchParams) ?? definition.renderExample(state))
		: undefined

	return (
		<CatalogPlayground
			controls={definition?.controls ?? []}
			preview={preview}
			states={entry.states}
		/>
	)
}
