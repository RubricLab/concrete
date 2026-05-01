import type { ReactNode } from 'react'
import { ChartMessage, DonutCenter, DonutPlot, DonutSegment, DonutTrack } from '../primitives'
import type { DataPoint } from '../schemas'
import { createDonutSegments, formatPercent } from './data-geometry'
import { getDataIntentClass } from './data-intent'

export function renderDonutChart(
	segments: readonly DataPoint[],
	centerLabel: string | undefined,
	showCenterLabel: boolean,
	thickness: 'medium' | 'thick' | 'thin'
): ReactNode {
	const renderedSegments = createDonutSegments(segments)

	if (renderedSegments.length === 0) {
		return <ChartMessage>No data</ChartMessage>
	}

	return (
		<DonutPlot thickness={thickness}>
			<svg aria-hidden viewBox="0 0 120 120">
				<title>Donut chart</title>
				<DonutTrack cx="60" cy="60" r="42" />
				{renderedSegments.map((segment, index) => (
					<DonutSegment
						className={getDataIntentClass(segments[index]?.intent)}
						cx="60"
						cy="60"
						key={segment.label}
						pathLength="100"
						r="42"
						strokeDasharray={segment.dashArray}
						strokeDashoffset={segment.dashOffset}
					/>
				))}
			</svg>
			{showCenterLabel ? (
				<DonutCenter
					label={segments[0]?.label ?? 'Total'}
					value={centerLabel ?? formatPercent(renderedSegments[0]?.percent ?? 0)}
				/>
			) : null}
		</DonutPlot>
	)
}
