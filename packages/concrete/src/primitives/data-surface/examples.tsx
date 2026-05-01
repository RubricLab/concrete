import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Delta } from '../delta'
import { ProgressRing } from '../progress-ring'
import { Stat } from '../stat'
import { Text } from '../text'
import { DataSurface } from './component'

export const dataSurfaceExamples = defineExamples({
	default: {
		description: 'Compact generated-output surface.',
		render: () => (
			<DataSurface description="Validated against the active schema." title="Run quality">
				<Stat delta={<Delta intent="positive" value="+8.4%" />} purpose="display" value="97.2" />
			</DataSurface>
		)
	},
	media: {
		description: 'Media layout for ring or visual summaries.',
		render: () => (
			<DataSurface layout="media" meta="84%" purpose="meter" title="Coverage">
				<ProgressRing intent="sky" value={84} />
				<Text purpose="caption" intent="muted">
					Target 80
				</Text>
			</DataSurface>
		)
	},
	toolbar: {
		description: 'Header action slot for data controls.',
		render: () => (
			<DataSurface actions={<Button density="small">Export</Button>} purpose="table" title="Runs">
				<Text intent="muted">1,284 rows indexed.</Text>
			</DataSurface>
		)
	}
})
