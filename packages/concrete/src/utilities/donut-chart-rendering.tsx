import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../primitives/utils'
import type { DataPoint } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { getDonutStrokeWidth } from './chart-core-rendering'
import { createDonutSegments, formatPercent } from './data-geometry'
import { getDataToneClass } from './data-tone'

export function renderDonutChart(
	segments: readonly DataPoint[],
	centerLabel: string | undefined,
	showCenterLabel: boolean,
	thickness: 'medium' | 'thick' | 'thin'
): ReactNode {
	const renderedSegments = createDonutSegments(segments)

	if (renderedSegments.length === 0) {
		return <div className={concreteClassNames.chartMessage}>No data</div>
	}

	return (
		<div
			className={concreteClassNames.donutChart}
			data-thickness={thickness}
			style={{ '--donut-stroke-width': `${getDonutStrokeWidth(thickness)}px` } as CSSProperties}
		>
			<svg aria-hidden viewBox="0 0 120 120">
				<title>Donut chart</title>
				<circle className={concreteClassNames.donutTrack} cx="60" cy="60" r="42" />
				{renderedSegments.map((segment, index) => (
					<circle
						className={cn(concreteClassNames.donutSegment, getDataToneClass(segments[index]?.tone))}
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
				<div className={concreteClassNames.donutCenter}>
					<b>{centerLabel ?? formatPercent(renderedSegments[0]?.percent ?? 0)}</b>
					<span>{segments[0]?.label ?? 'Total'}</span>
				</div>
			) : null}
		</div>
	)
}
