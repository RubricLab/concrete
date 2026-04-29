import type { HTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { ConcreteIcon } from '../icons'
import { booleanControl, selectControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { Row } from './row'
import { cn } from './utils'

export type CaretDirection = 'down' | 'right' | 'up'
export type CaretSize = 'large' | 'medium' | 'small'

export type CaretProps = HTMLAttributes<HTMLSpanElement> & {
	direction?: CaretDirection
	open?: boolean
	size?: CaretSize
}

export function Caret({
	className,
	direction = 'right',
	open = false,
	size = 'medium',
	...props
}: CaretProps) {
	return (
		<span
			aria-hidden
			className={cn(
				concreteClassNames.caret,
				open && concreteClassNames.caretOpen,
				direction === 'up' && concreteClassNames.caretUp,
				direction === 'down' && concreteClassNames.caretDown,
				size === 'small' && concreteClassNames.caretSmall,
				size === 'large' && concreteClassNames.caretLarge,
				className
			)}
			{...props}
		>
			<ConcreteIcon name="chevron-right" />
		</span>
	)
}

export const caretPropsSchema = z
	.object({
		direction: z.enum(['down', 'right', 'up']).default('right'),
		open: z.boolean().default(false),
		size: z.enum(['large', 'medium', 'small']).default('medium')
	})
	.strict()

export const caretPrimitiveDefinition = defineConcretePrimitive({
	category: 'control',
	component: Caret,
	controls: [
		selectControl('direction', 'Direction', 'right', ['right', 'down', 'up']),
		selectControl('size', 'Size', 'medium', ['small', 'medium', 'large']),
		booleanControl('open', 'Open', 'false')
	],
	description: 'Disclosure chevron with open, directional, and size states.',
	guidance:
		'Caret is an affordance, not decoration. Keep it currentColor, small, and baseline-aligned beside tree rows, accordions, and selects.',
	kind: 'primitive',
	name: 'Caret',
	pressure: ['product'],
	props: [
		prop('direction', "'right' | 'down' | 'up'", 'Base chevron orientation.', 'right'),
		prop('open', 'boolean', 'Rotates the caret to the disclosure-open state.', 'false'),
		prop('size', "'small' | 'medium' | 'large'", 'Caret box and stroke rhythm.', 'medium')
	],
	renderExample: renderCaretExample,
	schema: caretPropsSchema,
	slug: 'caret',
	states: states([
		['default', 'Closed disclosure affordance.'],
		['open', 'Open disclosure affordance.'],
		['direction', 'Directional variants.']
	])
})

function renderCaretExample() {
	return (
		<Frame>
			<Row leadingIcon={<Caret />} meta="closed">
				Environment variables
			</Row>
			<Row leadingIcon={<Caret open />} meta="open">
				Advanced settings
			</Row>
			<Row leadingIcon={<Caret direction="up" />} meta="up">
				Tree branch
			</Row>
		</Frame>
	)
}
