import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type PreviewStageLayout = 'block' | 'grid' | 'stack'
export type PreviewStageWidth =
	| 'composer'
	| 'control'
	| 'data'
	| 'feedback'
	| 'form'
	| 'full'
	| 'media'
	| 'message'
	| 'search'

export type PreviewStageProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
	layout?: PreviewStageLayout | undefined
	width?: PreviewStageWidth | undefined
}

export function PreviewStage({
	children,
	className,
	layout = 'block',
	width = 'full',
	...props
}: PreviewStageProps) {
	return (
		<div
			className={cn(concreteClassNames.previewStage, className)}
			data-layout={layout}
			data-width={width}
			{...props}
		>
			{children}
		</div>
	)
}
