import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ComposerShellMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const composerShellMeta = {
	category: 'control',
	description:
		'Rich composer shell anatomy for editor surface, footer rail, toolbar, and submit dock.',
	guidance:
		'Use ComposerShell as the styled HTML vocabulary around a composer controller. Keep trigger detection, selection state, serialization, and submit behavior in the workflow component.',
	name: 'Composer Shell',
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
} as const satisfies ComposerShellMeta
