import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { PageSectionGround, PageSectionIntent, PageSectionRhythm } from './schema'

type PageSectionElementProps = Omit<HTMLAttributes<HTMLElement>, 'style'>

export type PageSectionProps = PageSectionElementProps & {
	children?: ReactNode
	density?: Density
	ground?: PageSectionGround
	rhythm?: PageSectionRhythm
	separated?: boolean
	intent?: PageSectionIntent
}

export function PageSection({
	children,
	className,
	density = 'comfortable',
	ground = 'plain',
	rhythm = 'standard',
	separated = false,
	intent = 'default',
	...props
}: PageSectionProps) {
	return (
		<section
			className={cn(concreteClassNames.pageSection, className)}
			data-density={density}
			data-ground={ground}
			data-rhythm={rhythm}
			data-separated={separated ? 'true' : undefined}
			data-intent={intent}
			{...props}
		>
			{children}
		</section>
	)
}
