import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type TooltipMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const tooltipMeta = {
	category: 'feedback',
	description: 'Dark inverse hint surface for focused labels.',
	guidance:
		'Tooltips name unfamiliar controls or add short context. Do not put workflow instructions or long content in them.',
	name: 'Tooltip',
	pressure: ['product'],
	props: [
		prop('content', 'ReactNode', 'Tooltip body rendered in the floating surface.'),
		prop('placement', "'top' | 'right' | 'bottom' | 'left'", 'Floating surface placement.', 'top'),
		prop(
			'forceOpen',
			'boolean',
			'Keeps the tooltip visible for documentation and screenshots.',
			'false'
		),
		prop('shortcut', 'readonly string[]', 'Optional keycaps inside the tooltip.'),
		prop('children', 'ReactNode', 'Tooltip anchor.')
	]
} as const satisfies TooltipMeta
