import {
	Badge,
	Button,
	Chip,
	type ComponentDefinition,
	type ComponentRegistryEntry,
	Container,
	type FoundationDefinition,
	type FoundationRegistryEntry,
	Grid,
	Panel,
	type PrimitiveDefinition,
	type PrimitiveRegistryEntry,
	Section,
	Stack,
	Surface,
	Text,
	TextLink
} from '@rubriclab/concrete'
import { type ReactNode, Suspense } from 'react'
import { CatalogPropsTable } from './catalog-props-table'
import { ComponentPlayground } from './component-playground'
import { FoundationPlayground } from './foundation-playground'
import { PrimitivePlayground } from './primitive-playground'

type CatalogDetailConfiguration = {
	actionLabel: string
	label: string
	playgroundDescription: string
}

type CatalogDetailPageProps =
	| {
			definition: ComponentDefinition
			entry: ComponentRegistryEntry
			kind: 'component'
	  }
	| {
			definition: FoundationDefinition
			entry: FoundationRegistryEntry
			kind: 'foundation'
	  }
	| {
			definition: PrimitiveDefinition
			entry: PrimitiveRegistryEntry
			kind: 'primitive'
	  }

const catalogDetailConfigurations: Record<
	CatalogDetailPageProps['kind'],
	CatalogDetailConfiguration
> = {
	component: {
		actionLabel: 'Zod schemas',
		label: 'Component',
		playgroundDescription:
			'Controls update query params directly. Complex slots use item-owned examples so component states stay deterministic, linkable, and screenshot-ready.'
	},
	foundation: {
		actionLabel: 'Token schema',
		label: 'Foundation',
		playgroundDescription:
			'Foundation examples are token specimens. The route stays registry-led so every foundation can be rendered, linked, and screenshotted through the same catalog surface.'
	},
	primitive: {
		actionLabel: 'Typed export',
		label: 'Primitive',
		playgroundDescription:
			'Controls update query params directly, so every primitive state can be linked, rendered, and screenshotted deterministically.'
	}
}

export function CatalogDetailPage(props: CatalogDetailPageProps) {
	const { definition, entry, kind } = props
	const configuration = catalogDetailConfigurations[kind]

	return (
		<Container as="main" density="editorial" measure="wide">
			<Stack density="editorial">
				<Panel
					actions={
						<Stack density="compact">
							<TextLink href={`/render/${kind}/${entry.slug}`} purpose="nav">
								DOM render
							</TextLink>
							<TextLink href={`/render/${kind}/${entry.slug}.jpg`} purpose="nav">
								JPEG render
							</TextLink>
						</Stack>
					}
					description={entry.description}
					meta={
						<Stack density="compact">
							<Badge intent="terminal">{configuration.label}</Badge>
							<Badge intent="ultra">{entry.category}</Badge>
							{entry.pressure.map(pressure => (
								<Chip key={pressure}>{pressure}</Chip>
							))}
						</Stack>
					}
					title={entry.name}
				>
					<Stack density="editorial">
						<Text intent="muted">{entry.guidance}</Text>
						<Surface depth="sunken">
							<Stack align="center">{definition.renderExample()}</Stack>
						</Surface>
					</Stack>
				</Panel>

				<Section description={configuration.playgroundDescription} title="Playground">
					<Suspense fallback={<Panel title="Loading playground" />}>
						{renderDetailPlayground(props)}
					</Suspense>
				</Section>

				<Section
					description={`Every state maps to the same ${kind} render route through the state query param.`}
					title="Rendered matrix"
				>
					<Grid>
						{entry.states.map(state => (
							<Panel
								description={state.description}
								footer={
									<TextLink href={`/render/${kind}/${entry.slug}?state=${state.query}`} purpose="nav">
										Render state
									</TextLink>
								}
								key={state.query}
								title={state.name}
							>
								<Surface depth="sunken">
									<Stack align="center">{definition.renderExample(state.query)}</Stack>
								</Surface>
							</Panel>
						))}
					</Grid>
				</Section>

				<Section
					description="The public prop table is generated from item metadata and schema-backed controls."
					title="Public contract"
				>
					<Stack density="compact">
						<Button trailingIcon="arrow-right" hierarchy="secondary">
							{configuration.actionLabel}
						</Button>
						<CatalogPropsTable entry={entry} />
					</Stack>
				</Section>
			</Stack>
		</Container>
	)
}

function renderDetailPlayground(props: CatalogDetailPageProps): ReactNode {
	switch (props.kind) {
		case 'component':
			return <ComponentPlayground entry={props.entry} />
		case 'foundation':
			return <FoundationPlayground entry={props.entry} />
		case 'primitive':
			return <PrimitivePlayground entry={props.entry} />
	}
}
