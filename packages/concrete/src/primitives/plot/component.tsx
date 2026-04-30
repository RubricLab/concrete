import type { ReactNode, SVGAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type ChartSvgProps = SVGAttributes<SVGSVGElement> & {
	title?: ReactNode
}

export function ChartSvg({ children, className, title, ...props }: ChartSvgProps) {
	return (
		<svg aria-hidden className={cn(concreteClassNames.chartSvg, className)} {...props}>
			<title>{title ?? 'Chart'}</title>
			{children}
		</svg>
	)
}
