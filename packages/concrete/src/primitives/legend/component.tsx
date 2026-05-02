import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { Indicator, type IndicatorProps } from '../indicator'
import { cn } from '../utils'

export type LegendProps = HTMLAttributes<HTMLElement>

export function Legend({ children, className, ...props }: LegendProps) {
	return (
		<footer className={cn(concreteClassNames.legend, className)} {...props}>
			{children}
		</footer>
	)
}

export type LegendItemProps = Omit<IndicatorProps, 'children'> & {
	label: ReactNode
	value?: ReactNode
}

export function LegendItem({ className, label, value, ...props }: LegendItemProps) {
	return (
		<Indicator className={className} {...props}>
			{label}
			{value === undefined ? null : <span className={concreteClassNames.legendValue}>{value}</span>}
		</Indicator>
	)
}
