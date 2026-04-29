import { z } from 'zod/v4'
import { defineConcreteFoundation } from '../registry/definition'

export const textureFoundationSchema = z
	.object({
		variant: z.enum(['dots', 'lattice', 'lines']).default('lattice')
	})
	.strict()

export const textureTokens = ['lattice', 'dots', 'lines'] as const

export const texturesFoundationDefinition = defineConcreteFoundation({
	category: 'foundation',
	controls: [],
	description: 'Quiet texture grounds for diagrams, editorial frames, and educational examples.',
	guidance: 'Use texture as structure, never as decorative noise.',
	kind: 'foundation',
	name: 'Textures',
	pressure: ['editorial', 'educational'],
	props: [],
	renderExample: () => (
		<div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
			{textureTokens.map(token => (
				<span
					key={token}
					style={{
						background: `var(--concrete-${token})`,
						border: '1px solid var(--concrete-border)',
						borderRadius: 'var(--concrete-radius-3)',
						minHeight: 42
					}}
				/>
			))}
		</div>
	),
	schema: textureFoundationSchema,
	slug: 'textures',
	states: [{ description: 'Canonical texture variants.', name: 'Default', query: 'default' }]
})
