import type { DataIntent } from '../schemas'
import { concreteClassNames } from '../styles/class-names'

export function getMetricTrendIntent(
	intent: 'negative' | 'neutral' | 'positive' | undefined
): DataIntent {
	switch (intent) {
		case 'negative':
			return 'error'
		case 'positive':
			return 'terminal'
		case 'neutral':
		case undefined:
			return 'sky'
	}
}

export function toProgressIntent(
	intent: DataIntent
): 'danger' | 'neutral' | 'sky' | 'terminal' | 'ultra' {
	switch (intent) {
		case 'error':
			return 'danger'
		case 'sky':
			return 'sky'
		case 'terminal':
			return 'terminal'
		case 'ultra':
			return 'ultra'
		case 'ink':
		case 'muted':
			return 'neutral'
	}
}

export function toIndicatorIntent(
	intent: DataIntent
): 'danger' | 'muted' | 'neutral' | 'sky' | 'terminal' | 'ultra' {
	switch (intent) {
		case 'error':
			return 'danger'
		case 'muted':
			return 'muted'
		case 'sky':
			return 'sky'
		case 'terminal':
			return 'terminal'
		case 'ultra':
			return 'ultra'
		case 'ink':
			return 'neutral'
	}
}

export function toSparklineIntent(intent: DataIntent): 'error' | 'neutral' | 'sky' | 'terminal' {
	switch (intent) {
		case 'error':
			return 'error'
		case 'terminal':
			return 'terminal'
		case 'ink':
		case 'muted':
		case 'ultra':
			return 'neutral'
		case 'sky':
			return 'sky'
	}
}

export function getDataIntentClass(intent: DataIntent | undefined): string | undefined {
	switch (intent) {
		case 'error':
			return concreteClassNames.dataToneError
		case 'muted':
			return concreteClassNames.dataToneMuted
		case 'sky':
			return concreteClassNames.dataToneSky
		case 'terminal':
			return concreteClassNames.dataToneTerminal
		case 'ultra':
			return concreteClassNames.dataToneUltra
		case 'ink':
		case undefined:
			return undefined
	}
}
