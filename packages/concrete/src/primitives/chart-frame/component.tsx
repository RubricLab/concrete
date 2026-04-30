import type { CSSProperties, HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type ChartFrameSurface = 'raised' | 'sunken' | 'transparent'
export type ChartFrameVariant = 'area' | 'bar' | 'donut' | 'heatmap' | 'line' | 'stacked-bar'

type ChartFrameCustomProperties = CSSProperties & {
	'--concrete-chart-height'?: string
}

export type ChartFrameProps = HTMLAttributes<HTMLDivElement> & {
	height?: number | string | undefined
	surface?: ChartFrameSurface | undefined
	variant?: ChartFrameVariant | undefined
}

export function ChartFrame({
	className,
	height,
	style,
	surface = 'raised',
	variant = 'line',
	...props
}: ChartFrameProps) {
	return (
		<div
			className={cn(concreteClassNames.chartFrame, className)}
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

function withChartHeight(
	style: CSSProperties | undefined,
	height: number | string | undefined
): CSSProperties | undefined {
	if (height === undefined) {
		return style
	}

	return {
		...style,
		'--concrete-chart-height': formatCssSize(height)
	} as ChartFrameCustomProperties
}

function formatCssSize(value: number | string): string {
	return typeof value === 'number' ? `${value}px` : value
}
