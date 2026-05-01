import { defineExamples } from '../../factories/createExamples'
import { Meter } from './component'

export const meterExamples = defineExamples({
	bar: {
		description: 'Linear progress summaries for scan-line budget rows.',
		render: () => renderBarMeterExample()
	},
	compact: {
		description: 'Compact meter cards for dense dashboard grids.',
		render: () => renderCompactMeterExample()
	},
	default: {
		description: 'Mixed meter scorecards for generated dashboard summaries.',
		render: () => renderMeterExample()
	},
	ring: {
		description: 'Circular progress summary for compact scorecards.',
		render: () => (
			<>
				<Meter
					description="Workspace command budget"
					label="Usage"
					target={80}
					intent="sky"
					value={{ max: 100, min: 0, value: 72 }}
					display="ring"
				/>
				<Meter
					description="Policy confidence"
					label="Review"
					intent="ultra"
					value={{ max: 100, min: 0, value: 58 }}
					display="ring"
				/>
			</>
		)
	},
	signal: {
		description: 'Terminal, ultra, and error signal meters.',
		render: () => (
			<>
				<Meter
					description="Workspace command budget"
					label="Usage"
					target={80}
					intent="terminal"
					value={{ max: 100, min: 0, value: 72 }}
				/>
				<Meter
					description="Policy confidence"
					label="Review"
					intent="error"
					value={{ max: 100, min: 0, value: 34 }}
					display="ring"
				/>
			</>
		)
	}
})

function renderBarMeterExample() {
	return (
		<>
			<Meter
				description="Workspace command budget"
				label="Usage"
				target={80}
				intent="sky"
				value={{ max: 100, min: 0, value: 72 }}
			/>
			<Meter
				description="Tool budget remaining"
				label="Tools"
				target={65}
				intent="terminal"
				value={{ max: 100, min: 0, value: 61 }}
			/>
		</>
	)
}

function renderCompactMeterExample() {
	return (
		<>
			<Meter
				compact
				description="Daily command budget"
				label="Usage"
				target={80}
				intent="sky"
				value={{ max: 100, min: 0, value: 72 }}
			/>
			<Meter
				compact
				description="Policy confidence"
				label="Review"
				intent="ultra"
				value={{ max: 100, min: 0, value: 58 }}
				display="ring"
			/>
		</>
	)
}

function renderMeterExample() {
	return (
		<>
			<Meter
				description="Workspace command budget"
				label="Usage"
				target={80}
				intent="sky"
				value={{ max: 100, min: 0, value: 72 }}
			/>
			<Meter
				description="Policy confidence"
				label="Review"
				intent="ultra"
				value={{ max: 100, min: 0, value: 58 }}
				display="ring"
			/>
		</>
	)
}
