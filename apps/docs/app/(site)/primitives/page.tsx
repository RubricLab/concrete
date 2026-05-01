import {
	Badge,
	Chip,
	Cluster,
	Container,
	Grid,
	PageSection,
	primitiveRegistry,
	renderPrimitiveExample,
	Section,
	Stack
} from '@rubriclab/concrete'
import { CatalogCard, CatalogIntro } from '@/catalog-card'

export default function PrimitivesPage() {
	return (
		<>
			<PageSection ground="field" rhythm="chapter" separated>
				<Container as="main" density="editorial" measure="wide">
					<Stack density="editorial">
						<CatalogIntro
							count={primitiveRegistry.length}
							description="Primitives own reusable HTML/UI vocabulary: DOM anatomy, ARIA, data attributes, stable classes, schemas, examples, metadata, render input, and local token-backed styles."
							eyebrow="Each preview renders directly from the package registry and links to URL-backed props, states, and render surfaces."
							title="Implemented atoms"
						/>
						<Cluster density="compact">
							<Badge intent="terminal">atomic</Badge>
							<Chip>scoped CSS</Chip>
							<Chip>schema-backed</Chip>
							<Chip>foundation-only values</Chip>
						</Cluster>
					</Stack>
				</Container>
			</PageSection>

			<PageSection rhythm="chapter">
				<Container density="editorial" measure="wide">
					<Section title="Primitive catalog">
						<Grid columns="three">
							{primitiveRegistry.map(entry => (
								<CatalogCard
									category={entry.category}
									description={entry.description}
									href={`/primitives/${entry.slug}`}
									key={entry.slug}
									name={entry.name}
									pressure={entry.pressure}
									states={entry.states.length}
								>
									<Stack align="center">{renderPrimitiveExample(entry.slug)}</Stack>
								</CatalogCard>
							))}
						</Grid>
					</Section>
				</Container>
			</PageSection>
		</>
	)
}
