import type { z } from 'zod/v4'
import { z as zod } from 'zod/v4'

const featureCardIconValues = [
	'bar-chart-3',
	'code',
	'command',
	'image',
	'panel-left',
	'panel-right',
	'square',
	'sliders-horizontal',
	'sparkles',
	'zap'
] as const

export const featureCardSchema = zod
	.object({
		accent: zod.enum(['ink', 'sky', 'terminal', 'ultra']).default('ink'),
		description: zod.string().default('A compact feature for a system concept.'),
		icon: zod.enum(featureCardIconValues).default('sparkles'),
		interactive: zod.boolean().default(true),
		title: zod.string().default('Feature')
	})
	.strict()

export { featureCardSchema as featureCardPropsSchema }
export type FeatureCardInput = z.input<typeof featureCardSchema>
export type FeatureCardValue = z.output<typeof featureCardSchema>
