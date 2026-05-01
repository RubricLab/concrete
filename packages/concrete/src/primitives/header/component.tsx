import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { Heading } from '../heading'
import type { HeadingLevel } from '../heading/schema'
import { Text } from '../text'
import { cn } from '../utils'

type HeaderElementProps = Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'title'>

export type HeaderProps = HeaderElementProps & {
	actions?: ReactNode
	density?: Density
	description?: ReactNode
	eyebrow?: ReactNode
	level?: HeadingLevel
	meta?: ReactNode
	title?: ReactNode
}

export function Header({
	actions,
	className,
	density = 'comfortable',
	description,
	eyebrow,
	level = '2',
	meta,
	title,
	...props
}: HeaderProps) {
	return (
		<div className={cn(concreteClassNames.header, className)} data-density={density} {...props}>
			<div className={concreteClassNames.headerContent}>
				{eyebrow ? (
					<Text purpose="caption" intent="soft">
						{eyebrow}
					</Text>
				) : null}
				{title ? (
					<Heading level={level} hierarchy="section">
						{title}
					</Heading>
				) : null}
				{description ? (
					<Text purpose="body" intent="muted">
						{description}
					</Text>
				) : null}
			</div>
			{meta || actions ? (
				<div className={concreteClassNames.headerMeta}>
					{meta ? <span>{meta}</span> : null}
					{actions ? <div className={concreteClassNames.headerActions}>{actions}</div> : null}
				</div>
			) : null}
		</div>
	)
}
