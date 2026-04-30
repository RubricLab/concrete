import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { Indicator, type IndicatorProps } from '../indicator'
import { cn } from '../utils'

export type ChartLegendProps = HTMLAttributes<HTMLElement>

export function ChartLegend({ children, className, ...props }: ChartLegendProps) {
	return (
		<footer className={cn(concreteClassNames.chartLegend, className)} {...props}>
			{children}
		</footer>
	)
}

export type ChartLegendItemProps = Omit<IndicatorProps, 'children'> & {
	label: ReactNode
	value?: ReactNode
}

export function ChartLegendItem({ className, label, value, ...props }: ChartLegendItemProps) {
	return (
		<Indicator className={className} {...props}>
			{label}
			{value === undefined ? null : (
				<span className={concreteClassNames.chartLegendValue}>{value}</span>
			)}
		</Indicator>
	)
}
