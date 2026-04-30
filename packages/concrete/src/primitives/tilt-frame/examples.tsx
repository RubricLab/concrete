import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Input } from '../input'
import { Slider } from '../slider'
import { Switch } from '../switch'
import { TiltFrame } from './component'

export const tiltFrameExamples = defineExamples({
	default: {
		description: 'Stable container for live controls with subtle pointer depth.',
		render: () => (
			<TiltFrame>
				<Button size="small" variant="sky">
					Primary
				</Button>
				<Input aria-label="Tilt frame input" defaultValue="Composable control" />
				<Slider aria-label="Tilt frame slider" defaultValue={58} tone="sky" />
				<Switch checked label="Ready" readOnly />
			</TiltFrame>
		)
	},
	surface: {
		description: 'Sunken depth keeps the highlight quiet inside dense product surfaces.',
		render: () => (
			<TiltFrame surface="sunken">
				<strong>Generated panel</strong>
				<p>One focused output, returned from typed props.</p>
			</TiltFrame>
		)
	}
})
