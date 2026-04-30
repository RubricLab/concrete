import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Spinner } from './component'

export const spinnerExamples = defineExamples({
	default: {
		description: 'Default, sky, and inverse spinners.',
		render: () => (
			<Frame>
				<Spinner size={14} />
				<Spinner size={18} tone="sky" />
				<span style={{ background: 'var(--concrete-ink-9)', borderRadius: 999, padding: '6px 10px' }}>
					<Spinner size={12} tone="inverse" />
				</span>
			</Frame>
		)
	},
	tiny: {
		description: 'Small inline pending indicator.',
		render: () => (
			<Frame>
				<Spinner size={12} />
				<Spinner size={18} tone="sky" />
				<span style={{ background: 'var(--concrete-ink-9)', borderRadius: 999, padding: '6px 10px' }}>
					<Spinner size={12} tone="inverse" />
				</span>
			</Frame>
		)
	}
})
