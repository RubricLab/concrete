import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { Dock } from '../dock'
import { Header } from '../header'
import { Surface } from '../surface'
import type { SurfaceDepth, SurfaceTone } from '../surface/schema'
import { cn } from '../utils'

type PanelElementProps = Omit<HTMLAttributes<HTMLElement>, 'style' | 'title'>

export type PanelProps = PanelElementProps & {
	actions?: ReactNode
	children?: ReactNode
	density?: Density
	depth?: SurfaceDepth
	description?: ReactNode
	footer?: ReactNode
	meta?: ReactNode
	title?: ReactNode
	tone?: SurfaceTone
}

export function Panel({
	actions,
	children,
	className,
	density = 'comfortable',
	depth = 'flat',
	description,
	footer,
	meta,
	title,
	tone = 'default',
	...props
}: PanelProps) {
	return (
		<Surface
			as="section"
			className={cn(concreteClassNames.panel, className)}
			density={density}
			depth={depth}
			tone={tone}
			{...props}
		>
			{title || description || meta || actions ? (
				<Header
					actions={actions}
					density={density}
					description={description}
					meta={meta}
					title={title}
				/>
			) : null}
			{children ? <div className={concreteClassNames.panelBody}>{children}</div> : null}
			{footer ? (
				<Dock className={concreteClassNames.panelFooter} density={density}>
					{footer}
				</Dock>
			) : null}
		</Surface>
	)
}
