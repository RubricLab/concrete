'use client'

import {
	type ComponentRegistryEntry,
	getComponentDefinition,
	renderDefinitionInput
} from '@rubriclab/concrete'
import { useSearchParams } from 'next/navigation'
import { CatalogPlayground } from './catalog-playground'

type ComponentPlaygroundProps = {
	entry: ComponentRegistryEntry
}

export function ComponentPlayground({ entry }: ComponentPlaygroundProps) {
	const searchParams = useSearchParams()
	const definition = getComponentDefinition(entry.slug)

	return (
		<CatalogPlayground
			controls={definition?.controls ?? []}
			preview={definition ? renderDefinitionInput(definition, searchParams) : undefined}
			previewClassName="componentPlaygroundPreview"
			shellClassName="componentPlaygroundShell"
			states={entry.states}
		/>
	)
}
