import { defineExamples } from '../../factories/createExamples'
import { spacingTokens } from './schema'

export const spacingExamples = defineExamples({
	default: {
		description: 'Canonical spacing steps.',
		render: () => (
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
		)
	}
})
