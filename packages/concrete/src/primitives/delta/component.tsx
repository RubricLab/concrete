import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames, getConcreteClassName } from '../../styles/class-names'
import { cn } from '../utils'

export type DeltaIntent = 'negative' | 'neutral' | 'positive'
export type DeltaSize = 'large' | 'medium' | 'small' | 'xlarge'
export type DeltaVariant = 'bare' | 'wash'

export type DeltaProps = HTMLAttributes<HTMLSpanElement> & {
	basis?: ReactNode
	intent?: DeltaIntent
	size?: DeltaSize
	value: string
	variant?: DeltaVariant
}

const deltaIntentClassNames = {
	negative: getConcreteClassName('deltaNegative'),
	neutral: getConcreteClassName('deltaNeutral'),
	positive: getConcreteClassName('deltaPositive')
} satisfies Record<DeltaIntent, string>

const deltaSizeClassNames = {
	large: getConcreteClassName('deltaLarge'),
	medium: undefined,
	small: getConcreteClassName('deltaSmall'),
	xlarge: getConcreteClassName('deltaXlarge')
} satisfies Record<DeltaSize, string | undefined>

export function Delta({
	basis,
	className,
	intent = 'neutral',
	size = 'medium',
	value,
	variant = 'bare',
	...props
}: DeltaProps) {
	return (
		<span
			className={cn(
				concreteClassNames.delta,
				deltaIntentClassNames[intent],
				deltaSizeClassNames[size],
				variant === 'wash' && concreteClassNames.deltaWash,
				className
			)}
			{...props}
		>
			<span aria-hidden className={concreteClassNames.deltaIcon}>
				{renderDeltaIcon(intent)}
			</span>
			<span>{value}</span>
			{basis ? <span className={concreteClassNames.deltaBasis}>{basis}</span> : null}
		</span>
	)
}

function renderDeltaIcon(intent: DeltaIntent): ReactNode {
	switch (intent) {
		case 'negative':
			return (
				<svg aria-hidden="true" viewBox="0 0 12 12">
					<path d="M3 3L9 9" />
					<path d="M5 9h4V5" />
				</svg>
			)
		case 'neutral':
			return (
				<svg aria-hidden="true" viewBox="0 0 12 12">
					<path d="M2.5 6h7" />
				</svg>
			)
		case 'positive':
			return (
				<svg aria-hidden="true" viewBox="0 0 12 12">
					<path d="M3 9L9 3" />
					<path d="M5 3h4v4" />
				</svg>
			)
	}
}
