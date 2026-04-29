'use client'

import { type PrimitiveSlug, primitiveRegistry } from '@rubriclab/concrete'
import Link from 'next/link'
import { renderPrimitiveConcept } from './primitive-concepts'

const widePrimitiveSlugs = new Set<PrimitiveSlug>([
	'empty-state',
	'indicator',
	'skeleton',
	'sparkline'
])

export function PrimitiveCatalogPage() {
	return (
		<main className="main">
			<section className="section">
				<div className="sectionHead">
					<div>
						<span className="eyebrow">Primitives</span>
						<h1>Concept cards, implemented atoms.</h1>
					</div>
					<p>
						Each card mirrors the original concept previews: breadth first, terse labels, real primitives,
						and links into the typed prop pages.
					</p>
				</div>

				<div className="primitiveCatalog">
					{primitiveRegistry.map(entry => (
						<article
							className={
								widePrimitiveSlugs.has(entry.slug)
									? 'primitiveConceptCard primitiveConceptWide'
									: 'primitiveConceptCard'
							}
							key={entry.slug}
						>
							<div className="conceptEyebrowRow">
								<span className="conceptEyebrow">{entry.name}</span>
								<Link className="conceptCardLink" href={`/primitives/${entry.slug}`}>
									props
								</Link>
							</div>
							{renderPrimitiveConcept(entry.slug)}
						</article>
					))}
				</div>
			</section>
		</main>
	)
}
