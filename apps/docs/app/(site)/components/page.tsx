import {
	Badge,
	Chip,
	Cluster,
	type ComponentRegistryEntry,
	Container,
	componentRegistry,
	Grid,
	PageSection,
	renderComponentExample,
	Section,
	Stack
} from '@rubriclab/concrete'
import { CatalogCard, CatalogIntro } from '@/catalog-card'

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
		<>
			<PageSection ground="field" rhythm="chapter" separated>
				<Container as="main" density="editorial" measure="wide">
					<Stack density="editorial">
						<CatalogIntro
							count={componentRegistry.length}
							description="Components assemble primitives and approved lower-tier components. They can own deterministic local behavior, but they do not own CSS or app-specific product policy."
							eyebrow="Each component exposes typed props, examples, states, playground controls, and render routes."
							title="Compositions with contracts"
						/>
						<Cluster density="compact">
							<Badge intent="terminal">registry backed</Badge>
							<Chip selected>typed props</Chip>
							<Chip>render routes</Chip>
						</Cluster>
					</Stack>
				</Container>
			</PageSection>

			<PageSection rhythm="chapter">
				<Container density="editorial" measure="wide">
					<Stack density="editorial">
						{groupedComponents.map(group => (
							<Section
								description={getCategoryDescription(group.category)}
								key={group.category}
								title={getCategoryTitle(group.category)}
							>
								<Grid columns="three">
									{group.components.map(component => (
										<CatalogCard
											category={component.category}
											description={component.description}
											href={`/components/${component.slug}`}
											key={component.slug}
											name={component.name}
											pressure={component.pressure}
											states={component.states.length}
										>
											<Stack align="center">{renderComponentExample(component.slug)}</Stack>
										</CatalogCard>
									))}
								</Grid>
							</Section>
						))}
					</Stack>
				</Container>
			</PageSection>
		</>
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
