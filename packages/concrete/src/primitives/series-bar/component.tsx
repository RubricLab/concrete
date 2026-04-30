import type { SVGAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type ChartBarRectProps = SVGAttributes<SVGRectElement>

export function ChartBar({ className, ...props }: ChartBarRectProps) {
	return <rect className={cn(concreteClassNames.chartBar, className)} {...props} />
}

export function ChartBarTrack({ className, ...props }: ChartBarRectProps) {
	return <rect className={cn(concreteClassNames.chartBarTrack, className)} {...props} />
}

export function ChartBarComparison({ className, ...props }: ChartBarRectProps) {
	return <rect className={cn(concreteClassNames.chartBarComparison, className)} {...props} />
}

export function ChartStackSegment({ className, ...props }: ChartBarRectProps) {
	return <rect className={cn(concreteClassNames.chartStackSegment, className)} {...props} />
}
