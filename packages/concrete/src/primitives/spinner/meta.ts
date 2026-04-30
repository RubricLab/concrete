import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SpinnerMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const spinnerMeta = {
	category: 'feedback',
	description: 'Small loading indicator for command and inline pending states.',
	guidance:
		'Spinners are for short pending states. Prefer progress when completion is measurable and skeletons when layout is pending.',
	name: 'Spinner',
	pressure: ['product', 'generative'],
	props: [
		prop('size', 'number', 'Rendered SVG width and height.', '18'),
		prop('tone', "'default' | 'sky' | 'inverse'", 'Stroke tone.', 'default')
	]
} as const satisfies SpinnerMeta
