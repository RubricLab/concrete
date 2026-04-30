import {
	MetricFooter,
	MetricHeader,
	MetricProgressRing,
	MetricShell,
	Progress
} from '../../primitives'
import { type MeterProps, meterSchema } from '../../schemas'
import { normalizeRangeValue } from '../../utilities/data-geometry'
import { toProgressTone } from '../../utilities/data-tone'

type ComponentShellProps = {
	className?: string
}

export type { MeterProps } from '../../schemas'

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
		<MetricShell className={className} kind="meter" ring={parsedProps.variant === 'ring'}>
			<MetricHeader kind="meter" label={parsedProps.label} value={formattedValue} />
			{parsedProps.variant === 'ring' ? (
				<MetricProgressRing
					compact={parsedProps.compact}
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
				<MetricFooter
					end={parsedProps.description}
					start={parsedProps.target !== undefined ? `Target ${parsedProps.target}` : undefined}
				/>
			) : null}
		</MetricShell>
	)
}
