import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type FeatureCardMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const featureCardMeta = {
	category: 'surface',
	description: 'Compact feature callout for system concepts and product affordances.',
	guidance:
		'FeatureCard is for short, connected ideas. Prefer a small set with parallel copy over isolated marketing cards.',
	name: 'FeatureCard',
	pressure: ['editorial', 'product', 'generative'],
	props: [
		prop('title', 'ReactNode', 'Feature title.'),
		prop('description', 'ReactNode', 'One-line supporting copy.'),
		prop('icon', 'IconName', 'Concrete icon name.', 'sparkles'),
		prop('accent', "'ink' | 'sky' | 'terminal' | 'ultra'", 'Small icon accent.', 'ink'),
		prop('interactive', 'boolean', 'Enables subtle TiltFrame depth.', 'true')
	]
} as const satisfies FeatureCardMeta
