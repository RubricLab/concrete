import type { SVGAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type SeriesPointCircleProps = SVGAttributes<SVGCircleElement>

export function ChartPoint({ className, ...props }: SeriesPointCircleProps) {
	return <circle className={cn(concreteClassNames.chartPoint, className)} {...props} />
}

export function ChartEndpoint({ className, ...props }: SeriesPointCircleProps) {
	return <circle className={cn(concreteClassNames.chartEndpoint, className)} {...props} />
}
