import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { Heading } from '../heading'
import { Surface } from '../surface'
import type { SurfaceDepth, SurfaceIntent } from '../surface/schema'
import { Text } from '../text'
import { cn } from '../utils'
import type { DataSurfaceLayout, DataSurfacePurpose } from './schema'

type DataSurfaceElementProps = Omit<HTMLAttributes<HTMLElement>, 'style' | 'title'>

export type DataSurfaceProps = DataSurfaceElementProps & {
	actions?: ReactNode
	children?: ReactNode
	compact?: boolean
	density?: Density
	depth?: SurfaceDepth
	description?: ReactNode
	footer?: ReactNode
	layout?: DataSurfaceLayout
	meta?: ReactNode
	purpose?: DataSurfacePurpose
	title?: ReactNode
	intent?: SurfaceIntent
}

export function DataSurface({
	actions,
	children,
	className,
	compact = false,
	density = 'compact',
	depth = 'raised',
	description,
	footer,
	layout = 'stack',
	meta,
	purpose = 'generic',
	title,
	intent = 'default',
	...props
}: DataSurfaceProps) {
	return (
		<Surface
			as="section"
			className={cn(concreteClassNames.dataSurface, className)}
			data-compact={compact ? 'true' : undefined}
			data-layout={layout}
			data-purpose={purpose}
			density={density}
			depth={depth}
			intent={intent}
			{...props}
		>
			{title || description || meta || actions ? (
				<header className={concreteClassNames.dataSurfaceHeader}>
					<div className={concreteClassNames.dataSurfaceHeaderBody}>
						{title ? (
							<Heading level="3" hierarchy="subsection">
								{title}
							</Heading>
						) : null}
						{description ? (
							<Text as="p" purpose="caption" intent="muted">
								{description}
							</Text>
						) : null}
					</div>
					{meta ? <div className={concreteClassNames.dataSurfaceMeta}>{meta}</div> : null}
					{actions ? <div className={concreteClassNames.dataSurfaceActions}>{actions}</div> : null}
				</header>
			) : null}
			{children}
			{footer ? <footer className={concreteClassNames.dataSurfaceFooter}>{footer}</footer> : null}
		</Surface>
	)
}
