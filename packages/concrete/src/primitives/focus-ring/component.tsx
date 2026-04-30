import type { ReactNode } from 'react'
import { Button } from '../button'

export type FocusRingPreviewProps = {
	label?: ReactNode
}

export function FocusRingPreview({ label = 'Focused' }: FocusRingPreviewProps) {
	return (
		<Button style={{ boxShadow: 'var(--concrete-ring-focus)' }} variant="secondary">
			{label}
		</Button>
	)
}
