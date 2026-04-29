import {
	Badge,
	Button,
	Chip,
	componentRegistry,
	getComponentDefinition,
	getComponentEntry,
	renderComponentExample,
	TextLink
} from '@rubriclab/concrete'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ComponentPlayground } from '@/component-playground'

type ComponentDetailPageProps = {
	params: Promise<{
		slug: string
	}>
}

export function generateStaticParams() {
	return componentRegistry.map(entry => ({
		slug: entry.slug
	}))
}

export default async function ComponentDetailPage({ params }: ComponentDetailPageProps) {
	const { slug } = await params
	const entry = getComponentEntry(slug)

	if (!entry) {
		notFound()
	}

	const definition = getComponentDefinition(entry.slug)

	return (
		<main className="main">
			<section className="section">
				<div className="detailHero componentDetailHero">
					<div className="detailIntro">
						<div className="metaRow">
							<Badge signal="terminal">{entry.category}</Badge>
							{entry.pressure.map(pressure => (
								<Chip key={pressure}>{pressure}</Chip>
							))}
						</div>
						<div>
							<span className="eyebrow">Component</span>
							<h1>{entry.name}</h1>
						</div>
						<p>{entry.description}</p>
						<p>{entry.guidance}</p>
						<div className="heroActions">
							<TextLink href={`/render/component/${entry.slug}`}>DOM render</TextLink>
							<TextLink href={`/render/component/${entry.slug}.jpg`}>JPEG render</TextLink>
						</div>
					</div>
					<div className="detailPreview componentDetailPreview">
						{definition?.renderExample() ?? renderComponentExample(entry.slug)}
					</div>
				</div>
			</section>

			<section className="section">
				<div className="sectionHead">
					<div>
						<span className="eyebrow">Playground</span>
						<h1>Props in the URL.</h1>
					</div>
					<p>
						Controls update query params directly. Complex slots use curated fixtures so component states
						stay deterministic, linkable, and screenshot-ready.
					</p>
				</div>
				<Suspense fallback={<div className="playgroundLoading">Loading playground.</div>}>
					<ComponentPlayground entry={entry} />
				</Suspense>
			</section>

			<section className="section">
				<div className="sectionHead">
					<div>
						<span className="eyebrow">States</span>
						<h1>Rendered matrix.</h1>
					</div>
					<p>Every state maps to the same component render route through the `state` query param.</p>
				</div>
				<div className="componentStateGrid">
					{entry.states.map(state => (
						<article className="stateCard componentStateCard" key={state.query}>
							<div className="componentStateStage">
								{definition?.renderExample(state.query) ?? renderComponentExample(entry.slug, state.query)}
							</div>
							<div className="stateMeta">
								<b>{state.name}</b>
								<p>{state.description}</p>
								<TextLink href={`/render/component/${entry.slug}?state=${state.query}`}>
									/render state
								</TextLink>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="section">
				<div className="sectionHead">
					<div>
						<span className="eyebrow">Props</span>
						<h1>Public contract.</h1>
					</div>
					<Button trailingIcon="arrow-right" variant="secondary">
						Zod schemas
					</Button>
				</div>
				<table className="propsTable">
					<thead>
						<tr>
							<th>Name</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{entry.props.map(prop => (
							<tr key={`${entry.slug}-${prop.name}`}>
								<td>
									<code>
										{prop.name}
										{prop.required ? ' *' : ''}
									</code>
								</td>
								<td>
									<code>{prop.type}</code>
								</td>
								<td>{prop.defaultValue ? <code>{prop.defaultValue}</code> : '-'}</td>
								<td>{prop.description}</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</main>
	)
}
