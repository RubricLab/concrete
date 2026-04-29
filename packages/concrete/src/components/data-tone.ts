import type { DataTone } from '../schemas'
import { concreteClassNames } from '../styles/class-names'

export function getMetricTrendTone(
	intent: 'negative' | 'neutral' | 'positive' | undefined
): DataTone {
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

export function toProgressTone(tone: DataTone): 'default' | 'error' | 'sky' | 'terminal' | 'ultra' {
	switch (tone) {
		case 'error':
			return 'error'
		case 'sky':
			return 'sky'
		case 'terminal':
			return 'terminal'
		case 'ultra':
			return 'ultra'
		case 'ink':
		case 'muted':
			return 'default'
	}
}

export function toIndicatorTone(
	tone: DataTone
): 'default' | 'error' | 'muted' | 'sky' | 'terminal' | 'ultra' {
	switch (tone) {
		case 'error':
			return 'error'
		case 'muted':
			return 'muted'
		case 'sky':
			return 'sky'
		case 'terminal':
			return 'terminal'
		case 'ultra':
			return 'ultra'
		case 'ink':
			return 'default'
	}
}

export function toSparklineTone(tone: DataTone): 'error' | 'neutral' | 'sky' | 'terminal' {
	switch (tone) {
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

export function getDataToneClass(tone: DataTone | undefined): string | undefined {
	switch (tone) {
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
