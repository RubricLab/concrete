import {
	Badge,
	Chip,
	type ComponentRegistryEntry,
	Container,
	componentRegistry,
	Grid,
	Panel,
	renderComponentExample,
	Section,
	Stack,
	Surface,
	Text,
	TextLink
} from '@rubriclab/concrete'

type ComponentCategory = ComponentRegistryEntry['category']

const componentCategoryOrder = [
	'navigation',
	'control',
	'surface',
	'diagram',
	'data',
	'feedback',
	'layout',
	'form',
	'media'
] as const satisfies readonly ComponentCategory[]

export default function ComponentsPage() {
	const groupedComponents = getComponentCategories(componentRegistry)
		.map(category => ({
			category,
			components: componentRegistry.filter(component => component.category === category)
		}))
		.filter(group => group.components.length > 0)

	return (
		<Container as="main" density="editorial" measure="wide">
			<Stack density="editorial">
				<Panel
					description="Components assemble primitives and approved lower-tier components. They can own deterministic local behavior, but they do not own CSS or app-specific product policy."
					meta={<Badge intent="terminal">{componentRegistry.length} components</Badge>}
					title="Compositions with contracts"
				>
					<Stack density="compact">
						<Chip selected>registry backed</Chip>
						<Chip>typed props</Chip>
						<Chip>render routes</Chip>
					</Stack>
				</Panel>

				{groupedComponents.map(group => (
					<Section
						description={getCategoryDescription(group.category)}
						key={group.category}
						title={getCategoryTitle(group.category)}
					>
						<Grid>
							{group.components.map(component => (
								<Panel
									description={component.description}
									footer={
										<TextLink href={`/components/${component.slug}`} purpose="nav">
											Open
										</TextLink>
									}
									key={component.slug}
									meta={
										<Stack density="compact">
											<Badge intent="terminal">{component.category}</Badge>
											<Text purpose="caption" intent="muted">
												{component.states.length} states / {component.props.length} props
											</Text>
										</Stack>
									}
									title={component.name}
								>
									<Stack density="compact">
										<Surface depth="sunken">
											<Stack align="center">{renderComponentExample(component.slug)}</Stack>
										</Surface>
										<Stack density="compact">
											{component.pressure.map(pressure => (
												<Chip key={pressure}>{pressure}</Chip>
											))}
										</Stack>
									</Stack>
								</Panel>
							))}
						</Grid>
					</Section>
				))}
			</Stack>
		</Container>
	)
}

function getComponentCategories(
	registry: readonly ComponentRegistryEntry[]
): readonly ComponentCategory[] {
	const knownCategories = new Set<ComponentCategory>(componentCategoryOrder)
	const unlistedCategories = registry
		.map(component => component.category)
		.filter(category => !knownCategories.has(category))

	return [...componentCategoryOrder, ...new Set(unlistedCategories)]
}

function getCategoryTitle(category: ComponentCategory): string {
	switch (category) {
		case 'control':
			return 'Interaction controls'
		case 'data':
			return 'Data surfaces'
		case 'diagram':
			return 'Explainer diagrams'
		case 'feedback':
			return 'Agent process artifacts'
		case 'form':
			return 'Input systems'
		case 'layout':
			return 'Form and editor shells'
		case 'media':
			return 'Upload compositions'
		case 'navigation':
			return 'Navigation and command surfaces'
		case 'surface':
			return 'Transcript surfaces'
		default:
			return 'Component group'
	}
}

function getCategoryDescription(category: ComponentCategory): string {
	switch (category) {
		case 'control':
			return 'Small but stateful control clusters that coordinate keyboard, focus, and selected state.'
		case 'data':
			return 'Typed KPI, chart, table, meter, and diagram components for dense product data and generated UI.'
		case 'diagram':
			return 'Concept frames and graph canvases for editorial and educational explanation.'
		case 'feedback':
			return 'Subdued, expandable artifacts for visible reasoning, validation, and tool execution.'
		case 'form':
			return 'Field-level compositions for typed values, choices, dates, times, numbers, ranges, and uploads.'
		case 'layout':
			return 'Larger component shells that standardize dense product form rhythm without owning product policy.'
		case 'media':
			return 'Upload surfaces specialized around local previews and queue state.'
		case 'navigation':
			return 'Top-level navigation, footer, search, and command entry points for agentic interfaces.'
		case 'surface':
			return 'Role-aware message surfaces for multiplayer and multi-agent transcripts.'
		default:
			return 'Registry-backed components ready for render routes and screenshots.'
	}
}
