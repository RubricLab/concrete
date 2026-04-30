import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ComposerSurfaceMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const composerSurfaceMeta = {
	category: 'control',
	description:
		'Rich composer shell anatomy for editor surface, footer rail, toolbar, and submit dock.',
	guidance:
		'Use ComposerSurface as the styled HTML vocabulary around a composer controller. Keep trigger detection, selection state, serialization, and submit behavior in the workflow component.',
	name: 'Composer Surface',
	pressure: ['product', 'generative'],
	props: [
		prop('disabled', 'boolean', 'Locks the composer shell and editor affordances.', 'false'),
		prop(
			'ComposerEditor.placeholder',
			'string',
			'Placeholder rendered by the contenteditable surface.'
		),
		prop('ComposerToolbar.children', 'ReactNode', 'Toolbar controls rendered in the footer rail.'),
		prop('ComposerSubmitDock.children', 'ReactNode', 'Submit and secondary action controls.'),
		prop('children', 'ReactNode', 'Composer rail, editor, footer, and popover children.')
	]
} as const satisfies ComposerSurfaceMeta
