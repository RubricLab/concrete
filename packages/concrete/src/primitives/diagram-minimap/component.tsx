import type { CSSProperties, HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

type DiagramMiniMapCustomProperties = CSSProperties & {
	'--diagram-minimap-node-x'?: string
	'--diagram-minimap-node-y'?: string
}

export type DiagramMiniMapNode = {
	id: string
	selected?: boolean | undefined
	x: number
	y: number
}

export type DiagramMiniMapProps = HTMLAttributes<HTMLDivElement> & {
	nodes: readonly DiagramMiniMapNode[]
	selectedId?: string | undefined
}

export function DiagramMiniMap({ className, nodes, selectedId, ...props }: DiagramMiniMapProps) {
	return (
		<div aria-hidden="true" className={cn(concreteClassNames.diagramMinimap, className)} {...props}>
			{nodes.map(node => (
				<span
					className={cn(
						concreteClassNames.diagramMinimapNode,
						(node.selected || selectedId === node.id) && concreteClassNames.diagramMinimapSelected
					)}
					key={node.id}
					style={getDiagramMiniMapNodeStyle(node)}
				/>
			))}
		</div>
	)
}

function getDiagramMiniMapNodeStyle(node: DiagramMiniMapNode): CSSProperties {
	return {
		'--diagram-minimap-node-x': `${node.x}%`,
		'--diagram-minimap-node-y': `${node.y}%`
	} as DiagramMiniMapCustomProperties
}
