import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Input } from '../input'
import { ScaleFrame } from './component'

export const scaleFrameExamples = defineExamples({
	default: {
		description: 'A larger control group scaled inside fixed preview bounds.',
		render: function renderDefault() {
			return (
				<ScaleFrame scale={0.72} surface="raised">
					<Button intent="sky">Ship interface</Button>
					<Input aria-label="Scale frame input" defaultValue="agent@example.com" />
				</ScaleFrame>
			)
		}
	},
	panel: {
		description: 'Static product surfaces keep their layout while fitting dense previews.',
		render: function renderPanel() {
			return (
				<ScaleFrame scale={0.58} surface="sunken">
					<strong>Latency p95</strong>
					<span>184ms</span>
					<p>Scaled output remains deterministic.</p>
				</ScaleFrame>
			)
		}
	}
})
