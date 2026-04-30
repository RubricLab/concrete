import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Delta } from '../delta'
import { ProgressRing } from '../progress'
import { Stat } from '../stat'
import { Text } from '../text'
import { DataSurface } from './component'

export const dataSurfaceExamples = defineExamples({
	default: {
		description: 'Compact generated-output surface.',
		render: () => (
			<DataSurface description="Validated against the active schema." title="Run quality">
				<Stat delta={<Delta intent="positive" value="+8.4%" />} value="97.2" variant="display" />
			</DataSurface>
		)
	},
	media: {
		description: 'Media layout for ring or visual summaries.',
		render: () => (
			<DataSurface layout="media" meta="84%" purpose="meter" title="Coverage">
				<ProgressRing tone="sky" value={84} />
				<Text purpose="caption" tone="muted">
					Target 80
				</Text>
			</DataSurface>
		)
	},
	toolbar: {
		description: 'Header action slot for data controls.',
		render: () => (
			<DataSurface actions={<Button size="small">Export</Button>} purpose="table" title="Runs">
				<Text tone="muted">1,284 rows indexed.</Text>
			</DataSurface>
		)
	}
})
