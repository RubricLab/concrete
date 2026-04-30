import type { PointerEventHandler, SVGAttributes } from 'react'
import type { FlowDiagramNode as FlowDiagramNodeShape } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type FlowNodeTone = FlowDiagramNodeShape['tone']

export type FlowNodeProps = Omit<SVGAttributes<SVGGElement>, 'height' | 'title' | 'width'> & {
	height: number
	onPointerMove?: PointerEventHandler<SVGGElement> | undefined
	selected?: boolean | undefined
	subtitle?: string | undefined
	title: string
	tone?: FlowNodeTone | undefined
	width: number
	x: number
	y: number
}

export function FlowNode({
	className,
	height,
	onPointerMove,
	selected = false,
	subtitle,
	title,
	tone = 'surface',
	width,
	x,
	y,
	...props
}: FlowNodeProps) {
	return (
		<g
			className={cn(
				concreteClassNames.flowDiagramNode,
				selected && concreteClassNames.flowDiagramNodeSelected,
				tone === 'accent' && concreteClassNames.flowDiagramNodeAccent,
				tone === 'inverse' && concreteClassNames.flowDiagramNodeInverse,
				className
			)}
			onPointerMove={onPointerMove}
			{...props}
		>
			<rect height={height} width={width} x={x} y={y} />
			<text
				className={concreteClassNames.flowDiagramNodeTitle}
				dx="var(--concrete-offset-flow-diagram-node-text-x)"
				dy="var(--concrete-offset-flow-diagram-node-title-y)"
				x={x}
				y={y}
			>
				{title}
			</text>
			{subtitle ? (
				<text
					className={concreteClassNames.flowDiagramNodeSubtitle}
					dx="var(--concrete-offset-flow-diagram-node-text-x)"
					dy="var(--concrete-offset-flow-diagram-node-subtitle-y)"
					x={x}
					y={y}
				>
					{subtitle}
				</text>
			) : null}
		</g>
	)
}
