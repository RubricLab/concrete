import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type IndicatorIntent = 'danger' | 'muted' | 'neutral' | 'sky' | 'terminal' | 'ultra'

export type IndicatorProps = HTMLAttributes<HTMLSpanElement> & {
	intent?: IndicatorIntent
}

export function Indicator({ children, className, intent = 'neutral', ...props }: IndicatorProps) {
	return (
		<span className={cn(concreteClassNames.indicator, className)} data-intent={intent} {...props}>
			<span className={cn(concreteClassNames.indicatorDot, getIndicatorIntentClass(intent))} />
			{children}
		</span>
	)
}

function getIndicatorIntentClass(intent: IndicatorIntent | undefined): string | undefined {
	switch (intent) {
		case 'danger':
			return concreteClassNames.indicatorError
		case 'muted':
			return concreteClassNames.indicatorMuted
		case 'sky':
			return concreteClassNames.indicatorSky
		case 'terminal':
			return concreteClassNames.indicatorTerminal
		case 'ultra':
			return concreteClassNames.indicatorUltra
		case 'neutral':
		case undefined:
			return undefined
	}
}
