import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DiagramControlsMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const diagramControlsMeta = {
	category: 'control',
	description: 'Compact zoom and viewport controls for diagram surfaces.',
	guidance:
		'Use DiagramControls inside diagram footers and compact graph headers. The primitive owns button anatomy and density; the owning component owns zoom math, panning state, and reset behavior.',
	name: 'Diagram Controls',
	pressure: ['product', 'educational'],
	props: [
		prop('zoom', 'number', 'Current zoom value displayed as a percentage.', '1'),
		prop(
			'zoomLabel',
			'ReactNode',
			'Optional custom readout for non-percent diagram scales.',
			undefined,
			true
		),
		prop('disabled', 'boolean', 'Whether zoom buttons should be disabled.', 'false'),
		prop('onZoomIn', '() => void', 'Zoom-in callback.', undefined, true),
		prop('onZoomOut', '() => void', 'Zoom-out callback.', undefined, true),
		prop('onReset', '() => void', 'Viewport reset callback.', undefined, true)
	]
} as const satisfies DiagramControlsMeta
