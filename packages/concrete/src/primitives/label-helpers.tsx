import type { ReactElement, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../icons'
import { concreteClassNames } from '../styles/class-names'

export type LabelIconSlot = IconName | ReactElement
export const labelIntentValues = [
	'danger',
	'neutral',
	'sky',
	'strong',
	'subtle',
	'terminal',
	'ultra'
] as const

export type LabelIntent = (typeof labelIntentValues)[number]

export function renderLabelIconSlot(icon: LabelIconSlot | undefined): ReactNode {
	switch (typeof icon) {
		case 'string':
			return <ConcreteIcon name={icon} />
		default:
			return icon
	}
}

export function getLabelIntentClass(intent: LabelIntent): string | undefined {
	switch (intent) {
		case 'neutral':
			return undefined
		case 'danger':
			return concreteClassNames.labelError
		case 'strong':
			return concreteClassNames.labelInk
		case 'sky':
			return concreteClassNames.labelSky
		case 'subtle':
			return concreteClassNames.labelSunken
		case 'terminal':
			return concreteClassNames.labelTerminal
		case 'ultra':
			return concreteClassNames.labelUltra
	}
}
