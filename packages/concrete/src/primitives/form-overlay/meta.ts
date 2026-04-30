import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type FormOverlayMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const formOverlayMeta = {
	category: 'form',
	description: 'Dialog and drawer overlay placement primitives for form workflows.',
	guidance:
		'Use FormOverlay for form presentation chrome around a FormLayout shell. Keep open state, dismissal, focus trapping, routing, and submission behavior in the owning component.',
	name: 'Form Overlay',
	pressure: ['product'],
	props: [
		prop(
			'FormOverlayRoot.presentation',
			"'inline' | 'fixed'",
			'Chooses inline preview or viewport-fixed presentation.',
			'inline'
		),
		prop('FormOverlayRoot.type', "'dialog' | 'drawer'", 'Sets placement geometry.', 'dialog'),
		prop('FormOverlayRoot.size', "'compact' | 'default' | 'wide'", 'Dialog width intent.', 'default'),
		prop('FormOverlayRoot.side', "'left' | 'right'", 'Drawer side.', 'right'),
		prop('FormOverlayDialog.modal', 'boolean', 'Sets aria-modal for fixed dialog shells.', 'false'),
		prop('FormOverlayDrawer.modal', 'boolean', 'Sets aria-modal for fixed drawer shells.', 'false')
	]
} as const satisfies FormOverlayMeta
