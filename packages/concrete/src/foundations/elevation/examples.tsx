import { defineExamples } from '../../factories/createExamples'
import { elevationTokens } from './schema'

export const elevationExamples = defineExamples({
	default: {
		description: 'Canonical elevation steps.',
		render: () => (
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
		)
	}
})
