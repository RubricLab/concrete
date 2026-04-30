import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { ContainerElement, ContainerMeasure } from './schema'

type ContainerElementProps = Omit<HTMLAttributes<HTMLElement>, 'style'>

export type ContainerProps = ContainerElementProps & {
	as?: ContainerElement
	children?: ReactNode
	density?: Density
	measure?: ContainerMeasure
}

export function Container({
	as = 'div',
	children,
	className,
	density = 'comfortable',
	measure = 'wide',
	...props
}: ContainerProps) {
	const ContainerTag = as

	return (
		<ContainerTag
			className={cn(concreteClassNames.container, className)}
			data-density={density}
			data-measure={measure}
			{...props}
		>
			{children}
		</ContainerTag>
	)
}
