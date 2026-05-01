import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

type SkeletonElementProps = Omit<HTMLAttributes<HTMLSpanElement>, 'style'>

export type SkeletonProps = SkeletonElementProps & {
	height?: number | string
	width?: number | string
}

export function Skeleton({ className, height = 12, width = '100%', ...props }: SkeletonProps) {
	return (
		<span
			className={cn(concreteClassNames.skeleton, className)}
			style={{ height, width }}
			{...props}
		/>
	)
}
