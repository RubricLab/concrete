import {
	Badge,
	Chip,
	Cluster,
	Container,
	Frame,
	foundationRegistry,
	Grid,
	Heading,
	PageSection,
	renderFoundationExample,
	Section,
	Split,
	Stack,
	Text
} from '@rubriclab/concrete'
import { CatalogCard, CatalogIntro } from '@/catalog-card'

const foundationShowcases = [
	'typography',
	'colors',
	'spacing',
	'radii',
	'elevation',
	'motion',
	'textures',
	'iconography',
	'state',
	'accessibility'
] as const

export default function FoundationsRoute() {
	return (
		<>
			<PageSection ground="field" rhythm="chapter" separated>
				<Container as="main" density="editorial" measure="wide">
					<Stack density="editorial">
						<CatalogIntro
							count={foundationRegistry.length}
							description="Foundations own values, shared schemas, reset-level utilities, and raw design tokens. They do not render product UI."
							eyebrow="Variables, utility classes, examples, and token records are package-owned."
							title="Foundations"
						/>
						<Split
							aside={
								<Frame
									align="stretch"
									header="Display"
									headerMeta="Fraunces"
									scale="showcase"
									texture="field"
								>
									<Stack density="compact">
										<Heading hierarchy="hero" level="2">
											Two <em>families,</em> one voice.
										</Heading>
										<Text as="p" intent="muted" purpose="lead">
											Plus Jakarta Sans carries the interface. Fraunces is reserved for display moments,
											chapter plates, and pull quotes.
										</Text>
									</Stack>
								</Frame>
							}
							density="editorial"
							ratio="even"
						>
							<Stack density="compact">
								<Frame align="stretch" header="Typography" scale="showcase" texture="lines">
									{renderFoundationExample('typography')}
								</Frame>
							</Stack>
						</Split>
					</Stack>
				</Container>
			</PageSection>

			<PageSection rhythm="chapter" separated>
				<Container density="editorial" measure="wide">
					<Stack density="editorial">
						<Section
							description="Curated specimens are rendered from package-owned foundation examples, so the docs page stays a consumer instead of duplicating token truth."
							title="Foundation specimens"
						>
							<Grid columns="two">
								{foundationShowcases.map(slug => (
									<Frame
										align="stretch"
										header={getFoundationName(slug)}
										key={slug}
										scale="showcase"
										texture="field"
									>
										{renderFoundationExample(slug)}
									</Frame>
								))}
							</Grid>
						</Section>
						<Section
							description="Each foundation page shows the live item definition, token role, states, props, and render routes."
							title="Registry"
						>
							<Grid columns="three">
								{foundationRegistry.map(entry => (
									<CatalogCard
										category={entry.category}
										description={entry.description}
										href={`/foundations/${entry.slug}`}
										key={entry.slug}
										name={entry.name}
										pressure={entry.pressure}
										states={entry.states.length}
									>
										<Stack align="center">{renderFoundationExample(entry.slug)}</Stack>
									</CatalogCard>
								))}
							</Grid>
						</Section>
						<Cluster density="compact">
							<Badge intent="terminal">registry backed</Badge>
							<Chip>token records</Chip>
							<Chip>render routes</Chip>
						</Cluster>
					</Stack>
				</Container>
			</PageSection>
		</>
	)
}

function getFoundationName(slug: (typeof foundationShowcases)[number]): string {
	return foundationRegistry.find(entry => entry.slug === slug)?.name ?? slug
}
