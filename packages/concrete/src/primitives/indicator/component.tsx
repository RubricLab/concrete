import type { HTMLAttributes } from 'react'
import type { ConcreteSignal } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type IndicatorTone = 'default' | ConcreteSignal | 'muted' | 'sky'

export type IndicatorProps = HTMLAttributes<HTMLSpanElement> & {
	tone?: IndicatorTone
}

export function Indicator({ children, className, tone = 'default', ...props }: IndicatorProps) {
	return (
		<span className={cn(concreteClassNames.indicator, className)} {...props}>
			<span className={cn(concreteClassNames.indicatorDot, getIndicatorToneClass(tone))} />
			{children}
		</span>
	)
}

function getIndicatorToneClass(tone: IndicatorTone | undefined): string | undefined {
	switch (tone) {
		case 'error':
			return concreteClassNames.progressError
		case 'muted':
			return concreteClassNames.indicatorMuted
		case 'sky':
			return concreteClassNames.progressSky
		case 'terminal':
			return concreteClassNames.progressTerminal
		case 'ultra':
			return concreteClassNames.progressUltra
		case 'default':
		case undefined:
			return undefined
	}
}
