import {
	Badge,
	Chip,
	Container,
	foundationRegistry,
	Grid,
	Panel,
	renderFoundationExample,
	Section,
	Stack,
	Surface,
	Text,
	TextLink
} from '@rubriclab/concrete'

export default function FoundationsRoute() {
	return (
		<Container as="main" density="editorial" measure="wide">
			<Stack density="editorial">
				<Panel
					description="Foundations own values, shared schemas, reset-level utilities, and raw design tokens. They do not render product UI."
					meta={<Badge intent="terminal">{foundationRegistry.length} foundations</Badge>}
					title="Foundations"
				>
					<Grid columns="three">
						<Surface depth="sunken">
							<Text intent="strong">Variables and utility classes only.</Text>
						</Surface>
						<Surface depth="sunken">
							<Text intent="strong">Registry-backed examples and token records.</Text>
						</Surface>
						<Surface depth="sunken">
							<Text intent="strong">Consumed by primitives, never redefined in docs.</Text>
						</Surface>
					</Grid>
				</Panel>

				<Section
					description="Each foundation page shows the live item definition, its token role, states, props, and render routes."
					title="Registry"
				>
					<Grid columns="three">
						{foundationRegistry.map(entry => (
							<Panel
								description={entry.description}
								footer={
									<TextLink href={`/foundations/${entry.slug}`} purpose="nav">
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
										<Stack align="center">{renderFoundationExample(entry.slug)}</Stack>
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
