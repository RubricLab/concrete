import { defineExamples } from '../../factories/createExamples'

export const typographyExamples = defineExamples({
	default: {
		description: 'Canonical typography roles.',
		render: () => (
			<div style={{ display: 'grid', gap: 6 }}>
				<strong style={{ font: '700 var(--concrete-type-20) / 1.2 var(--concrete-font-sans)' }}>
					Interface hierarchy
				</strong>
				<span style={{ color: 'var(--concrete-foreground)', fontSize: 'var(--concrete-type-15)' }}>
					Dense product copy with calm rhythm.
				</span>
				<code style={{ fontFamily: 'var(--concrete-font-mono)' }}>ConcretePressure</code>
			</div>
		)
	}
})
