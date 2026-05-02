import { notFound } from 'next/navigation'
import { getCatalogRenderItem } from '@/catalog-render-item'
import { CatalogRenderPage } from '@/catalog-render-page'
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
	const resolvedSearchParams = await searchParams
	const query = parseRenderQuery(resolvedSearchParams)
	const item = getCatalogRenderItem(routeParams.kind, routeParams.slug)

	if (!item) {
		notFound()
	}

	return (
		<CatalogRenderPage
			definition={item.definition}
			entry={item.entry}
			pressure={query.pressure}
			state={query.state}
		/>
	)
}
