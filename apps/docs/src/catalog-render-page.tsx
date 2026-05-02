import {
	Badge,
	Cluster,
	type ConcretePressure,
	Container,
	Frame,
	Stack,
	Surface
} from '@rubriclab/concrete'
import type { ReactNode } from 'react'
import type { CatalogRenderItem } from '@/catalog-render-item'

type CatalogRenderPageProps = CatalogRenderItem & {
	pressure: ConcretePressure
	state: string
}

export function CatalogRenderPage({ definition, entry, pressure, state }: CatalogRenderPageProps) {
	return (
		<Surface as="main" data-pressure={pressure} data-state={state} intent="default">
			<Container density="editorial" measure="wide">
				<Stack align="stretch" density="editorial">
					<Surface depth="sunken">
						<Frame align="stretch" scale="showcase" texture="field">
							<Stack align="center">{definition.renderExample(state)}</Stack>
						</Frame>
					</Surface>
					{renderCatalogRenderMeta(entry.name, pressure)}
				</Stack>
			</Container>
		</Surface>
	)
}

function renderCatalogRenderMeta(name: string, pressure: ConcretePressure): ReactNode {
	return (
		<Cluster density="compact">
			<Badge intent="terminal">{name}</Badge>
			<Badge intent="ultra">{pressure}</Badge>
		</Cluster>
	)
}
