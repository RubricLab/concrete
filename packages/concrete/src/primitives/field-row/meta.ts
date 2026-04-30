import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type FieldRowMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const fieldRowMeta = {
	category: 'form',
	description: 'Dense label, description, meta, and control row for forms and settings.',
	guidance:
		'Use FieldRow for setting rows and compact form rows before preserving form-specific layout wrappers.',
	name: 'FieldRow',
	pressure: ['product', 'generative'],
	props: [
		prop('label', 'ReactNode', 'Primary row label.'),
		prop('description', 'ReactNode', 'Optional supporting copy.'),
		prop('meta', 'ReactNode', 'Optional right-side metadata.'),
		prop('control', 'ReactNode', 'Primary control slot.')
	]
} as const satisfies FieldRowMeta
