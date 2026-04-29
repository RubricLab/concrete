import type { HTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

const bubbleDirectionValues = ['inbound', 'outbound'] as const

export type BubbleDirection = (typeof bubbleDirectionValues)[number]

export type BubbleProps = HTMLAttributes<HTMLDivElement> & {
	direction?: BubbleDirection
}

export function Bubble({ children, className, direction = 'inbound', ...props }: BubbleProps) {
	return (
		<div
			className={cn(
				concreteClassNames.bubble,
				direction === 'outbound' && concreteClassNames.bubbleOutbound,
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
}

export const bubblePropsSchema = z
	.object({
		direction: z.enum(bubbleDirectionValues).default('inbound'),
		text: z.string().default('Concrete keeps conversational UI crisp.')
	})
	.strict()

export const bubblePrimitiveDefinition = defineConcretePrimitive({
	category: 'surface',
	component: Bubble,
	controls: [
		selectControl('direction', 'Direction', 'inbound', bubbleDirectionValues),
		textControl('text', 'Text', 'Concrete keeps conversational UI crisp.')
	],
	description: 'Compact conversational message surface.',
	guidance:
		'Bubbles are message atoms. Use them for transcript content and let higher-level message components own avatars, actions, and tool state.',
	kind: 'primitive',
	name: 'Bubble',
	pressure: ['generative', 'product'],
	props: [
		prop(
			'direction',
			"'inbound' | 'outbound'",
			'Controls neutral or ink-filled message treatment.',
			'inbound'
		),
		prop('children', 'ReactNode', 'Bubble content.')
	],
	renderExample: renderBubbleExample,
	schema: bubblePropsSchema,
	slug: 'bubble',
	states: states([
		['default', 'Inbound assistant message.'],
		['outbound', 'Outbound user message.']
	])
})

function renderBubbleExample(state = 'default') {
	return (
		<Frame>
			<Bubble>Concrete keeps conversational UI crisp.</Bubble>
			<Bubble direction={state === 'outbound' ? 'outbound' : 'inbound'}>
				Ship the primitive set.
			</Bubble>
		</Frame>
	)
}
