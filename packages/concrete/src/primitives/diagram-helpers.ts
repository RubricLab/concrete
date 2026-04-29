import type { DiagramTone } from '../schemas'
import { concreteClassNames } from '../styles/class-names'

export function getDiagramToneClass(tone: DiagramTone): string | undefined {
	switch (tone) {
		case 'error':
			return concreteClassNames.diagramToneError
		case 'ink':
			return concreteClassNames.diagramToneInk
		case 'muted':
			return undefined
		case 'sky':
			return concreteClassNames.diagramToneSky
		case 'terminal':
			return concreteClassNames.diagramToneTerminal
		case 'ultra':
			return concreteClassNames.diagramToneUltra
	}
}
