import type { HTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

export type CardVariant = 'default' | 'raised' | 'sunken'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
	description?: ReactNode
	interactive?: boolean
	title?: ReactNode
	variant?: CardVariant
}

export function Card({
	children,
	className,
	description,
	interactive = false,
	title,
	variant = 'default',
	...props
}: CardProps) {
	return (
		<div
			className={cn(
				concreteClassNames.card,
				variant === 'raised' && concreteClassNames.cardRaised,
				variant === 'sunken' && concreteClassNames.cardSunken,
				interactive && concreteClassNames.cardInteractive,
				className
			)}
			{...props}
		>
			{title ? <b className={concreteClassNames.cardTitle}>{title}</b> : null}
			{description ? <p className={concreteClassNames.cardBody}>{description}</p> : null}
			{children}
		</div>
	)
}

export const cardPropsSchema = z
	.object({
		description: z.string().optional(),
		interactive: z.boolean().default(false),
		title: z.string().optional(),
		variant: z.enum(['default', 'raised', 'sunken']).default('default')
	})
	.strict()

export const cardPrimitiveDefinition = defineConcretePrimitive({
	category: 'surface',
	component: Card,
	controls: [
		selectControl('variant', 'Variant', 'default', ['default', 'raised', 'sunken']),
		booleanControl('interactive', 'Interactive', 'false'),
		textControl('title', 'Title', 'Default'),
		textControl('description', 'Description', 'Border only. The canonical surface.')
	],
	description: 'Hairline surface primitive with raised, sunken, and interactive variants.',
	guidance:
		'Cards are bounded content surfaces. Prefer bare sections for page structure and cards only for repeated items, modals, or framed tools.',
	kind: 'primitive',
	name: 'Card',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: [
		prop('variant', "'default' | 'raised' | 'sunken'", 'Surface depth treatment.', 'default'),
		prop('interactive', 'boolean', 'Adds hover affordance for clickable card compositions.', 'false'),
		prop('title', 'ReactNode', 'Optional compact title.'),
		prop('description', 'ReactNode', 'Optional supporting copy.'),
		prop('children', 'ReactNode', 'Card content slot.')
	],
	renderExample: renderCardExample,
	schema: cardPropsSchema,
	slug: 'card',
	states: states([
		['default', 'Default hairline surface.'],
		['raised', 'One step of elevation above canvas.'],
		['sunken', 'Recessed surface for code, quotes, and wells.']
	])
})

function renderCardExample(_state = 'default') {
	return (
		<Frame>
			<Card description="Border only. The canonical surface." title="Default" />
			<Card description="One step of elevation over canvas." title="Raised" variant="raised" />
			<Card description="Recessed. Code, quotes, wells." title="Sunken" variant="sunken" />
		</Frame>
	)
}
