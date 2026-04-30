import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type ScaleFrameAlign = 'center' | 'end' | 'start'
export type ScaleFrameSurface = 'raised' | 'sunken' | 'transparent'

export type ScaleFrameProps = HTMLAttributes<HTMLDivElement> & {
	align?: ScaleFrameAlign
	children?: ReactNode
	scale?: number
	surface?: ScaleFrameSurface
}

type ScaleFrameStyle = CSSProperties & {
	'--concrete-scale-frame-scale'?: string
}

export function ScaleFrame({
	align = 'center',
	children,
	className,
	scale = 1,
	style,
	surface = 'transparent',
	...props
}: ScaleFrameProps) {
	const frameStyle: ScaleFrameStyle = {
		'--concrete-scale-frame-scale': String(getSafeScale(scale)),
		...style
	}

	return (
		<div
			className={cn(concreteClassNames.scaleFrame, className)}
			data-align={align}
			data-surface={surface}
			style={frameStyle}
			{...props}
		>
			<div className={concreteClassNames.scaleFrameSurface}>
				<div className={concreteClassNames.scaleFrameContent}>{children}</div>
			</div>
		</div>
	)
}

function getSafeScale(scale: number): number {
	if (!Number.isFinite(scale)) {
		return 1
	}

	return Math.min(Math.max(scale, 0.15), 1.25)
}
