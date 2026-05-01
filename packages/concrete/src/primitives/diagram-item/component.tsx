import type { HTMLAttributes, ReactNode } from 'react'
import type { DiagramItemKind, DiagramTone } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { getDiagramToneClass } from '../diagram-helpers'
import { cn } from '../utils'

export type DiagramItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	body?: ReactNode
	kind?: DiagramItemKind
	meta?: ReactNode
	muted?: boolean
	selected?: boolean
	title: ReactNode
	intent?: DiagramTone
	value?: ReactNode
}

export function DiagramItem({
	body,
	className,
	kind = 'note',
	meta,
	muted = false,
	selected = false,
	title,
	intent = 'ink',
	value,
	...props
}: DiagramItemProps) {
	return (
		<div
			className={cn(
				concreteClassNames.diagramItem,
				getDiagramItemClass(kind),
				getDiagramToneClass(intent),
				muted && concreteClassNames.diagramItemMuted,
				selected && concreteClassNames.diagramItemSelected,
				className
			)}
			data-diagram-kind={kind}
			data-diagram-intent={intent}
			{...props}
		>
			<span className={concreteClassNames.diagramItemKind}>{kind}</span>
			<strong>{title}</strong>
			{value ? <b>{value}</b> : null}
			{body ? <p>{body}</p> : null}
			{meta ? <span className={concreteClassNames.diagramItemMeta}>{meta}</span> : null}
		</div>
	)
}

function getDiagramItemClass(kind: DiagramItemKind): string | undefined {
	switch (kind) {
		case 'card':
		case 'note':
			return undefined
		case 'chart':
			return concreteClassNames.diagramItemChart
		case 'code':
			return concreteClassNames.diagramItemCode
		case 'document':
			return concreteClassNames.diagramItemDocument
		case 'metric':
			return concreteClassNames.diagramItemMetric
		case 'status':
			return concreteClassNames.diagramItemStatus
		case 'table':
			return concreteClassNames.diagramItemTable
	}
}
