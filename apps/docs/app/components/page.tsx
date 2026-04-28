import { Badge, Chip, componentRegistry, renderComponentExample } from '@rubriclab/concrete'
import Link from 'next/link'
import {
	getCategoryDescription,
	getCategoryTitle,
	getComponentCategories,
	getComponentPreviewState
} from '@/component-catalog'

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
									{renderComponentExample(component.slug, getComponentPreviewState(component.slug))}
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
