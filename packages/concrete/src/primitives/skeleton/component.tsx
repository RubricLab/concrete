import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type SkeletonProps = HTMLAttributes<HTMLSpanElement> & {
	height?: number | string
	width?: number | string
}

export function Skeleton({
	className,
	height = 12,
	style,
	width = '100%',
	...props
}: SkeletonProps) {
	return (
		<span
			className={cn(concreteClassNames.skeleton, className)}
			style={{ height, width, ...style }}
			{...props}
		/>
	)
}
