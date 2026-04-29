import type { HTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

const deltaIntentValues = ['positive', 'negative', 'neutral'] as const
const deltaSizeValues = ['small', 'medium', 'large', 'xlarge'] as const
const deltaVariantValues = ['bare', 'wash'] as const

export type DeltaIntent = (typeof deltaIntentValues)[number]
export type DeltaSize = (typeof deltaSizeValues)[number]
export type DeltaVariant = (typeof deltaVariantValues)[number]

export type DeltaProps = HTMLAttributes<HTMLSpanElement> & {
	basis?: ReactNode
	intent?: DeltaIntent
	size?: DeltaSize
	value: string
	variant?: DeltaVariant
}

export function Delta({
	basis,
	className,
	intent = 'neutral',
	size = 'medium',
	value,
	variant = 'bare',
	...props
}: DeltaProps) {
	return (
		<span
			className={cn(
				concreteClassNames.delta,
				getDeltaIntentClass(intent),
				getDeltaSizeClass(size),
				variant === 'wash' && concreteClassNames.deltaWash,
				className
			)}
			{...props}
		>
			<span aria-hidden className={concreteClassNames.deltaIcon}>
				{renderDeltaIcon(intent)}
			</span>
			<span>{value}</span>
			{basis ? <span className={concreteClassNames.deltaBasis}>{basis}</span> : null}
		</span>
	)
}

export const deltaPropsSchema = z
	.object({
		basis: z.string().optional(),
		intent: z.enum(deltaIntentValues).default('neutral'),
		size: z.enum(deltaSizeValues).default('medium'),
		value: z.string().default('18.6%'),
		variant: z.enum(deltaVariantValues).default('bare')
	})
	.strict()

export const deltaPrimitiveDefinition = defineConcretePrimitive({
	category: 'data',
	component: Delta,
	controls: [
		selectControl('intent', 'Intent', 'neutral', deltaIntentValues),
		selectControl('size', 'Size', 'medium', deltaSizeValues),
		selectControl('variant', 'Variant', 'bare', deltaVariantValues),
		textControl('value', 'Value', '18.6%'),
		textControl('basis', 'Basis', '')
	],
	description: 'Compact change indicator using terminal, error, or neutral ink.',
	guidance:
		'Delta is a numeric modifier. Keep the value concise and include basis only when the comparison would otherwise be unclear.',
	kind: 'primitive',
	name: 'Delta',
	pressure: ['product'],
	props: [
		prop('value', 'string', 'Formatted delta text.', '', true),
		prop(
			'intent',
			"'positive' | 'negative' | 'neutral'",
			'Terminal, error, or neutral ink treatment.',
			'neutral'
		),
		prop('size', "'small' | 'medium' | 'large' | 'xlarge'", 'Delta type and icon scale.', 'medium'),
		prop('variant', "'bare' | 'wash'", 'Plain inline delta or soft tinted chip.', 'bare'),
		prop('basis', 'ReactNode', 'Optional comparison basis text.')
	],
	renderExample: renderDeltaExample,
	schema: deltaPropsSchema,
	slug: 'delta',
	states: states([
		['default', 'Positive, negative, and neutral deltas.'],
		['wash', 'Soft filled delta treatment.']
	])
})

function renderDeltaExample(state = 'default') {
	return (
		<Frame>
			<Delta intent="positive" value="18.6%" variant={state === 'wash' ? 'wash' : 'bare'} />
			<Delta intent="negative" value="-2.4%" variant={state === 'wash' ? 'wash' : 'bare'} />
			<Delta value="0.0%" />
		</Frame>
	)
}

function renderDeltaIcon(intent: DeltaIntent): ReactNode {
	switch (intent) {
		case 'negative':
			return (
				<svg aria-hidden="true" viewBox="0 0 12 12">
					<path d="M3 3L9 9" />
					<path d="M5 9h4V5" />
				</svg>
			)
		case 'neutral':
			return (
				<svg aria-hidden="true" viewBox="0 0 12 12">
					<path d="M2.5 6h7" />
				</svg>
			)
		case 'positive':
			return (
				<svg aria-hidden="true" viewBox="0 0 12 12">
					<path d="M3 9L9 3" />
					<path d="M5 3h4v4" />
				</svg>
			)
	}
}

function getDeltaIntentClass(intent: DeltaIntent): string | undefined {
	switch (intent) {
		case 'negative':
			return concreteClassNames.deltaNegative
		case 'neutral':
			return concreteClassNames.deltaNeutral
		case 'positive':
			return concreteClassNames.deltaPositive
	}
}

function getDeltaSizeClass(size: DeltaSize): string | undefined {
	switch (size) {
		case 'large':
			return concreteClassNames.deltaLarge
		case 'medium':
			return undefined
		case 'small':
			return concreteClassNames.deltaSmall
		case 'xlarge':
			return concreteClassNames.deltaXlarge
	}
}
