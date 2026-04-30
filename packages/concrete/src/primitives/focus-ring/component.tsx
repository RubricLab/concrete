import type { ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { Button } from '../button'

export type FocusRingPreviewProps = {
	label?: ReactNode
}

export function FocusRingPreview({ label = 'Focused' }: FocusRingPreviewProps) {
	return (
		<Button className={concreteClassNames.focusRingPreview} variant="secondary">
			{label}
		</Button>
	)
}
