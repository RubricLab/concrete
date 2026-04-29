import type { HTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
	label?: ReactNode
}

export function Divider({ className, label, ...props }: DividerProps) {
	return (
		<div className={cn(concreteClassNames.divider, className)} {...props}>
			{label}
		</div>
	)
}

export const dividerPropsSchema = z
	.object({
		label: z.string().optional()
	})
	.strict()

export const dividerPrimitiveDefinition = defineConcretePrimitive({
	category: 'layout',
	component: Divider,
	controls: [textControl('label', 'Label', 'Section')],
	description: 'Hairline separator with optional mono label.',
	guidance:
		'Dividers separate dense groups without adding surface weight. Prefer labels only when the section name materially helps scanning.',
	kind: 'primitive',
	name: 'Divider',
	pressure: ['product', 'editorial'],
	props: [prop('label', 'ReactNode', 'Optional mono caps label centered in the rule.')],
	renderExample: renderDividerExample,
	schema: dividerPropsSchema,
	slug: 'divider',
	states: states([
		['default', 'Unlabeled rule.'],
		['label', 'Labeled section separator.']
	])
})

function renderDividerExample(state = 'default') {
	return (
		<Frame>
			<Divider label={state === 'label' ? 'Signals' : undefined} />
		</Frame>
	)
}
