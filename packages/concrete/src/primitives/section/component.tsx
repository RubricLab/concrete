import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { Header } from '../header'
import { cn } from '../utils'

type SectionElementProps = Omit<HTMLAttributes<HTMLElement>, 'style' | 'title'>

export type SectionProps = SectionElementProps & {
	children?: ReactNode
	density?: Density
	description?: ReactNode
	separated?: boolean
	title?: ReactNode
}

export function Section({
	children,
	className,
	density = 'comfortable',
	description,
	separated = false,
	title,
	...props
}: SectionProps) {
	return (
		<section
			className={cn(concreteClassNames.section, className)}
			data-density={density}
			data-separated={separated ? 'true' : undefined}
			{...props}
		>
			{title || description ? (
				<Header density={density} description={description} level="3" title={title} />
			) : null}
			{children ? <div className={concreteClassNames.sectionBody}>{children}</div> : null}
		</section>
	)
}
