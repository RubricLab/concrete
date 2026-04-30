import type { CSSProperties, HTMLAttributes, ReactNode, SVGAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { Card, type CardProps } from '../card'
import { cn } from '../utils'

export type ChartSurfaceKind = 'raised' | 'sunken' | 'transparent'
export type ChartSurfaceVariant = 'area' | 'bar' | 'donut' | 'heatmap' | 'line' | 'stacked-bar'
export type DonutThickness = 'medium' | 'thick' | 'thin'

type ChartCustomProperties = CSSProperties & {
	'--chart-height'?: string
	'--donut-stroke-width'?: string
	'--heatmap-column-count'?: string
	'--heatmap-intensity'?: string
}

export type ChartShellProps = Omit<CardProps, 'variant'>

export function ChartShell({ className, ...props }: ChartShellProps) {
	return <Card className={cn(concreteClassNames.chartCard, className)} variant="raised" {...props} />
}

export type ChartSurfaceProps = HTMLAttributes<HTMLDivElement> & {
	height?: number | string | undefined
	surface?: ChartSurfaceKind | undefined
	variant?: ChartSurfaceVariant | undefined
}

export function ChartSurface({
	className,
	height,
	style,
	surface = 'raised',
	variant = 'line',
	...props
}: ChartSurfaceProps) {
	return (
		<div
			className={cn(concreteClassNames.chartSurface, className)}
			data-surface={surface}
			data-variant={variant}
			style={withChartHeight(style, height)}
			{...props}
		/>
	)
}

export type ChartMessageProps = HTMLAttributes<HTMLDivElement>

export function ChartMessage({ children, className, ...props }: ChartMessageProps) {
	return (
		<div className={cn(concreteClassNames.chartMessage, className)} {...props}>
			{children}
		</div>
	)
}

export type ChartSvgProps = SVGAttributes<SVGSVGElement> & {
	title?: ReactNode
}

export function ChartSvg({ children, className, title, ...props }: ChartSvgProps) {
	return (
		<svg aria-hidden className={cn(concreteClassNames.chartSvg, className)} {...props}>
			<title>{title ?? 'Chart'}</title>
			{children}
		</svg>
	)
}

export type ChartSvgGroupProps = SVGAttributes<SVGGElement>
export type ChartSvgRectProps = SVGAttributes<SVGRectElement>
export type ChartSvgLineProps = SVGAttributes<SVGLineElement>
export type ChartSvgTextProps = SVGAttributes<SVGTextElement>
export type ChartSvgPathProps = SVGAttributes<SVGPathElement>
export type ChartSvgCircleProps = SVGAttributes<SVGCircleElement>

export function ChartGrid({ className, ...props }: ChartSvgGroupProps) {
	return <g className={cn(concreteClassNames.chartGrid, className)} {...props} />
}

export function ChartPlotBackground({ className, ...props }: ChartSvgRectProps) {
	return <rect className={cn(concreteClassNames.chartPlotBackground, className)} {...props} />
}

export function ChartAxis({ className, ...props }: ChartSvgLineProps) {
	return <line className={cn(concreteClassNames.chartAxis, className)} {...props} />
}

export function ChartBaseline({ className, ...props }: ChartSvgLineProps) {
	return <line className={cn(concreteClassNames.chartBaseline, className)} {...props} />
}

export function ChartTickLabel({ className, ...props }: ChartSvgTextProps) {
	return <text className={cn(concreteClassNames.chartTickLabel, className)} {...props} />
}

export function ChartAxisLabel({ className, ...props }: ChartSvgTextProps) {
	return <text className={cn(concreteClassNames.chartAxisLabel, className)} {...props} />
}

export function ChartRowLabel({ className, ...props }: ChartSvgTextProps) {
	return <text className={cn(concreteClassNames.chartRowLabel, className)} {...props} />
}

export function ChartValueLabel({ className, ...props }: ChartSvgTextProps) {
	return <text className={cn(concreteClassNames.chartValueLabel, className)} {...props} />
}

export function ChartEndLabel({ className, ...props }: ChartSvgTextProps) {
	return <text className={cn(concreteClassNames.chartEndLabel, className)} {...props} />
}

export function ChartTarget({ className, ...props }: ChartSvgGroupProps) {
	return <g className={cn(concreteClassNames.chartTarget, className)} {...props} />
}

export function ChartArea({ className, ...props }: ChartSvgPathProps) {
	return <path className={cn(concreteClassNames.chartArea, className)} {...props} />
}

export function ChartLine({ className, ...props }: ChartSvgPathProps) {
	return <path className={cn(concreteClassNames.chartLine, className)} {...props} />
}

export function ChartPoint({ className, ...props }: ChartSvgCircleProps) {
	return <circle className={cn(concreteClassNames.chartPoint, className)} {...props} />
}

export function ChartEndpoint({ className, ...props }: ChartSvgCircleProps) {
	return <circle className={cn(concreteClassNames.chartEndpoint, className)} {...props} />
}

export function ChartBar({ className, ...props }: ChartSvgRectProps) {
	return <rect className={cn(concreteClassNames.chartBar, className)} {...props} />
}

export function ChartBarTrack({ className, ...props }: ChartSvgRectProps) {
	return <rect className={cn(concreteClassNames.chartBarTrack, className)} {...props} />
}

export function ChartBarComparison({ className, ...props }: ChartSvgRectProps) {
	return <rect className={cn(concreteClassNames.chartBarComparison, className)} {...props} />
}

export function ChartStackSegment({ className, ...props }: ChartSvgRectProps) {
	return <rect className={cn(concreteClassNames.chartStackSegment, className)} {...props} />
}

export type DonutPlotProps = HTMLAttributes<HTMLDivElement> & {
	thickness?: DonutThickness | undefined
}

export function DonutPlot({ className, style, thickness = 'medium', ...props }: DonutPlotProps) {
	return (
		<div
			className={cn(concreteClassNames.donutChart, className)}
			data-thickness={thickness}
			style={withDonutStrokeWidth(style, thickness)}
			{...props}
		/>
	)
}

export type DonutCenterProps = HTMLAttributes<HTMLDivElement> & {
	label?: ReactNode
	value: ReactNode
}

export function DonutCenter({ className, label, value, ...props }: DonutCenterProps) {
	return (
		<div className={cn(concreteClassNames.donutCenter, className)} {...props}>
			<b className={concreteClassNames.donutCenterValue}>{value}</b>
			{label ? <span className={concreteClassNames.donutCenterLabel}>{label}</span> : null}
		</div>
	)
}

export function DonutTrack({ className, ...props }: ChartSvgCircleProps) {
	return <circle className={cn(concreteClassNames.donutTrack, className)} {...props} />
}

export function DonutSegment({ className, ...props }: ChartSvgCircleProps) {
	return <circle className={cn(concreteClassNames.donutSegment, className)} {...props} />
}

export type HeatmapGridProps = HTMLAttributes<HTMLDivElement> & {
	columnCount: number
}

export function HeatmapGrid({ className, columnCount, style, ...props }: HeatmapGridProps) {
	return (
		<div
			className={cn(concreteClassNames.heatmapChart, className)}
			style={withHeatmapColumnCount(style, columnCount)}
			{...props}
		/>
	)
}

export type HeatmapCornerProps = HTMLAttributes<HTMLSpanElement>

export function HeatmapCorner({ className, ...props }: HeatmapCornerProps) {
	return <span className={className} {...props} />
}

export type HeatmapColumnLabelProps = HTMLAttributes<HTMLElement>

export function HeatmapColumnLabel({ children, className, ...props }: HeatmapColumnLabelProps) {
	return (
		<b className={cn(concreteClassNames.heatmapColumnLabel, className)} {...props}>
			{children}
		</b>
	)
}

export type HeatmapRowLabelProps = HTMLAttributes<HTMLElement>

export function HeatmapRowLabel({ children, className, ...props }: HeatmapRowLabelProps) {
	return (
		<strong className={cn(concreteClassNames.heatmapRowLabel, className)} {...props}>
			{children}
		</strong>
	)
}

export type HeatmapCellProps = HTMLAttributes<HTMLSpanElement> & {
	intensity?: number | undefined
}

export function HeatmapCell({ children, className, intensity, style, ...props }: HeatmapCellProps) {
	return (
		<span
			className={cn(concreteClassNames.heatmapCell, className)}
			style={withHeatmapIntensity(style, intensity)}
			{...props}
		>
			{children === undefined ? null : (
				<span className={concreteClassNames.heatmapCellValue}>{children}</span>
			)}
		</span>
	)
}

function withChartHeight(
	style: CSSProperties | undefined,
	height: number | string | undefined
): CSSProperties | undefined {
	if (height === undefined) {
		return style
	}

	return {
		...style,
		'--chart-height': formatCssSize(height)
	} as ChartCustomProperties
}

function withDonutStrokeWidth(
	style: CSSProperties | undefined,
	thickness: DonutThickness
): CSSProperties {
	return {
		...style,
		'--donut-stroke-width': getDonutStrokeWidthToken(thickness)
	} as ChartCustomProperties
}

function withHeatmapColumnCount(
	style: CSSProperties | undefined,
	columnCount: number
): CSSProperties {
	return {
		...style,
		'--heatmap-column-count': String(Math.max(Math.floor(columnCount), 1))
	} as ChartCustomProperties
}

function withHeatmapIntensity(
	style: CSSProperties | undefined,
	intensity: number | undefined
): CSSProperties | undefined {
	if (intensity === undefined) {
		return style
	}

	return {
		...style,
		'--heatmap-intensity': String(intensity)
	} as ChartCustomProperties
}

function formatCssSize(value: number | string): string {
	return typeof value === 'number' ? `${value}px` : value
}

function getDonutStrokeWidthToken(thickness: DonutThickness): string {
	switch (thickness) {
		case 'medium':
			return 'var(--concrete-size-donut-stroke-medium)'
		case 'thick':
			return 'var(--concrete-size-donut-stroke-thick)'
		case 'thin':
			return 'var(--concrete-size-donut-stroke-thin)'
	}
}
