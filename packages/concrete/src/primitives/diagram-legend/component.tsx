import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type DiagramLegendKind = 'compute' | 'data' | 'event' | 'flow' | 'reference'

export type DiagramLegendItem = {
	kind: DiagramLegendKind
	label: string
}

const defaultDiagramLegendItems = [
	{ kind: 'compute', label: 'Compute node' },
	{ kind: 'data', label: 'Data / service' },
	{ kind: 'flow', label: 'Flow' },
	{ kind: 'event', label: 'Event' },
	{ kind: 'reference', label: 'Context' }
] as const satisfies readonly DiagramLegendItem[]

export type DiagramLegendProps = HTMLAttributes<HTMLDivElement> & {
	items?: readonly DiagramLegendItem[] | undefined
}

export function DiagramLegend({
	className,
	items = defaultDiagramLegendItems,
	...props
}: DiagramLegendProps) {
	return (
		<div
			aria-hidden="true"
			className={cn(concreteClassNames.diagramCanvasLegend, className)}
			{...props}
		>
			{items.map(item => (
				<span key={`${item.kind}-${item.label}`}>
					<DiagramLegendMark kind={item.kind} />
					{item.label}
				</span>
			))}
		</div>
	)
}

function DiagramLegendMark({ kind }: { kind: DiagramLegendKind }) {
	const className = getDiagramLegendMarkClass(kind)

	switch (kind) {
		case 'compute':
		case 'data':
			return <i className={className} />
		case 'event':
		case 'flow':
		case 'reference':
			return <b className={className} />
	}
}

function getDiagramLegendMarkClass(kind: DiagramLegendKind): string | undefined {
	switch (kind) {
		case 'compute':
			return concreteClassNames.diagramCanvasLegendCompute
		case 'data':
			return concreteClassNames.diagramCanvasLegendData
		case 'event':
			return concreteClassNames.diagramCanvasLegendEvent
		case 'flow':
			return concreteClassNames.diagramCanvasLegendFlow
		case 'reference':
			return concreteClassNames.diagramCanvasLegendReference
	}
}
