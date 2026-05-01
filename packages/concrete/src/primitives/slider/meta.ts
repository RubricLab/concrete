import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SliderMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const sliderMeta = {
	category: 'form',
	description: 'Range input for scalar tuning without custom interaction code.',
	guidance: 'Slider is for approximate scalar tuning; use numeric inputs for exact values.',
	name: 'Slider',
	pressure: ['product'],
	props: [
		prop('min', 'number', 'Native minimum.'),
		prop('max', 'number', 'Native maximum.'),
		prop('step', 'number', 'Native step.'),
		prop('defaultValue', 'number', 'Uncontrolled value.'),
		prop('value', 'number', 'Controlled value.'),
		prop('intent', "'default' | 'sky'", 'Track and thumb intent.', 'default')
	]
} as const satisfies SliderMeta
