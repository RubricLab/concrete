import type { SVGProps } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type SpinnerProps = SVGProps<SVGSVGElement> & {
	size?: number
	tone?: 'default' | 'inverse' | 'sky'
}

export function Spinner({ className, size = 18, tone = 'default', ...props }: SpinnerProps) {
	return (
		<svg
			aria-label="Loading"
			className={cn(
				concreteClassNames.spinnerSvg,
				tone === 'sky' && concreteClassNames.spinnerSky,
				tone === 'inverse' && concreteClassNames.spinnerInverse,
				className
			)}
			height={size}
			role="img"
			viewBox="0 0 24 24"
			width={size}
			{...props}
		>
			<title>Loading</title>
			<circle cx="12" cy="12" r="9" strokeWidth="2.5" />
			<path d="M12 3a9 9 0 0 1 9 9" strokeWidth="2.5" />
		</svg>
	)
}
