import type { HTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { iconOptions, selectControl, selectOptionsControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import {
	getLabelToneClass,
	type LabelIconSlot,
	type LabelTone,
	renderLabelIconSlot
} from './label-helpers'
import { cn } from './utils'

const pillToneValues = ['default', 'ink', 'sky', 'sunken', 'terminal', 'ultra', 'error'] as const

export type LabelProps = HTMLAttributes<HTMLSpanElement> & {
	leadingIcon?: LabelIconSlot
	tone?: LabelTone
}

export function Pill({ children, className, leadingIcon, tone = 'default', ...props }: LabelProps) {
	return (
		<span className={cn(concreteClassNames.pill, getLabelToneClass(tone), className)} {...props}>
			{renderLabelIconSlot(leadingIcon)}
			{children}
		</span>
	)
}

export const pillPropsSchema = z
	.object({
		label: z.string().default('queued'),
		leadingIcon: z.string().optional(),
		tone: z.enum(pillToneValues).default('default')
	})
	.strict()

export const pillPrimitiveDefinition = defineConcretePrimitive({
	category: 'status',
	component: Pill,
	controls: [
		selectControl('tone', 'Tone', 'default', pillToneValues),
		selectOptionsControl('leadingIcon', 'Leading icon', '', iconOptions),
		textControl('label', 'Label', 'queued')
	],
	description: 'Quiet inline metadata label.',
	guidance:
		'Pills are passive metadata. Use them for short labels and status context, not for commands or high-emphasis alerts.',
	kind: 'primitive',
	name: 'Pill',
	pressure: ['product', 'editorial'],
	props: [
		prop(
			'tone',
			"'default' | 'ink' | 'sky' | 'sunken' | 'terminal' | 'ultra' | 'error'",
			'Inline label tone or quiet signal wash.',
			'default'
		),
		prop('leadingIcon', 'IconName | ReactElement', 'Optional leading glyph.'),
		prop('children', 'ReactNode', 'Pill label.')
	],
	renderExample: renderPillExample,
	schema: pillPropsSchema,
	slug: 'pill',
	states: states([
		['default', 'Quiet metadata pills.'],
		['signals', 'Signal tone pills.'],
		['icons', 'Pills with leading glyphs.']
	])
})

function renderPillExample(state = 'default') {
	switch (state) {
		case 'icons':
			return (
				<Frame>
					<Pill leadingIcon="file-text">memo</Pill>
					<Pill leadingIcon="sparkles" tone="ultra">
						generated
					</Pill>
					<Pill leadingIcon="activity" tone="terminal">
						running
					</Pill>
				</Frame>
			)
		case 'signals':
			return (
				<Frame>
					<Pill tone="terminal">live</Pill>
					<Pill tone="ultra">pro</Pill>
					<Pill tone="error">blocked</Pill>
				</Frame>
			)
		default:
			return (
				<Frame>
					<Pill>ink</Pill>
					<Pill tone="sunken">queued</Pill>
					<Pill tone="sky">pointer</Pill>
				</Frame>
			)
	}
}
