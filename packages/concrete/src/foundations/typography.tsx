import { z } from 'zod/v4'
import { defineConcreteFoundation } from '../registry/definition'

export const typographyTokenSchema = z
	.object({
		family: z.string().min(1),
		name: z.string().min(1),
		size: z.string().min(1)
	})
	.strict()

export const typographyFoundationSchema = z
	.object({
		tokens: z.array(typographyTokenSchema).default([])
	})
	.strict()

export const typographyTokens = [
	{ family: 'display', name: 'display', size: '120px' },
	{ family: 'display', name: 'hero', size: '72px' },
	{ family: 'sans', name: 'h1', size: '48px' },
	{ family: 'sans', name: 'h2', size: '32px' },
	{ family: 'sans', name: 'body', size: '15px' },
	{ family: 'mono', name: 'mono', size: '13px' }
] as const

export const typographyFoundationDefinition = defineConcreteFoundation({
	category: 'typography',
	controls: [],
	description:
		'Type families, scale, line height, and tracking for Concrete reading and product UI.',
	guidance: 'Use Jakarta for interface density and reserve Fraunces for editorial display moments.',
	kind: 'foundation',
	name: 'Typography',
	pressure: ['product', 'editorial', 'educational'],
	props: [],
	renderExample: () => (
		<div style={{ display: 'grid', gap: 6 }}>
			<strong style={{ font: '700 var(--concrete-type-20) / 1.2 var(--concrete-font-sans)' }}>
				Interface hierarchy
			</strong>
			<span style={{ color: 'var(--concrete-foreground)', fontSize: 'var(--concrete-type-15)' }}>
				Dense product copy with calm rhythm.
			</span>
			<code style={{ fontFamily: 'var(--concrete-font-mono)' }}>ConcretePressure</code>
		</div>
	),
	schema: typographyFoundationSchema,
	slug: 'typography',
	states: [{ description: 'Canonical typography roles.', name: 'Default', query: 'default' }]
})
