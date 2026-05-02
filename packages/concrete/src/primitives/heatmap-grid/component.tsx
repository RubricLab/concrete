import type { CSSProperties, HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

type HeatmapCustomProperties = CSSProperties & {
	'--heatmap-column-count'?: string
	'--heatmap-intensity'?: string
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

function withHeatmapColumnCount(
	style: CSSProperties | undefined,
	columnCount: number
): CSSProperties {
	const safeColumnCount = String(Math.max(Math.floor(columnCount), 1))

	return {
		...style,
		'--heatmap-column-count': safeColumnCount,
		gridTemplateColumns: `var(--concrete-size-heatmap-axis-label) repeat(${safeColumnCount}, minmax(var(--concrete-size-heatmap-cell-min-inline), var(--concrete-grid-track-fill)))`
	} as HeatmapCustomProperties
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
	} as HeatmapCustomProperties
}
