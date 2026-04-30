'use client'

import { primitiveRegistry, renderPrimitiveExample } from '@rubriclab/concrete'
import Link from 'next/link'

// DX-TODO(docs): This route still owns raw docs HTML/CSS classes. Future UX polish should rebuild the catalog from Concrete primitives only.
export default function PrimitivesPage() {
	return (
		<main className="main">
			<section className="section">
				<div className="sectionHead">
					<div>
						<span className="eyebrow">Primitives</span>
						<h1>Implemented atoms.</h1>
					</div>
					<p>
						Each card renders the primitive's item-owned default example and links into the typed prop
						page.
					</p>
				</div>

				<div className="primitiveCatalog">
					{primitiveRegistry.map(entry => (
						<article className="primitiveConceptCard" key={entry.slug}>
							<div className="conceptEyebrowRow">
								<span className="conceptEyebrow">{entry.name}</span>
								<Link className="conceptCardLink" href={`/primitives/${entry.slug}`}>
									props
								</Link>
							</div>
							<div className="conceptStage">{renderPrimitiveExample(entry.slug)}</div>
						</article>
					))}
				</div>
			</section>
		</main>
	)
}
