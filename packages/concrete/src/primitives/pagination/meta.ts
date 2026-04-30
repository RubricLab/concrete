import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type PaginationMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const paginationMeta = {
	category: 'data',
	description: 'Compact pagination footer with page, selection, and next/previous controls.',
	guidance:
		'Use Pagination below pageable regions. Keep page calculations, page size, and controlled pagination state in the owning component.',
	name: 'Pagination',
	pressure: ['product'],
	props: [
		prop('page', 'ReactNode', 'Current page display value.', undefined, true),
		prop('pageCount', 'ReactNode', 'Total page display value.', undefined, true),
		prop('selectedCount', 'ReactNode', 'Selected row count.', '0'),
		prop('previousDisabled', 'boolean', 'Disables previous-page control.', 'false'),
		prop('nextDisabled', 'boolean', 'Disables next-page control.', 'false'),
		prop('onPrevious', '() => void', 'Previous-page handler.'),
		prop('onNext', '() => void', 'Next-page handler.')
	]
} as const satisfies PaginationMeta
