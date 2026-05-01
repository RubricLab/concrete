import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames, getConcreteClassName } from '../../styles/class-names'
import { cn } from '../utils'

export type DeltaIntent = 'negative' | 'neutral' | 'positive'
export type DeltaDensity = 'compact' | 'comfortable' | 'display' | 'editorial'
export type DeltaHierarchy = 'plain' | 'wash'

export type DeltaProps = HTMLAttributes<HTMLSpanElement> & {
	basis?: ReactNode
	density?: DeltaDensity
	hierarchy?: DeltaHierarchy
	intent?: DeltaIntent
	value: string
}

const deltaIntentClassNames = {
	negative: getConcreteClassName('deltaNegative'),
	neutral: getConcreteClassName('deltaNeutral'),
	positive: getConcreteClassName('deltaPositive')
} satisfies Record<DeltaIntent, string>

const deltaDensityClassNames = {
	comfortable: undefined,
	compact: getConcreteClassName('deltaSmall'),
	display: getConcreteClassName('deltaXlarge'),
	editorial: getConcreteClassName('deltaLarge')
} satisfies Record<DeltaDensity, string | undefined>

export function Delta({
	basis,
	className,
	density = 'comfortable',
	hierarchy = 'plain',
	intent = 'neutral',
	value,
	...props
}: DeltaProps) {
	return (
		<span
			className={cn(
				concreteClassNames.delta,
				deltaIntentClassNames[intent],
				deltaDensityClassNames[density],
				hierarchy === 'wash' && concreteClassNames.deltaWash,
				className
			)}
			data-density={density}
			data-hierarchy={hierarchy}
			data-intent={intent}
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
