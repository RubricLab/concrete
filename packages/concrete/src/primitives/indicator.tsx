import type { HTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import type { ConcreteSignal } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

const indicatorToneValues = ['default', 'muted', 'sky', 'terminal', 'ultra', 'error'] as const

export type IndicatorTone = 'default' | ConcreteSignal | 'muted' | 'sky'

export type IndicatorProps = HTMLAttributes<HTMLSpanElement> & {
	tone?: IndicatorTone
}

export function Indicator({ children, className, tone = 'default', ...props }: IndicatorProps) {
	return (
		<span className={cn(concreteClassNames.indicator, className)} {...props}>
			<span className={cn(concreteClassNames.indicatorDot, getIndicatorToneClass(tone))} />
			{children}
		</span>
	)
}

export const indicatorPropsSchema = z
	.object({
		label: z.string().default('Running'),
		tone: z.enum(indicatorToneValues).default('default')
	})
	.strict()

export const indicatorPrimitiveDefinition = defineConcretePrimitive({
	category: 'data',
	component: Indicator,
	controls: [
		selectControl('tone', 'Tone', 'default', indicatorToneValues),
		textControl('label', 'Label', 'Running')
	],
	description: 'Dot, legend, and series key punctuation for data surfaces and live rows.',
	guidance:
		'Indicators punctuate status and legends. Keep the label nearby and avoid using the dot as the only carrier of meaning.',
	kind: 'primitive',
	name: 'Indicator',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'tone',
			"'default' | 'muted' | 'sky' | 'terminal' | 'ultra' | 'error'",
			'Dot color and semantic role.',
			'default'
		),
		prop('children', 'ReactNode', 'Indicator label.')
	],
	renderExample: renderIndicatorExample,
	schema: indicatorPropsSchema,
	slug: 'indicator',
	states: states([
		['default', 'Status indicators.'],
		['muted', 'Muted legend indicators.']
	])
})

function renderIndicatorExample(state = 'default') {
	return (
		<Frame>
			<Indicator tone="terminal">Running</Indicator>
			<Indicator tone="sky">Queued</Indicator>
			<Indicator tone="error">Failed</Indicator>
			{state === 'muted' ? <Indicator tone="muted">Background</Indicator> : null}
		</Frame>
	)
}

function getIndicatorToneClass(tone: IndicatorTone | undefined): string | undefined {
	switch (tone) {
		case 'error':
			return concreteClassNames.progressError
		case 'muted':
			return concreteClassNames.indicatorMuted
		case 'sky':
			return concreteClassNames.progressSky
		case 'terminal':
			return concreteClassNames.progressTerminal
		case 'ultra':
			return concreteClassNames.progressUltra
		case 'default':
		case undefined:
			return undefined
	}
}
