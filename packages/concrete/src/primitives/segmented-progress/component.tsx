import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { clampPercent, cn } from '../utils'

export type SegmentedProgressProps = HTMLAttributes<HTMLDivElement> & {
	segments: number
	value: number
}

export function SegmentedProgress({
	className,
	segments,
	value,
	...props
}: SegmentedProgressProps) {
	const safeSegments = Math.max(1, Math.floor(segments))
	const activeSegments = clampPercent((value / safeSegments) * 100) / (100 / safeSegments)

	return (
		<div
			aria-label={`${value} of ${safeSegments}`}
			className={cn(concreteClassNames.segmentedProgress, className)}
			role="img"
			{...props}
		>
			{Array.from({ length: safeSegments }, (_, index) => (
				<i data-active={index < activeSegments} key={index} />
			))}
		</div>
	)
}
