import type { CSSProperties, HTMLAttributes, ReactNode, SVGAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { Card, type CardProps } from '../card'
import { cn } from '../utils'

type DiagramViewportCustomProperties = CSSProperties & {
	'--diagram-canvas-height'?: string
	'--diagram-canvas-transform'?: string
	'--diagram-canvas-width'?: string
	'--diagram-element-height'?: string
	'--diagram-element-width'?: string
	'--diagram-height'?: string
}

type DiagramElementPlacement = {
	height: number | string
	width: number | string
	x: number
	y: number
}

export type DiagramCanvasShellProps = Omit<CardProps, 'variant'>

export function DiagramCanvasShell({ className, ...props }: DiagramCanvasShellProps) {
	return (
		<Card
			className={cn(concreteClassNames.diagramCanvasCard, className)}
			variant="raised"
			{...props}
		/>
	)
}

export type DiagramCanvasHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
	description?: ReactNode
	title: ReactNode
}

export function DiagramCanvasHeader({
	className,
	description,
	title,
	...props
}: DiagramCanvasHeaderProps) {
	return (
		<header className={cn(concreteClassNames.diagramCanvasHeader, className)} {...props}>
			<div className={concreteClassNames.diagramCanvasTitleBlock}>
				<h3>{title}</h3>
			</div>
			{description ? (
				<p className={concreteClassNames.diagramCanvasStatus}>
					<span aria-hidden="true" />
					{description}
				</p>
			) : null}
		</header>
	)
}

export type DiagramCanvasViewportProps = HTMLAttributes<HTMLDivElement> & {
	panning?: boolean | undefined
}

export function DiagramCanvasViewport({
	className,
	panning = false,
	...props
}: DiagramCanvasViewportProps) {
	return (
		<div
			className={cn(
				concreteClassNames.diagramCanvasViewport,
				panning && concreteClassNames.diagramCanvasPanning,
				className
			)}
			{...props}
		/>
	)
}

export type DiagramCanvasStageProps = HTMLAttributes<HTMLDivElement> & {
	height: number | string
	transform: string
	width: number | string
}

export function DiagramCanvasStage({
	className,
	height,
	style,
	transform,
	width,
	...props
}: DiagramCanvasStageProps) {
	return (
		<div
			className={cn(concreteClassNames.diagramCanvasStage, className)}
			style={withDiagramCanvasStageStyle(style, { height, transform, width })}
			{...props}
		/>
	)
}

export type DiagramCanvasElementProps = HTMLAttributes<HTMLDivElement> & DiagramElementPlacement

export function DiagramCanvasElement({
	className,
	height,
	style,
	width,
	x,
	y,
	...props
}: DiagramCanvasElementProps) {
	return (
		<div
			className={cn(concreteClassNames.diagramCanvasElement, className)}
			data-diagram-element
			style={withDiagramCanvasElementStyle(style, { height, width, x, y })}
			{...props}
		/>
	)
}

export type DiagramCanvasElementButtonProps = HTMLAttributes<HTMLButtonElement> &
	DiagramElementPlacement

export function DiagramCanvasElementButton({
	className,
	height,
	style,
	width,
	x,
	y,
	...props
}: DiagramCanvasElementButtonProps) {
	return (
		<button
			className={cn(
				concreteClassNames.diagramCanvasElement,
				concreteClassNames.diagramCanvasItemButton,
				className
			)}
			data-diagram-element
			style={withDiagramCanvasElementStyle(style, { height, width, x, y })}
			type="button"
			{...props}
		/>
	)
}

export type DiagramCanvasFooterProps = HTMLAttributes<HTMLElement>

export function DiagramCanvasFooter({ className, ...props }: DiagramCanvasFooterProps) {
	return <footer className={cn(concreteClassNames.diagramCanvasFooter, className)} {...props} />
}

export type FlowDiagramShellProps = Omit<CardProps, 'variant'>

export function FlowDiagramShell({ className, ...props }: FlowDiagramShellProps) {
	return (
		<Card className={cn(concreteClassNames.flowDiagramCard, className)} variant="raised" {...props} />
	)
}

export type FlowDiagramViewportProps = HTMLAttributes<HTMLDivElement>

export function FlowDiagramViewport({ className, ...props }: FlowDiagramViewportProps) {
	return <div className={cn(concreteClassNames.flowDiagramViewport, className)} {...props} />
}

export type FlowDiagramSvgProps = SVGAttributes<SVGSVGElement> & {
	gridId: string
	height: number | string
	panX: number
	panY: number
	title: string
}

export function FlowDiagramSvg({
	children,
	className,
	gridId,
	height,
	panX,
	panY,
	style,
	title,
	...props
}: FlowDiagramSvgProps) {
	return (
		<svg
			aria-label={title}
			className={cn(concreteClassNames.flowDiagramCanvas, className)}
			role="img"
			style={withFlowDiagramHeight(style, height)}
			{...props}
		>
			<defs>
				<pattern
					height="var(--concrete-size-flow-diagram-grid)"
					id={gridId}
					patternUnits="userSpaceOnUse"
					width="var(--concrete-size-flow-diagram-grid)"
				>
					<path d="M 18 0 L 0 0 0 18" fill="none" />
				</pattern>
			</defs>
			<rect
				className={concreteClassNames.flowDiagramGrid}
				height="100%"
				style={{ fill: `url(#${gridId})` }}
				width="100%"
				x={panX}
				y={panY}
			/>
			{children}
		</svg>
	)
}

function withDiagramCanvasStageStyle(
	style: CSSProperties | undefined,
	{
		height,
		transform,
		width
	}: {
		height: number | string
		transform: string
		width: number | string
	}
): CSSProperties {
	return {
		...style,
		'--diagram-canvas-height': formatCssSize(height),
		'--diagram-canvas-transform': transform,
		'--diagram-canvas-width': formatCssSize(width)
	} as DiagramViewportCustomProperties
}

function withDiagramCanvasElementStyle(
	style: CSSProperties | undefined,
	{ height, width, x, y }: DiagramElementPlacement
): CSSProperties {
	return {
		...style,
		'--diagram-element-height': formatCssSize(height),
		'--diagram-element-width': formatCssSize(width),
		left: `${x}%`,
		top: `${y}%`
	} as DiagramViewportCustomProperties
}

function withFlowDiagramHeight(
	style: CSSProperties | undefined,
	height: number | string
): CSSProperties {
	return {
		...style,
		'--diagram-height': formatCssSize(height)
	} as DiagramViewportCustomProperties
}

function formatCssSize(value: number | string): string {
	return typeof value === 'number' ? `${value}px` : value
}
