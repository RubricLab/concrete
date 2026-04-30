import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import type { DiagramNodeRole } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type DiagramNodeProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> & {
	meta?: ReactNode
	muted?: boolean
	role?: DiagramNodeRole
	selected?: boolean
	title: ReactNode
}

export function DiagramNode({
	className,
	meta,
	muted = false,
	role = 'process',
	selected = false,
	title,
	type = 'button',
	...props
}: DiagramNodeProps) {
	return (
		<button
			className={cn(
				concreteClassNames.diagramNode,
				getDiagramRoleClass(role),
				muted && concreteClassNames.diagramNodeMuted,
				selected && concreteClassNames.diagramNodeSelected,
				className
			)}
			data-diagram-role={role}
			type={type}
			{...props}
		>
			<span className={concreteClassNames.diagramNodeIcon}>
				<ConcreteIcon name={getDiagramRoleIcon(role)} />
			</span>
			<span className={concreteClassNames.diagramNodeText}>
				<strong>{title}</strong>
				{meta ? <span>{meta}</span> : null}
			</span>
		</button>
	)
}

function getDiagramRoleIcon(role: DiagramNodeRole): IconName {
	switch (role) {
		case 'boundary':
			return 'square'
		case 'compute':
			return 'sparkles'
		case 'data':
			return 'bar-chart-3'
		case 'decision':
			return 'chevrons-up-down'
		case 'error':
			return 'triangle-alert'
		case 'external':
			return 'user'
		case 'process':
			return 'git-branch'
	}
}

function getDiagramRoleClass(role: DiagramNodeRole): string | undefined {
	switch (role) {
		case 'boundary':
			return concreteClassNames.diagramRoleBoundary
		case 'compute':
			return concreteClassNames.diagramRoleCompute
		case 'data':
			return concreteClassNames.diagramRoleData
		case 'decision':
			return concreteClassNames.diagramRoleDecision
		case 'error':
			return concreteClassNames.diagramRoleError
		case 'external':
			return concreteClassNames.diagramRoleExternal
		case 'process':
			return undefined
	}
}
