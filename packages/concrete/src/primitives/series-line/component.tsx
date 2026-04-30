import type { SVGAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type ChartSvgPathProps = SVGAttributes<SVGPathElement>

export function ChartArea({ className, ...props }: ChartSvgPathProps) {
	return <path className={cn(concreteClassNames.chartArea, className)} {...props} />
}

export function ChartLine({ className, ...props }: ChartSvgPathProps) {
	return <path className={cn(concreteClassNames.chartLine, className)} {...props} />
}
