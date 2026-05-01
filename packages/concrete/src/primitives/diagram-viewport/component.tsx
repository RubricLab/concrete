import type { CSSProperties, HTMLAttributes, ReactNode, SVGAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { Card, type CardProps } from '../card'
import { cn } from '../utils'

export type DiagramDisplay = 'canvas' | 'flow'

type DiagramViewportCustomProperties = CSSProperties & {
	'--diagram-height'?: string
	'--diagram-transform'?: string
	'--diagram-width'?: string
	'--diagram-element-height'?: string
	'--diagram-element-width'?: string
}

type DiagramElementPlacement = {
	height: number | string
	width: number | string
	x: number
	y: number
}

export type DiagramShellProps = Omit<CardProps, 'depth'> & {
	display?: DiagramDisplay | undefined
}

export function DiagramShell({ className, display = 'canvas', ...props }: DiagramShellProps) {
	const shellClassName =
		display === 'flow' ? concreteClassNames.diagramFlowShell : concreteClassNames.diagramShell

	return <Card className={cn(shellClassName, className)} depth="raised" {...props} />
}

export type DiagramHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
	description?: ReactNode
	title: ReactNode
}

export function DiagramHeader({ className, description, title, ...props }: DiagramHeaderProps) {
	return (
		<header className={cn(concreteClassNames.diagramHeader, className)} {...props}>
			<div className={concreteClassNames.diagramTitleBlock}>
				<h3>{title}</h3>
			</div>
			{description ? (
				<p className={concreteClassNames.diagramStatus}>
					<span aria-hidden="true" />
					{description}
				</p>
			) : null}
		</header>
	)
}

export type DiagramViewportProps = HTMLAttributes<HTMLDivElement> & {
	display?: DiagramDisplay | undefined
	panning?: boolean | undefined
}

export function DiagramViewport({
	className,
	display = 'canvas',
	panning = false,
	...props
}: DiagramViewportProps) {
	const viewportClassName =
		display === 'flow'
			? concreteClassNames.diagramFlowViewport
			: cn(concreteClassNames.diagramViewport, panning && concreteClassNames.diagramPanning)

	return <div className={cn(viewportClassName, className)} {...props} />
}

export type DiagramStageProps = HTMLAttributes<HTMLDivElement> & {
	height: number | string
	transform: string
	width: number | string
}

export function DiagramStage({
	className,
	height,
	style,
	transform,
	width,
	...props
}: DiagramStageProps) {
	return (
		<div
			className={cn(concreteClassNames.diagramStage, className)}
			style={withDiagramStageStyle(style, { height, transform, width })}
			{...props}
		/>
	)
}

export type DiagramElementProps = HTMLAttributes<HTMLDivElement> & DiagramElementPlacement

export function DiagramElement({
	className,
	height,
	style,
	width,
	x,
	y,
	...props
}: DiagramElementProps) {
	return (
		<div
			className={cn(concreteClassNames.diagramElement, className)}
			data-diagram-element
			style={withDiagramElementStyle(style, { height, width, x, y })}
			{...props}
		/>
	)
}

export type DiagramElementButtonProps = HTMLAttributes<HTMLButtonElement> & DiagramElementPlacement

export function DiagramElementButton({
	className,
	height,
	style,
	width,
	x,
	y,
	...props
}: DiagramElementButtonProps) {
	return (
		<button
			className={cn(
				concreteClassNames.diagramElement,
				concreteClassNames.diagramItemButton,
				className
			)}
			data-diagram-element
			style={withDiagramElementStyle(style, { height, width, x, y })}
			type="button"
			{...props}
		/>
	)
}

export type DiagramFooterProps = HTMLAttributes<HTMLElement>

export function DiagramFooter({ className, ...props }: DiagramFooterProps) {
	return <footer className={cn(concreteClassNames.diagramFooter, className)} {...props} />
}

export type DiagramSvgProps = SVGAttributes<SVGSVGElement> & {
	gridId: string
	height: number | string
	panX: number
	panY: number
	title: string
}

export function DiagramSvg({
	children,
	className,
	gridId,
	height,
	panX,
	panY,
	style,
	title,
	...props
}: DiagramSvgProps) {
	return (
		<svg
			aria-label={title}
			className={cn(concreteClassNames.diagramFlowCanvas, className)}
			role="img"
			style={withDiagramSvgHeight(style, height)}
			{...props}
		>
			<defs>
				<pattern
					height="var(--concrete-size-diagram-flow-grid)"
					id={gridId}
					patternUnits="userSpaceOnUse"
					width="var(--concrete-size-diagram-flow-grid)"
				>
					<path d="M 18 0 L 0 0 0 18" fill="none" />
				</pattern>
			</defs>
			<rect
				className={concreteClassNames.diagramFlowGrid}
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

function withDiagramStageStyle(
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
		'--diagram-height': formatCssSize(height),
		'--diagram-transform': transform,
		'--diagram-width': formatCssSize(width)
	} as DiagramViewportCustomProperties
}

function withDiagramElementStyle(
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

function withDiagramSvgHeight(
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
