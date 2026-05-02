import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ControlGroupMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const controlGroupMeta = {
	category: 'control',
	description: 'Grouped control primitive for segmented commands and compact tool sets.',
	guidance:
		'Use ControlGroup for command adjacency. The child controls own behavior; the group owns spacing and attachment.',
	name: 'ControlGroup',
	pressure: ['product', 'generative'],
	props: [
		prop('orientation', "'horizontal' | 'vertical'", 'Control flow direction.'),
		prop('attached', 'boolean', 'Removes internal gaps for segmented controls.'),
		prop(
			'density',
			"'compact' | 'comfortable' | 'editorial'",
			'Foundation-backed group rhythm.',
			'comfortable'
		),
		prop('label', 'string', 'Accessible group label.'),
		prop('content', 'ReactNode', 'Fallback render-input content.'),
		prop('children', 'ReactNode', 'Grouped controls.')
	]
} as const satisfies ControlGroupMeta
