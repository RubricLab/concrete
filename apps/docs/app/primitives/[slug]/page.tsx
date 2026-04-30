import { getPrimitiveDefinition, getPrimitiveEntry, primitiveRegistry } from '@rubriclab/concrete'
import { notFound } from 'next/navigation'
import { CatalogDetailPage } from '@/catalog-detail-page'

export function generateStaticParams() {
	return primitiveRegistry.map(entry => ({
		slug: entry.slug
	}))
}

export default async function PrimitiveDetailPage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const entry = getPrimitiveEntry(slug)

	const definition = entry ? getPrimitiveDefinition(entry.slug) : undefined

	if (!entry || !definition) {
		notFound()
	}

	return <CatalogDetailPage definition={definition} entry={entry} kind="primitive" />
}
