import { DataSurface, Progress, ProgressRing } from '../../primitives'
import { Text } from '../../primitives/text'
import { type MeterProps, meterSchema } from '../../schemas'
import { normalizeRangeValue } from '../../utilities/data-geometry'
import { toProgressIntent } from '../../utilities/data-intent'

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
	const formattedTarget =
		parsedProps.target === undefined
			? undefined
			: formatMeterValue(parsedProps.target, parsedProps.unit)
	const formattedValue = formatMeterValue(
		parsedProps.unit === '%' ? percent : parsedProps.value.value,
		parsedProps.unit
	)
	const footer =
		parsedProps.description || parsedProps.target !== undefined ? (
			<>
				{formattedTarget ? (
					<Text purpose="caption" intent="muted">
						Target {formattedTarget}
					</Text>
				) : null}
				{parsedProps.description ? (
					<Text purpose="caption" intent="muted">
						{parsedProps.description}
					</Text>
				) : null}
			</>
		) : undefined

	return (
		<DataSurface
			className={className}
			compact={parsedProps.compact}
			footer={footer}
			layout={parsedProps.display === 'ring' ? 'media' : 'stack'}
			meta={formattedValue}
			purpose="meter"
			title={parsedProps.label}
		>
			{parsedProps.display === 'ring' ? (
				<ProgressRing
					density={parsedProps.compact ? 'compact' : 'comfortable'}
					intent={toProgressIntent(parsedProps.intent)}
					value={percent}
				/>
			) : (
				<Progress
					density={parsedProps.compact ? 'compact' : 'comfortable'}
					intent={toProgressIntent(parsedProps.intent)}
					value={percent}
				/>
			)}
		</DataSurface>
	)
}

function formatMeterValue(value: number, unit: string): string {
	switch (unit) {
		case '%':
			return `${value}%`
		default:
			return `${value}${unit}`
	}
}
