import {
	Badge,
	Chip,
	type ComponentRegistryEntry,
	componentRegistry,
	renderComponentExample
} from '@rubriclab/concrete'
import Link from 'next/link'

// DX-TODO(docs): This route still owns raw docs HTML/CSS classes. Future UX polish should rebuild the catalog from Concrete primitives only.
type ComponentCategory = ComponentRegistryEntry['category']

const componentCategoryOrder = [
	'control',
	'navigation',
	'surface',
	'diagram',
	'data',
	'feedback',
	'layout',
	'form',
	'media'
] as const satisfies readonly ComponentCategory[]

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
			return 'Interaction controls.'
		case 'data':
			return 'Data surfaces.'
		case 'diagram':
			return 'Explainer diagrams.'
		case 'feedback':
			return 'Agent process artifacts.'
		case 'form':
			return 'Input systems.'
		case 'layout':
			return 'Form and editor shells.'
		case 'media':
			return 'Upload compositions.'
		case 'navigation':
			return 'Command surfaces.'
		case 'surface':
			return 'Transcript surfaces.'
		default:
			return 'Component group.'
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
			return 'Search and command entry points for agentic interfaces.'
		case 'surface':
			return 'Role-aware message surfaces for multiplayer and multi-agent transcripts.'
		default:
			return 'Registry-backed components ready for render routes and screenshots.'
	}
}

export default function ComponentsPage() {
	const categories = getComponentCategories(componentRegistry)
	const groupedComponents = categories
		.map(category => ({
			category,
			components: componentRegistry.filter(component => component.category === category)
		}))
		.filter(group => group.components.length > 0)

	return (
		<main className="main">
			<section className="section">
				<div className="sectionHead">
					<div>
						<span className="eyebrow">Components</span>
						<h1>Compositions with contracts.</h1>
					</div>
					<p>
						Each component now has a dedicated page with a live playground, URL-backed props, rendered
						states, and screenshot routes. The overview stays a catalog for fast scanning.
					</p>
				</div>
				<div className="componentCatalogHero">
					<Badge signal="terminal">{componentRegistry.length} components</Badge>
					<Chip selected>registry backed</Chip>
					<Chip>typed props</Chip>
					<Chip>dedicated pages</Chip>
				</div>
			</section>

			{groupedComponents.map(group => (
				<section className="section" key={group.category}>
					<div className="sectionHead">
						<div>
							<span className="eyebrow">{group.category}</span>
							<h1>{getCategoryTitle(group.category)}</h1>
						</div>
						<p>{getCategoryDescription(group.category)}</p>
					</div>
					<div className="componentCatalogGrid">
						{group.components.map(component => (
							<article className="componentCatalogCard" key={component.slug}>
								<Link
									aria-label={`Open ${component.name} component details`}
									className="homeCardOverlay"
									href={`/components/${component.slug}`}
								/>
								<header>
									<strong>{component.name}</strong>
									<span>{component.pressure.join(' / ')}</span>
								</header>
								<div className="componentCatalogStage" data-component={component.slug}>
									{renderComponentExample(component.slug)}
								</div>
								<footer>
									<p>{component.description}</p>
									<div className="componentCatalogMeta">
										<span className="componentCatalogMetric">{component.states.length} states</span>
										<span className="componentCatalogMetric">{component.props.length} props</span>
									</div>
								</footer>
							</article>
						))}
					</div>
				</section>
			))}
		</main>
	)
}
