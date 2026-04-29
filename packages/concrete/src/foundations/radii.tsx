import { z } from 'zod/v4'
import { defineConcreteFoundation } from '../registry/definition'

export const radiusTokenSchema = z
	.object({
		name: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const radiiFoundationSchema = z
	.object({
		tokens: z.array(radiusTokenSchema).default([])
	})
	.strict()

export const radiusTokens = [
	{ name: 'radius-2', value: '4px' },
	{ name: 'radius-3', value: '6px' },
	{ name: 'radius-4', value: '10px' },
	{ name: 'radius-5', value: '14px' },
	{ name: 'radius-pill', value: '9999px' }
] as const

export const radiiFoundationDefinition = defineConcreteFoundation({
	category: 'foundation',
	controls: [],
	description: 'Tight corner tokens for calm product surfaces.',
	guidance: 'Use small radii by default; reserve pill radius for explicit chips and badges.',
	kind: 'foundation',
	name: 'Radii',
	pressure: ['product', 'generative', 'educational'],
	props: [],
	renderExample: () => (
		<div style={{ display: 'flex', gap: 8 }}>
			{radiusTokens.map(token => (
				<span
					key={token.name}
					style={{
						background: 'var(--concrete-raised)',
						border: '1px solid var(--concrete-border)',
						borderRadius: token.value,
						height: 34,
						width: 52
					}}
				/>
			))}
		</div>
	),
	schema: radiiFoundationSchema,
	slug: 'radii',
	states: [{ description: 'Canonical radius steps.', name: 'Default', query: 'default' }]
})
