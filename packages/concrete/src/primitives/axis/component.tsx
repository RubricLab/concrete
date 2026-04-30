import type { SVGAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type ChartAxisLineProps = SVGAttributes<SVGLineElement>
export type ChartAxisTextProps = SVGAttributes<SVGTextElement>

export function ChartAxis({ className, ...props }: ChartAxisLineProps) {
	return <line className={cn(concreteClassNames.chartAxis, className)} {...props} />
}

export function ChartBaseline({ className, ...props }: ChartAxisLineProps) {
	return <line className={cn(concreteClassNames.chartBaseline, className)} {...props} />
}

export function ChartTickLabel({ className, ...props }: ChartAxisTextProps) {
	return <text className={cn(concreteClassNames.chartTickLabel, className)} {...props} />
}

export function ChartAxisLabel({ className, ...props }: ChartAxisTextProps) {
	return <text className={cn(concreteClassNames.chartAxisLabel, className)} {...props} />
}

export function ChartRowLabel({ className, ...props }: ChartAxisTextProps) {
	return <text className={cn(concreteClassNames.chartRowLabel, className)} {...props} />
}

export function ChartValueLabel({ className, ...props }: ChartAxisTextProps) {
	return <text className={cn(concreteClassNames.chartValueLabel, className)} {...props} />
}

export function ChartEndLabel({ className, ...props }: ChartAxisTextProps) {
	return <text className={cn(concreteClassNames.chartEndLabel, className)} {...props} />
}
