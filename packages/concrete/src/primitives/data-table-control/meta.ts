import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DataTableControlMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const dataTableControlMeta = {
	category: 'data',
	description: 'Compact toolbar controls for table search, filters, and row actions.',
	guidance:
		'Use DataTableControl primitives inside DataTable toolbars. Keep filtering state, selected-row gating, and action dispatch in the owning component.',
	name: 'Data Table Control',
	pressure: ['product'],
	props: [
		prop('DataTableToolbar.children', 'ReactNode', 'Search, filter, and action controls.'),
		prop(
			'DataTableSearch.inputProps',
			'InputHTMLAttributes<HTMLInputElement>',
			'Search input props.'
		),
		prop('DataTableFilterControl.label', 'ReactNode', 'Compact filter label.', undefined, true),
		prop(
			'DataTableFilterControl.selectProps',
			'SelectHTMLAttributes<HTMLSelectElement>',
			'Filter select props.'
		),
		prop('DataTableAction.icon', "'download' | 'inspect' | 'more'", 'Optional action icon.'),
		prop('DataTableAction.tone', 'DataTone', 'Optional data-tone utility class.')
	]
} as const satisfies DataTableControlMeta
