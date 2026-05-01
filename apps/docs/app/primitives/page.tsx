import {
	Badge,
	Chip,
	Container,
	Grid,
	Panel,
	primitiveRegistry,
	renderPrimitiveExample,
	Section,
	Stack,
	Surface,
	Text,
	TextLink
} from '@rubriclab/concrete'

export default function PrimitivesPage() {
	return (
		<Container as="main" density="editorial" measure="wide">
			<Stack density="editorial">
				<Panel
					description="Primitives own reusable HTML/UI vocabulary: DOM anatomy, ARIA, data attributes, stable classes, schemas, examples, metadata, render input, and local token-backed styles."
					meta={<Badge intent="terminal">{primitiveRegistry.length} primitives</Badge>}
					title="Implemented atoms"
				>
					<Text intent="muted">
						Every primitive preview below is rendered from the package registry, then linked into its
						dedicated prop, state, playground, and render surface.
					</Text>
				</Panel>

				<Section title="Primitive catalog">
					<Grid>
						{primitiveRegistry.map(entry => (
							<Panel
								description={entry.description}
								footer={
									<TextLink href={`/primitives/${entry.slug}`} purpose="nav">
										Open
									</TextLink>
								}
								key={entry.slug}
								meta={
									<Stack density="compact">
										<Badge intent="terminal">{entry.category}</Badge>
										<Text purpose="caption" intent="muted">
											{entry.states.length} states
										</Text>
									</Stack>
								}
								title={entry.name}
							>
								<Stack density="compact">
									<Surface depth="sunken">
										<Stack align="center">{renderPrimitiveExample(entry.slug)}</Stack>
									</Surface>
									<Stack density="compact">
										{entry.pressure.map(pressure => (
											<Chip key={pressure}>{pressure}</Chip>
										))}
									</Stack>
								</Stack>
							</Panel>
						))}
					</Grid>
				</Section>
			</Stack>
		</Container>
	)
}
