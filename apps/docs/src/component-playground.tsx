'use client'

import { type ComponentRegistryEntry, getComponentDefinition } from '@rubriclab/concrete'
import { useSearchParams } from 'next/navigation'
import { CatalogPlayground } from './catalog-playground'
import { renderPlaygroundComponent } from './component-playground-renderers'

type ComponentPlaygroundProps = {
	entry: ComponentRegistryEntry
}

export function ComponentPlayground({ entry }: ComponentPlaygroundProps) {
	const searchParams = useSearchParams()

	return (
		<CatalogPlayground
			controls={getComponentDefinition(entry.slug)?.controls ?? []}
			preview={renderPlaygroundComponent(entry.slug, searchParams)}
			previewClassName="componentPlaygroundPreview"
			shellClassName="componentPlaygroundShell"
			states={entry.states}
		/>
	)
}
