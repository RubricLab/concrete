import type { SVGProps } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type SpinnerDensity = 'compact' | 'comfortable' | 'editorial'
export type SpinnerIntent = 'inverse' | 'neutral' | 'sky'

export type SpinnerProps = Omit<SVGProps<SVGSVGElement>, 'height' | 'width'> & {
	density?: SpinnerDensity
	intent?: SpinnerIntent
}

const spinnerDensitySizes = {
	comfortable: 'var(--concrete-size-spinner-comfortable)',
	compact: 'var(--concrete-size-spinner-compact)',
	editorial: 'var(--concrete-size-spinner-editorial)'
} satisfies Record<SpinnerDensity, string>

export function Spinner({
	className,
	density = 'comfortable',
	intent = 'neutral',
	...props
}: SpinnerProps) {
	const size = spinnerDensitySizes[density]

	return (
		<svg
			aria-label="Loading"
			className={cn(
				concreteClassNames.spinnerSvg,
				intent === 'sky' && concreteClassNames.spinnerSky,
				intent === 'inverse' && concreteClassNames.spinnerInverse,
				className
			)}
			data-density={density}
			data-intent={intent}
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
