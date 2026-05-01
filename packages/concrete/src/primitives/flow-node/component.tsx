import type { PointerEventHandler, SVGAttributes } from 'react'
import type { FlowDiagramNode as FlowDiagramNodeShape } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type FlowNodeHierarchy = FlowDiagramNodeShape['hierarchy']

export type FlowNodeProps = Omit<SVGAttributes<SVGGElement>, 'height' | 'title' | 'width'> & {
	height: number
	onPointerMove?: PointerEventHandler<SVGGElement> | undefined
	selected?: boolean | undefined
	subtitle?: string | undefined
	title: string
	hierarchy?: FlowNodeHierarchy | undefined
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
	hierarchy = 'surface',
	width,
	x,
	y,
	...props
}: FlowNodeProps) {
	return (
		<g
			className={cn(
				concreteClassNames.flowNode,
				selected && concreteClassNames.flowNodeSelected,
				hierarchy === 'accent' && concreteClassNames.flowNodeAccent,
				hierarchy === 'inverse' && concreteClassNames.flowNodeInverse,
				className
			)}
			onPointerMove={onPointerMove}
			{...props}
		>
			<rect height={height} width={width} x={x} y={y} />
			<text
				className={concreteClassNames.flowNodeTitle}
				dx="var(--concrete-offset-flow-node-text-x)"
				dy="var(--concrete-offset-flow-node-title-y)"
				x={x}
				y={y}
			>
				{title}
			</text>
			{subtitle ? (
				<text
					className={concreteClassNames.flowNodeSubtitle}
					dx="var(--concrete-offset-flow-node-text-x)"
					dy="var(--concrete-offset-flow-node-subtitle-y)"
					x={x}
					y={y}
				>
					{subtitle}
				</text>
			) : null}
		</g>
	)
}
