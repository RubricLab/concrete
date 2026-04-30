import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type FormLayoutMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const formLayoutMeta = {
	category: 'form',
	description: 'Form shell, section, grid, and settings row anatomy.',
	guidance:
		'Use FormLayout for product forms and settings panels that need compact shell, grouped sections, dense rows, and responsive field grids. Keep validation rules, submit behavior, disclosure, and overlay presentation in components.',
	name: 'Form Layout',
	pressure: ['product'],
	props: [
		prop('FormLayoutShell.title', 'ReactNode', 'Primary form title.', undefined, true),
		prop('FormLayoutShell.description', 'ReactNode', 'Optional supporting form copy.'),
		prop('FormLayoutShell.actions', 'ReactNode', 'Header action slot.'),
		prop('FormLayoutShell.footer', 'ReactNode', 'Footer action slot.'),
		prop('FormLayoutShell.compact', 'boolean', 'Uses tighter shell spacing.', 'false'),
		prop(
			'FormLayoutShell.variant',
			"'panel' | 'modal' | 'drawer'",
			'Adjusts shell elevation for its presentation context.',
			'panel'
		),
		prop('FormLayoutGrid.columns', '1 | 2 | 3', 'Responsive field grid column count.', '2'),
		prop('FormLayoutRow.label', 'ReactNode', 'Settings/form row label.', undefined, true),
		prop('FormLayoutRow.control', 'ReactNode', 'Trailing control slot.')
	]
} as const satisfies FormLayoutMeta
