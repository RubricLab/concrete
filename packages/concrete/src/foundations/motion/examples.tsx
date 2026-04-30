import { defineExamples } from '../../factories/createExamples'

export const motionExamples = defineExamples({
	default: {
		description: 'Canonical motion tokens.',
		render: () => (
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
		)
	}
})
