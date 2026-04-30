import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { SplitRatio } from './schema'

type SplitElementProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'>

export type SplitProps = SplitElementProps & {
	aside?: ReactNode
	children?: ReactNode
	density?: Density
	ratio?: SplitRatio
}

export function Split({
	aside,
	children,
	className,
	density = 'comfortable',
	ratio = 'auto',
	...props
}: SplitProps) {
	return (
		<div
			className={cn(concreteClassNames.split, className)}
			data-density={density}
			data-ratio={ratio}
			{...props}
		>
			<div className={concreteClassNames.splitBody}>{children}</div>
			{aside ? <div className={concreteClassNames.splitAside}>{aside}</div> : null}
		</div>
	)
}
