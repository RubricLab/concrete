import { Badge, type RenderQuery } from '@rubriclab/concrete'
import type { ReactNode } from 'react'
import type { CatalogRenderItem } from '@/catalog-render-item'
import { renderDefinitionFromSearchParams, type SearchParamsInput } from '@/rendering'

type CatalogRenderPageProps = CatalogRenderItem & {
	query: RenderQuery
	searchParams: SearchParamsInput
}

export function CatalogRenderPage({
	definition,
	entry,
	query,
	searchParams
}: CatalogRenderPageProps) {
	return (
		<main className="renderShell" data-pressure={query.pressure} data-state={query.state}>
			<section className="renderStage">
				{renderDefinitionFromSearchParams(definition, searchParams, query.state)}
				{renderCatalogRenderMeta(entry.name, query.pressure)}
			</section>
		</main>
	)
}

function renderCatalogRenderMeta(name: string, pressure: RenderQuery['pressure']): ReactNode {
	return (
		<div className="metaRow" style={{ marginTop: 14 }}>
			<Badge signal="terminal">{name}</Badge>
			<Badge signal="ultra">{pressure}</Badge>
		</div>
	)
}
