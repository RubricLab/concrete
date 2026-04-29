import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { Button } from './button'
import { Frame } from './frame'

export type FocusRingPreviewProps = {
	label?: ReactNode
}

export const focusRingPropsSchema = z
	.object({
		label: z.string().default('Focused')
	})
	.strict()

export const focusRingPrimitiveDefinition = defineConcretePrimitive({
	category: 'foundation',
	component: FocusRingPreview,
	controls: [textControl('label', 'Label', 'Focused')],
	description: 'Single 3px sky ring standard applied to interactive atoms.',
	guidance:
		'Focus rings are a foundation token. Consume the shared token through Concrete primitives instead of restyling focus locally.',
	kind: 'primitive',
	name: 'Focus ring',
	pressure: ['product'],
	props: [prop('token', '--concrete-ring-focus', 'Global token applied through :focus-visible.')],
	renderExample: renderFocusRingExample,
	schema: focusRingPropsSchema,
	slug: 'focus-ring',
	states: states([['default', 'Shared focus ring token preview.']])
})

export function FocusRingPreview({ label = 'Focused' }: FocusRingPreviewProps) {
	return (
		<Button style={{ boxShadow: 'var(--concrete-ring-focus)' }} variant="secondary">
			{label}
		</Button>
	)
}

function renderFocusRingExample() {
	return (
		<Frame>
			<FocusRingPreview />
		</Frame>
	)
}
