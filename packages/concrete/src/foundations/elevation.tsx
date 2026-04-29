import { z } from 'zod/v4'
import { defineConcreteFoundation } from '../registry/definition'

export const elevationTokenSchema = z
	.object({
		name: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const elevationFoundationSchema = z
	.object({
		tokens: z.array(elevationTokenSchema).default([])
	})
	.strict()

export const elevationTokens = [
	{ name: 'shadow-1', value: 'var(--concrete-shadow-1)' },
	{ name: 'shadow-2', value: 'var(--concrete-shadow-2)' },
	{ name: 'shadow-3', value: 'var(--concrete-shadow-3)' }
] as const

export const elevationFoundationDefinition = defineConcreteFoundation({
	category: 'foundation',
	controls: [],
	description: 'Restrained shadows and borders for Concrete surfaces.',
	guidance: 'Prefer hairlines first; add shadow only when a surface must separate from its plane.',
	kind: 'foundation',
	name: 'Elevation',
	pressure: ['product', 'generative'],
	props: [],
	renderExample: () => (
		<div style={{ display: 'flex', gap: 10 }}>
			{elevationTokens.map(token => (
				<span
					key={token.name}
					style={{
						background: 'var(--concrete-surface)',
						border: '1px solid var(--concrete-border)',
						borderRadius: 'var(--concrete-radius-3)',
						boxShadow: token.value,
						height: 42,
						width: 64
					}}
				/>
			))}
		</div>
	),
	schema: elevationFoundationSchema,
	slug: 'elevation',
	states: [{ description: 'Canonical elevation steps.', name: 'Default', query: 'default' }]
})
