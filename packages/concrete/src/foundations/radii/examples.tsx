import { defineExamples } from '../../factories/createExamples'
import { radiusTokens } from './schema'

export const radiiExamples = defineExamples({
	default: {
		description: 'Canonical radius steps.',
		render: () => (
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
		)
	}
})
