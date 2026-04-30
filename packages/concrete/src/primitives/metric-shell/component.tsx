import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { Card, type CardProps } from '../card'
import { ProgressRing, type ProgressRingProps } from '../progress'
import { Sparkline, type SparklineProps } from '../sparkline'
import { cn } from '../utils'

export type MetricShellKind = 'meter' | 'metric'

export type MetricShellProps = Omit<CardProps, 'description' | 'title' | 'variant'> & {
	compact?: boolean | undefined
	kind?: MetricShellKind | undefined
	ring?: boolean | undefined
}

export function MetricShell({
	children,
	className,
	compact = false,
	kind = 'metric',
	ring = false,
	...props
}: MetricShellProps) {
	return (
		<Card
			className={cn(
				kind === 'metric' && concreteClassNames.metricCard,
				kind === 'metric' && compact && concreteClassNames.metricCardCompact,
				kind === 'meter' && concreteClassNames.meterCard,
				kind === 'meter' && ring && concreteClassNames.meterRingCard,
				className
			)}
			variant="raised"
			{...props}
		>
			{children}
		</Card>
	)
}

export type MetricHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
	end?: ReactNode
	kind?: MetricShellKind | undefined
	label: ReactNode
	value?: ReactNode
}

export function MetricHeader({
	className,
	end,
	kind = 'metric',
	label,
	value,
	...props
}: MetricHeaderProps) {
	return (
		<header
			className={cn(
				kind === 'metric' ? concreteClassNames.metricHeader : concreteClassNames.meterHeader,
				className
			)}
			{...props}
		>
			<span className={kind === 'metric' ? concreteClassNames.metricLabel : undefined}>{label}</span>
			{value === undefined ? end : <b>{value}</b>}
		</header>
	)
}

export type MetricDescriptionProps = HTMLAttributes<HTMLParagraphElement>

export function MetricDescription({ children, className, ...props }: MetricDescriptionProps) {
	return (
		<p className={cn(concreteClassNames.metricDescription, className)} {...props}>
			{children}
		</p>
	)
}

export type MetricFooterProps = HTMLAttributes<HTMLElement> & {
	end?: ReactNode
	start?: ReactNode
}

export function MetricFooter({ children, className, end, start, ...props }: MetricFooterProps) {
	return (
		<footer className={cn(concreteClassNames.meterFooter, className)} {...props}>
			{children ?? (
				<>
					{start ? <span>{start}</span> : null}
					{end ? <span>{end}</span> : null}
				</>
			)}
		</footer>
	)
}

export type MetricSparklineProps = SparklineProps

export function MetricSparkline({ className, ...props }: MetricSparklineProps) {
	return <Sparkline className={cn(concreteClassNames.metricSparkline, className)} {...props} />
}

export type MetricProgressRingProps = Omit<ProgressRingProps, 'size' | 'strokeWidth'> & {
	compact?: boolean | undefined
}

export function MetricProgressRing({
	className,
	compact = false,
	...props
}: MetricProgressRingProps) {
	return (
		<ProgressRing
			className={className}
			size={compact ? 'var(--concrete-size-meter-ring-compact)' : 'var(--concrete-size-meter-ring)'}
			strokeWidth={
				compact
					? 'var(--concrete-size-meter-ring-stroke-compact)'
					: 'var(--concrete-size-meter-ring-stroke)'
			}
			{...props}
		/>
	)
}
