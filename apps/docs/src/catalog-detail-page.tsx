import {
	Badge,
	Button,
	Chip,
	Cluster,
	type ComponentDefinition,
	type ComponentRegistryEntry,
	Container,
	type FoundationDefinition,
	type FoundationRegistryEntry,
	Frame,
	Grid,
	Heading,
	PageSection,
	Panel,
	type PrimitiveDefinition,
	type PrimitiveRegistryEntry,
	Section,
	Split,
	Stack,
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
		<>
			<PageSection ground="field" rhythm="chapter" separated>
				<Container as="main" density="editorial" measure="wide">
					<Split
						aside={
							<Frame
								align="center"
								header={entry.name}
								headerMeta="Default"
								scale="showcase"
								texture="field"
							>
								<Stack align="center">{definition.renderExample()}</Stack>
							</Frame>
						}
						density="editorial"
						ratio="even"
					>
						<Stack density="editorial">
							<Stack align="start" density="compact">
								<Badge intent="terminal">{configuration.label}</Badge>
								<Heading hierarchy="display" level="1">
									{entry.name}
								</Heading>
								<Text as="p" intent="muted" purpose="lead">
									{entry.description}
								</Text>
								<Text intent="muted">{entry.guidance}</Text>
							</Stack>
							<Cluster density="compact">
								<Badge intent="ultra">{entry.category}</Badge>
								{entry.pressure.map(pressure => (
									<Chip key={pressure}>{pressure}</Chip>
								))}
							</Cluster>
							<Cluster density="compact">
								<TextLink href={`/render/${kind}/${entry.slug}`} purpose="nav">
									DOM render
								</TextLink>
								<TextLink href={`/render/${kind}/${entry.slug}/screenshot`} purpose="nav">
									Image render
								</TextLink>
							</Cluster>
						</Stack>
					</Split>
				</Container>
			</PageSection>

			<PageSection rhythm="chapter" separated>
				<Container density="editorial" measure="wide">
					<Section description={configuration.playgroundDescription} title="Playground">
						<Suspense fallback={<Panel title="Loading playground" />}>
							{renderDetailPlayground(props)}
						</Suspense>
					</Section>
				</Container>
			</PageSection>

			<PageSection rhythm="chapter" separated>
				<Container density="editorial" measure="wide">
					<Section
						description={`Every state maps to the same ${kind} render route through the state query param.`}
						title="Rendered matrix"
					>
						<Grid columns="three">
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
									<Frame align="center" scale="standard" texture="field">
										<Stack align="center">{definition.renderExample(state.query)}</Stack>
									</Frame>
								</Panel>
							))}
						</Grid>
					</Section>
				</Container>
			</PageSection>

			<PageSection rhythm="chapter">
				<Container density="editorial" measure="wide">
					<Section
						description="The public prop table is generated from item metadata and schema-backed controls."
						title="Public contract"
					>
						<Stack density="compact">
							<Button hierarchy="secondary" trailingIcon="arrow-right">
								{configuration.actionLabel}
							</Button>
							<CatalogPropsTable entry={entry} />
						</Stack>
					</Section>
				</Container>
			</PageSection>
		</>
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
