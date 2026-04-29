import { z } from 'zod/v4'
import { defineConcreteFoundation } from '../registry/definition'

export const colorTokenSchema = z
	.object({
		name: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const colorFoundationSchema = z
	.object({
		tokens: z.array(colorTokenSchema).default([])
	})
	.strict()

export const colorTokens = [
	{ name: 'canvas', value: 'var(--concrete-canvas)' },
	{ name: 'surface', value: 'var(--concrete-surface)' },
	{ name: 'ink-9', value: 'var(--concrete-ink-9)' },
	{ name: 'sky', value: 'var(--concrete-sky)' },
	{ name: 'terminal', value: 'var(--concrete-terminal)' },
	{ name: 'ultra', value: 'var(--concrete-ultra)' },
	{ name: 'error', value: 'var(--concrete-error)' }
] as const

export const colorsFoundationDefinition = defineConcreteFoundation({
	category: 'foundation',
	controls: [],
	description: 'Color tokens for ink, surfaces, accents, and the three Concrete signals.',
	guidance:
		'Use tokens directly through Concrete CSS variables; do not create component-local palettes.',
	kind: 'foundation',
	name: 'Colors',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: [],
	renderExample: () => (
		<div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
			{colorTokens.map(token => (
				<span
					key={token.name}
					style={{
						background: token.value,
						border: '1px solid var(--concrete-border)',
						borderRadius: 'var(--concrete-radius-3)',
						minHeight: 42
					}}
					title={token.name}
				/>
			))}
		</div>
	),
	schema: colorFoundationSchema,
	slug: 'colors',
	states: [{ description: 'Canonical color token ramp.', name: 'Default', query: 'default' }]
})
