import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type AlertMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const alertMeta = {
	category: 'feedback',
	description: 'Inline or panel-level status message with icon, copy, and action slot.',
	guidance:
		'Use Alert for immediate feedback. Aggregate issue collections belong in ValidationList or workflow components.',
	name: 'Alert',
	pressure: ['product', 'generative'],
	props: [
		prop('status', 'FieldStatus', 'Shared field status.'),
		prop('title', 'ReactNode', 'Primary message.'),
		prop('children', 'ReactNode', 'Optional details.'),
		prop('action', 'ReactNode', 'Optional action slot.')
	]
} as const satisfies AlertMeta
