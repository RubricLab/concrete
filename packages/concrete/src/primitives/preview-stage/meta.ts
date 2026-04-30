import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type PreviewStageMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const previewStageMeta = {
	category: 'layout',
	description:
		'Token-owned preview constraint for docs renderers, generated panels, and compact demos.',
	guidance:
		'Use PreviewStage at the docs/rendering layer when a composition needs a neutral width constraint or simple stack/grid staging. Do not use it as generic chrome inside other item examples, repeated cards, or component behavior.',
	name: 'Preview Stage',
	pressure: ['product', 'educational'],
	props: [
		prop(
			'width',
			"'control' | 'media' | 'search' | 'feedback' | 'message' | 'data' | 'form' | 'composer' | 'full'",
			'Token-owned width family.',
			'full'
		),
		prop('layout', "'block' | 'stack' | 'grid'", 'Neutral staging layout.', 'block')
	]
} as const satisfies PreviewStageMeta
