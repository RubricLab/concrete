'use client'

import { type ComponentRegistryEntry, getComponentDefinition } from '@rubriclab/concrete'
import { useSearchParams } from 'next/navigation'
import { CatalogPlayground } from './catalog-playground'
import { renderDefinitionFromSearchParams } from './rendering'

type ComponentPlaygroundProps = {
	entry: ComponentRegistryEntry
}

export function ComponentPlayground({ entry }: ComponentPlaygroundProps) {
	const searchParams = useSearchParams()
	const definition = getComponentDefinition(entry.slug)

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
			previewClassName="componentPlaygroundPreview"
			shellClassName="componentPlaygroundShell"
			states={entry.states}
		/>
	)
}
