import type { HTMLAttributes } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

const defaultDiagramRailTools = [
	'arrow-right',
	'square',
	'circle',
	'git-branch',
	'activity',
	'bar-chart-3'
] as const satisfies readonly IconName[]

export type DiagramRailProps = HTMLAttributes<HTMLDivElement> & {
	activeIndex?: number | undefined
	tools?: readonly IconName[] | undefined
}

export function DiagramRail({
	activeIndex = 0,
	className,
	tools = defaultDiagramRailTools,
	...props
}: DiagramRailProps) {
	return (
		<div aria-hidden="true" className={cn(concreteClassNames.diagramRail, className)} {...props}>
			{tools.map((tool, index) => (
				<span
					className={index === activeIndex ? concreteClassNames.diagramRailActive : undefined}
					key={`${tool}-${index}`}
				>
					<ConcreteIcon name={tool} />
				</span>
			))}
		</div>
	)
}
