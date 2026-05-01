import {
	foundationRegistry,
	getFoundationDefinition,
	getFoundationEntry
} from '@rubriclab/concrete'
import { notFound } from 'next/navigation'
import { CatalogDetailPage } from '@/catalog-detail-page'

export function generateStaticParams() {
	return foundationRegistry.map(entry => ({
		slug: entry.slug
	}))
}

export default async function FoundationDetailPage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const entry = getFoundationEntry(slug)
	const definition = entry ? getFoundationDefinition(entry.slug) : undefined

	if (!entry || !definition) {
		notFound()
	}

	return <CatalogDetailPage definition={definition} entry={entry} kind="foundation" />
}
