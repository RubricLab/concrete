import { componentRegistry, getComponentDefinition, getComponentEntry } from '@rubriclab/concrete'
import { notFound } from 'next/navigation'
import { CatalogDetailPage } from '@/catalog-detail-page'

export function generateStaticParams() {
	return componentRegistry.map(entry => ({
		slug: entry.slug
	}))
}

export default async function ComponentDetailPage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const entry = getComponentEntry(slug)

	const definition = entry ? getComponentDefinition(entry.slug) : undefined

	if (!entry || !definition) {
		notFound()
	}

	return <CatalogDetailPage definition={definition} entry={entry} kind="component" />
}
