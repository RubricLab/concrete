import { z } from 'zod/v4'
import { defineConcreteFoundation } from '../registry/definition'

export const spacingTokenSchema = z
	.object({
		name: z.string().min(1),
		value: z.number().int().positive()
	})
	.strict()

export const spacingFoundationSchema = z
	.object({
		tokens: z.array(spacingTokenSchema).default([])
	})
	.strict()

export const spacingTokens = [
	{ name: 'space-1', value: 4 },
	{ name: 'space-2', value: 8 },
	{ name: 'space-3', value: 12 },
	{ name: 'space-4', value: 16 },
	{ name: 'space-6', value: 24 },
	{ name: 'space-8', value: 32 }
] as const

export const spacingFoundationDefinition = defineConcreteFoundation({
	category: 'layout',
	controls: [],
	description: 'Compact spacing steps for dense but legible composition.',
	guidance:
		'Prefer smaller repeated steps over bespoke gaps; pressure comes from composition density.',
	kind: 'foundation',
	name: 'Spacing',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: [],
	renderExample: () => (
		<div style={{ display: 'grid', gap: 6 }}>
			{spacingTokens.map(token => (
				<span key={token.name} style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
					<i
						style={{
							background: 'var(--concrete-ink-9)',
							borderRadius: 2,
							display: 'inline-block',
							height: 8,
							width: token.value
						}}
					/>
					<code>{token.name}</code>
				</span>
			))}
		</div>
	),
	schema: spacingFoundationSchema,
	slug: 'spacing',
	states: [{ description: 'Canonical spacing steps.', name: 'Default', query: 'default' }]
})
