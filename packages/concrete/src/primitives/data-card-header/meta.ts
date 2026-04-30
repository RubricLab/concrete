import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DataCardHeaderMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const dataCardHeaderMeta = {
	category: 'data',
	description: 'Compact title, description, and trailing status header for data cards.',
	guidance:
		'Use DataCardHeader at the top of chart, table, diagram, and generated data panels. Keep state derivation and actions in the owning component; pass only rendered trailing controls or indicators into the end slot.',
	name: 'Data Card Header',
	pressure: ['product', 'generative'],
	props: [
		prop('title', 'ReactNode', 'Optional primary data surface title.'),
		prop('align', "'start' | 'center'", 'Cross-axis header alignment.', 'start'),
		prop('description', 'ReactNode', 'Optional supporting copy.'),
		prop('end', 'ReactNode', 'Trailing status, control, or action slot.'),
		prop('children', 'never', 'Header anatomy is fixed by title, description, and end slots.')
	]
} as const satisfies DataCardHeaderMeta
