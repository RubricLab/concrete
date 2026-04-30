import { defineExamples } from '../../factories/createExamples'
import { textureTokens } from './schema'

export const texturesExamples = defineExamples({
	default: {
		description: 'Canonical texture variants.',
		render: () => (
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
		)
	}
})
