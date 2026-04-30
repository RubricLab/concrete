import { DataSurface, Progress, ProgressRing } from '../../primitives'
import { Text } from '../../primitives/text'
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
	const footer =
		parsedProps.description || parsedProps.target !== undefined ? (
			<>
				{parsedProps.target !== undefined ? (
					<Text purpose="caption" tone="muted">
						Target {parsedProps.target}
					</Text>
				) : null}
				{parsedProps.description ? (
					<Text purpose="caption" tone="muted">
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
			layout={parsedProps.variant === 'ring' ? 'media' : 'stack'}
			meta={formattedValue}
			purpose="meter"
			title={parsedProps.label}
		>
			{parsedProps.variant === 'ring' ? (
				<ProgressRing tone={toProgressTone(parsedProps.tone)} value={percent} />
			) : (
				<Progress
					size={parsedProps.compact ? 'thin' : 'medium'}
					tone={toProgressTone(parsedProps.tone)}
					value={percent}
				/>
			)}
		</DataSurface>
	)
}
