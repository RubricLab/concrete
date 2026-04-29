import type { ReactNode } from 'react'
import { Card, Progress, ProgressRing } from '../primitives'
import { cn } from '../primitives/utils'
import { numberControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { type MeterProps, meterSchema } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { DataGridStage } from './data-fixtures'
import { normalizeRangeValue } from './data-geometry'
import { toProgressTone } from './data-tone'

const meterVariantValues = ['bar', 'ring'] as const
const dataToneValues = ['ink', 'muted', 'sky', 'terminal', 'ultra', 'error'] as const

export const meterComponentDefinition = defineConcreteComponent({
	category: 'data',
	component: Meter,
	controls: [
		selectControl('fixture', 'Fixture', 'bar', ['bar', 'ring', 'signal']),
		textControl('label', 'Label', 'Usage'),
		numberControl('value', 'Value', '72'),
		selectControl('variant', 'Variant', 'bar', meterVariantValues),
		selectControl('tone', 'Tone', 'sky', dataToneValues)
	],
	description: 'Progress summary card that composes Concrete linear and ring progress primitives.',
	guidance:
		'Meter is a bounded progress summary, not a charting framework. Use it for quotas, completion, utilization, and health summaries.',
	kind: 'component',
	name: 'Meter',
	pressure: ['product', 'generative'],
	props: [
		prop('label', 'string', 'Meter label shown in the card header.', undefined, true),
		prop('value', 'DataProgressValue', 'Bounded value object parsed at runtime.', undefined, true),
		prop('variant', "'bar' | 'ring'", 'Linear or circular meter rendering.', 'bar'),
		prop('tone', 'DataTone', 'Progress tone mapped to Concrete signals.', 'sky'),
		prop('target', 'number', 'Optional target value called out in the footer.'),
		prop('unit', 'string', 'Rendered value unit.', '%'),
		prop('description', 'string', 'Optional supporting text in the footer.'),
		prop('compact', 'boolean', 'Tighter rail/ring dimensions.', 'false')
	],
	renderExample: renderMeterExample,
	schema: meterSchema,
	slug: 'meter',
	states: states([
		['bar', 'Linear progress summary with target copy.'],
		['ring', 'Circular progress summary for compact scorecards.'],
		['signal', 'Terminal, ultra, and error signal meters.']
	])
})

function renderMeterExample(state = 'bar'): ReactNode {
	return (
		<DataGridStage>
			<Meter
				description="Workspace command budget"
				label="Usage"
				target={80}
				tone={state === 'signal' ? 'terminal' : 'sky'}
				value={{ max: 100, min: 0, value: 72 }}
				variant={state === 'ring' ? 'ring' : 'bar'}
			/>
			<Meter
				description="Policy confidence"
				label="Review"
				tone={state === 'signal' ? 'error' : 'ultra'}
				value={{ max: 100, min: 0, value: state === 'signal' ? 34 : 58 }}
				variant="ring"
			/>
		</DataGridStage>
	)
}

type ComponentShellProps = {
	className?: string
}

export function Meter({ className, ...props }: MeterProps & ComponentShellProps) {
	const parsedProps = meterSchema.parse(props)
	const normalizedValue = normalizeRangeValue(
		parsedProps.value.value,
		parsedProps.value.min,
		parsedProps.value.max
	)
	const percent = Math.round(normalizedValue * 100)
	const formattedValue =
		parsedProps.unit === '%' ? `${percent}%` : `${parsedProps.value.value}${parsedProps.unit}`

	return (
		<Card
			className={cn(
				concreteClassNames.meterCard,
				parsedProps.variant === 'ring' && concreteClassNames.meterRingCard,
				className
			)}
			variant="raised"
		>
			<header className={concreteClassNames.meterHeader}>
				<span>{parsedProps.label}</span>
				<b>{formattedValue}</b>
			</header>
			{parsedProps.variant === 'ring' ? (
				<ProgressRing
					size={parsedProps.compact ? 70 : 88}
					strokeWidth={parsedProps.compact ? 6 : 7}
					tone={toProgressTone(parsedProps.tone)}
					value={percent}
				/>
			) : (
				<Progress
					size={parsedProps.compact ? 'thin' : 'medium'}
					tone={toProgressTone(parsedProps.tone)}
					value={percent}
				/>
			)}
			{parsedProps.description || parsedProps.target !== undefined ? (
				<footer className={concreteClassNames.meterFooter}>
					{parsedProps.target !== undefined ? <span>Target {parsedProps.target}</span> : null}
					{parsedProps.description ? <span>{parsedProps.description}</span> : null}
				</footer>
			) : null}
		</Card>
	)
}
