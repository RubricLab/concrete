import type { SVGAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type TargetLineProps = SVGAttributes<SVGGElement>

export function ChartTarget({ className, ...props }: TargetLineProps) {
	return <g className={cn(concreteClassNames.chartTarget, className)} {...props} />
}
