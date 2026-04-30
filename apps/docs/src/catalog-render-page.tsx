import { Badge, type ConcretePressure } from '@rubriclab/concrete'
import type { ReactNode } from 'react'
import type { CatalogRenderItem } from '@/catalog-render-item'

type CatalogRenderPageProps = CatalogRenderItem & {
	pressure: ConcretePressure
	state: string
}

export function CatalogRenderPage({ definition, entry, pressure, state }: CatalogRenderPageProps) {
	return (
		<main className="renderShell" data-pressure={pressure} data-state={state}>
			<section className="renderStage">
				{definition.renderExample(state)}
				{renderCatalogRenderMeta(entry.name, pressure)}
			</section>
		</main>
	)
}

function renderCatalogRenderMeta(name: string, pressure: ConcretePressure): ReactNode {
	return (
		<div className="metaRow" style={{ marginTop: 14 }}>
			<Badge signal="terminal">{name}</Badge>
			<Badge signal="ultra">{pressure}</Badge>
		</div>
	)
}
