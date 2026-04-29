import { z } from 'zod/v4'
import { defineConcreteFoundation } from '../registry/definition'

export const motionTokenSchema = z
	.object({
		name: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const motionFoundationSchema = z
	.object({
		tokens: z.array(motionTokenSchema).default([])
	})
	.strict()

export const motionTokens = [
	{ name: 'duration-fast', value: '120ms' },
	{ name: 'duration', value: '180ms' },
	{ name: 'ease', value: 'cubic-bezier(0.2, 0, 0, 1)' }
] as const

export const motionFoundationDefinition = defineConcreteFoundation({
	category: 'foundation',
	controls: [],
	description: 'Short motion tokens for focus, hover, disclosure, and loading feedback.',
	guidance: 'Motion should clarify state changes without becoming decorative.',
	kind: 'foundation',
	name: 'Motion',
	pressure: ['product', 'generative'],
	props: [],
	renderExample: () => (
		<div style={{ display: 'flex', gap: 8 }}>
			<span
				style={{
					background: 'var(--concrete-sky)',
					borderRadius: 'var(--concrete-radius-pill)',
					display: 'inline-block',
					height: 10,
					width: 58
				}}
			/>
			<code>120ms / 180ms</code>
		</div>
	),
	schema: motionFoundationSchema,
	slug: 'motion',
	states: [{ description: 'Canonical motion tokens.', name: 'Default', query: 'default' }]
})
