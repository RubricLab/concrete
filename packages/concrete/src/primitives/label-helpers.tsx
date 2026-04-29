import type { ReactElement, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../icons'
import type { ConcreteSignal } from '../schemas'
import { concreteClassNames } from '../styles/class-names'

export type LabelIconSlot = IconName | ReactElement
export type LabelTone = 'default' | 'ink' | 'sky' | 'sunken' | ConcreteSignal

export function renderLabelIconSlot(icon: LabelIconSlot | undefined): ReactNode {
	switch (typeof icon) {
		case 'string':
			return <ConcreteIcon name={icon} />
		default:
			return icon
	}
}

export function getLabelToneClass(tone: LabelTone): string | undefined {
	switch (tone) {
		case 'default':
			return undefined
		case 'error':
			return concreteClassNames.labelError
		case 'ink':
			return concreteClassNames.labelInk
		case 'sky':
			return concreteClassNames.labelSky
		case 'sunken':
			return concreteClassNames.labelSunken
		case 'terminal':
			return concreteClassNames.labelTerminal
		case 'ultra':
			return concreteClassNames.labelUltra
	}
}
