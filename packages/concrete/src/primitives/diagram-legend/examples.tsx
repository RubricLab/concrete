import { defineExamples } from '../../factories/createExamples'
import { DiagramLegend } from './component'

export const diagramLegendExamples = defineExamples({
	custom: {
		description: 'Custom legend subset for generated explainers.',
		render: () => (
			<>
				<DiagramLegend
					items={[
						{ kind: 'compute', label: 'Model step' },
						{ kind: 'event', label: 'Streaming event' },
						{ kind: 'reference', label: 'Retrieved context' }
					]}
				/>
			</>
		)
	},
	default: {
		description: 'Canvas grammar legend.',
		render: () => (
			<>
				<DiagramLegend />
			</>
		)
	}
})
