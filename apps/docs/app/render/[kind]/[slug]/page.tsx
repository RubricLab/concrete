import {
	Badge,
	getComponentEntry,
	getPrimitiveEntry,
	renderComponentExample,
	renderPrimitiveExample
} from '@rubriclab/concrete'
import { notFound } from 'next/navigation'
import { parseRenderQuery, type SearchParamsInput } from '@/rendering'

type RenderPageProps = {
	params: Promise<{
		kind: string
		slug: string
	}>
	searchParams: Promise<SearchParamsInput>
}

export default async function RenderPage({ params, searchParams }: RenderPageProps) {
	const routeParams = await params
	const query = parseRenderQuery(await searchParams)

	switch (routeParams.kind) {
		case 'primitive': {
			const entry = getPrimitiveEntry(routeParams.slug)

			if (!entry) {
				notFound()
			}

			return (
				<main className="renderShell" data-pressure={query.pressure} data-state={query.state}>
					<section className="renderStage">
						{renderPrimitiveExample(entry.slug, query.state)}
						<div className="metaRow" style={{ marginTop: 14 }}>
							<Badge signal="terminal">{entry.name}</Badge>
							<Badge signal="ultra">{query.pressure}</Badge>
						</div>
					</section>
				</main>
			)
		}
		case 'component': {
			const entry = getComponentEntry(routeParams.slug)

			if (!entry) {
				notFound()
			}

			return (
				<main className="renderShell" data-pressure={query.pressure} data-state={query.state}>
					<section className="renderStage">
						{renderComponentExample(entry.slug, query.state)}
						<div className="metaRow" style={{ marginTop: 14 }}>
							<Badge signal="terminal">{entry.name}</Badge>
							<Badge signal="ultra">{query.pressure}</Badge>
						</div>
					</section>
				</main>
			)
		}
		default:
			notFound()
	}
}
