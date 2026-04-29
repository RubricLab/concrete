import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { ConcreteIcon } from '../icons'
import {
	booleanControl,
	iconOptions,
	selectControl,
	selectOptionsControl,
	textControl
} from '../registry/controls'
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

const chipToneValues = ['default', 'ink', 'sky', 'sunken'] as const

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	children?: ReactNode
	leadingIcon?: LabelIconSlot
	selected?: boolean
	tone?: LabelTone
}

export function Chip({
	children,
	className,
	leadingIcon,
	selected = false,
	tone = 'default',
	...props
}: ChipProps) {
	return (
		<button
			className={cn(
				concreteClassNames.chip,
				selected ? concreteClassNames.chipSelected : getLabelToneClass(tone),
				className
			)}
			type="button"
			{...props}
		>
			{selected && !leadingIcon ? <ConcreteIcon name="check" /> : renderLabelIconSlot(leadingIcon)}
			{children}
		</button>
	)
}

export const chipPropsSchema = z
	.object({
		label: z.string().default('Filter'),
		leadingIcon: z.string().optional(),
		selected: z.boolean().default(false),
		tone: z.enum(chipToneValues).default('default')
	})
	.strict()

export const chipPrimitiveDefinition = defineConcretePrimitive({
	category: 'control',
	component: Chip,
	controls: [
		booleanControl('selected', 'Selected', 'false'),
		selectControl('tone', 'Tone', 'default', chipToneValues),
		selectOptionsControl('leadingIcon', 'Leading icon', '', iconOptions),
		textControl('label', 'Label', 'Filter')
	],
	description: 'Selectable inline filter or segmented choice atom.',
	guidance:
		'Chips are compact choices. Use selected for active filters and keep non-selected tone quiet unless the filter group needs a visual anchor.',
	kind: 'primitive',
	name: 'Chip',
	pressure: ['product'],
	props: [
		prop('selected', 'boolean', 'Promotes the chip into the active ink state.', 'false'),
		prop('tone', "'default' | 'ink' | 'sky' | 'sunken'", 'Non-selected tonal treatment.', 'default'),
		prop('leadingIcon', 'IconName | ReactElement', 'Optional leading glyph.'),
		prop('children', 'ReactNode', 'Chip label.')
	],
	renderExample: renderChipExample,
	schema: chipPropsSchema,
	slug: 'chip',
	states: states([
		['default', 'Filter chips with a selected state.'],
		['tones', 'Available non-selected tones.'],
		['icons', 'Icon and selected-check behavior.']
	])
})

function renderChipExample(state = 'default') {
	switch (state) {
		case 'icons':
			return (
				<Frame>
					<Chip leadingIcon="filter">Filtered</Chip>
					<Chip leadingIcon="sparkles" tone="sky">
						Generated
					</Chip>
					<Chip selected>Product</Chip>
				</Frame>
			)
		case 'tones':
			return (
				<Frame>
					<Chip>Default</Chip>
					<Chip tone="ink">Ink</Chip>
					<Chip tone="sky">Sky</Chip>
					<Chip tone="sunken">Sunken</Chip>
				</Frame>
			)
		default:
			return (
				<Frame>
					<Chip selected>Product</Chip>
					<Chip>Generative</Chip>
					<Chip tone="sky">Editorial</Chip>
				</Frame>
			)
	}
}
