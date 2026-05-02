import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DataSurfaceMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const dataSurfaceMeta = {
	category: 'data',
	description: 'Data and generated-output surface for metrics, charts, and tables.',
	guidance:
		'Use DataSurface when a product or generative UI region frames computed data. Keep data mapping, sorting, chart geometry, and formatting in components or utilities.',
	name: 'Data Surface',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'purpose',
			"'generic' | 'metric' | 'meter' | 'chart' | 'table'",
			'Semantic data region purpose.'
		),
		prop('layout', "'stack' | 'media'", 'Surface layout recipe.'),
		prop('title', 'ReactNode', 'Compact surface title.'),
		prop('description', 'ReactNode', 'Optional supporting copy.'),
		prop('actions', 'ReactNode', 'Header action slot.'),
		prop('footer', 'ReactNode', 'Footer metadata or paging slot.')
	]
} as const satisfies DataSurfaceMeta
