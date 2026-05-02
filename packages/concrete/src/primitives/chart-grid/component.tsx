import type { SVGAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type ChartGridGroupProps = SVGAttributes<SVGGElement>
export type ChartPlotBackgroundProps = SVGAttributes<SVGRectElement>

export function ChartGrid({ className, ...props }: ChartGridGroupProps) {
	return <g className={cn(concreteClassNames.chartGrid, className)} {...props} />
}

export function ChartPlotBackground({ className, ...props }: ChartPlotBackgroundProps) {
	return <rect className={cn(concreteClassNames.chartPlotBackground, className)} {...props} />
}
