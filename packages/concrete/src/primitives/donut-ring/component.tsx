import type { CSSProperties, HTMLAttributes, ReactNode, SVGAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type DonutThickness = 'medium' | 'thick' | 'thin'
export type DonutSvgCircleProps = SVGAttributes<SVGCircleElement>

type DonutCustomProperties = CSSProperties & {
	'--concrete-donut-stroke-width'?: string
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

export function DonutTrack({ className, ...props }: DonutSvgCircleProps) {
	return <circle className={cn(concreteClassNames.donutTrack, className)} {...props} />
}

export function DonutSegment({ className, ...props }: DonutSvgCircleProps) {
	return <circle className={cn(concreteClassNames.donutSegment, className)} {...props} />
}

function withDonutStrokeWidth(
	style: CSSProperties | undefined,
	thickness: DonutThickness
): CSSProperties {
	return {
		...style,
		'--concrete-donut-stroke-width': getDonutStrokeWidthToken(thickness)
	} as DonutCustomProperties
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
