import { Card, Progress, ProgressRing } from '../../primitives'
import { cn } from '../../primitives/utils'
import { type MeterProps, meterSchema } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
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
