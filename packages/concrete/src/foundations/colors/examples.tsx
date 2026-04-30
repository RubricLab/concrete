import { defineExamples } from '../../factories/createExamples'
import { colorTokens } from './schema'

export const colorsExamples = defineExamples({
	default: {
		description: 'Canonical color token ramp.',
		render: () => (
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
		)
	}
})
