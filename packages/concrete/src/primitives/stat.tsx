import type { HTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Delta } from './delta'
import { Frame } from './frame'
import { cn } from './utils'

const statSizeValues = ['xsmall', 'small', 'medium', 'large', 'xlarge'] as const
const statToneValues = ['default', 'muted', 'sky'] as const
const statVariantValues = ['lockup', 'numeric', 'display'] as const

export type StatSize = (typeof statSizeValues)[number]
export type StatTone = (typeof statToneValues)[number]
export type StatVariant = (typeof statVariantValues)[number]

export type StatProps = HTMLAttributes<HTMLDivElement> & {
	delta?: ReactNode
	label?: ReactNode
	meta?: ReactNode
	size?: StatSize
	tone?: StatTone
	unit?: ReactNode
	value: ReactNode
	variant?: StatVariant
}

export function Stat({
	className,
	delta,
	label,
	meta,
	size = 'medium',
	tone = 'default',
	unit,
	value,
	variant = 'lockup',
	...props
}: StatProps) {
	if (variant === 'numeric' || variant === 'display') {
		return (
			<div
				className={cn(
					concreteClassNames.statNumber,
					variant === 'display' && concreteClassNames.statDisplay,
					getStatSizeClass(size),
					getStatToneClass(tone),
					className
				)}
				{...props}
			>
				{value}
				{unit ? <span className={concreteClassNames.statUnit}>{unit}</span> : null}
			</div>
		)
	}

	return (
		<div className={cn(concreteClassNames.stat, getStatToneClass(tone), className)} {...props}>
			{label ? <span className={concreteClassNames.statLabel}>{label}</span> : null}
			<span className={cn(concreteClassNames.statValue, getStatSizeClass(size))}>
				{value}
				{unit ? <span className={concreteClassNames.statUnit}>{unit}</span> : null}
			</span>
			{delta || meta ? (
				<span className={concreteClassNames.statMeta}>
					{delta}
					{meta}
				</span>
			) : null}
		</div>
	)
}

export const statPropsSchema = z
	.object({
		label: z.string().optional(),
		meta: z.string().optional(),
		size: z.enum(statSizeValues).default('medium'),
		tone: z.enum(statToneValues).default('default'),
		unit: z.string().optional(),
		value: z.string().default('14.8k'),
		variant: z.enum(statVariantValues).default('lockup')
	})
	.strict()

export const statPrimitiveDefinition = defineConcretePrimitive({
	category: 'data',
	component: Stat,
	controls: [
		textControl('label', 'Label', 'Runs'),
		textControl('value', 'Value', '14.8k'),
		textControl('unit', 'Unit', ''),
		selectControl('variant', 'Variant', 'lockup', statVariantValues),
		selectControl('size', 'Size', 'medium', statSizeValues),
		selectControl('tone', 'Tone', 'default', statToneValues),
		textControl('meta', 'Meta', 'last 7d')
	],
	description: 'KPI number lockup for dense dashboards.',
	guidance:
		'Stats are scan targets. Keep labels short, pair deltas sparingly, and use display scale only for editorial emphasis.',
	kind: 'primitive',
	name: 'Stat',
	pressure: ['product', 'generative'],
	props: [
		prop('label', 'ReactNode', 'Optional metric label for lockups.'),
		prop('value', 'ReactNode', 'Large numeric value.', '', true),
		prop('unit', 'ReactNode', 'Baseline unit suffix.'),
		prop(
			'variant',
			"'lockup' | 'numeric' | 'display'",
			'Dashboard or editorial numeric treatment.',
			'lockup'
		),
		prop('size', "'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'", 'Numeric scale.', 'medium'),
		prop('tone', "'default' | 'muted' | 'sky'", 'Numeric color treatment.', 'default'),
		prop('delta', 'ReactNode', 'Optional Delta slot.'),
		prop('meta', 'ReactNode', 'Optional muted suffix.')
	],
	renderExample: renderStatExample,
	schema: statPropsSchema,
	slug: 'stat',
	states: states([
		['default', 'Dashboard stat lockup.'],
		['numeric', 'Standalone numeric treatment.'],
		['display', 'Editorial display treatment.']
	])
})

function renderStatExample(state = 'default') {
	switch (state) {
		case 'display':
			return (
				<Frame>
					<Stat size="xlarge" value="98.2" variant="display" />
					<Stat tone="sky" unit="%" value="42" variant="display" />
				</Frame>
			)
		case 'numeric':
			return (
				<Frame>
					<Stat size="large" unit="ms" value="184" variant="numeric" />
					<Stat tone="muted" value="0.04" variant="numeric" />
				</Frame>
			)
		default:
			return (
				<Frame>
					<Stat
						delta={<Delta intent="positive" value="18.6%" />}
						label="Runs"
						meta=" last 7d"
						value="14.8k"
					/>
				</Frame>
			)
	}
}

function getStatSizeClass(size: StatSize): string | undefined {
	switch (size) {
		case 'large':
			return concreteClassNames.statLarge
		case 'medium':
			return undefined
		case 'small':
			return concreteClassNames.statSmall
		case 'xlarge':
			return concreteClassNames.statXlarge
		case 'xsmall':
			return concreteClassNames.statXsmall
	}
}

function getStatToneClass(tone: StatTone): string | undefined {
	switch (tone) {
		case 'default':
			return undefined
		case 'muted':
			return concreteClassNames.statMuted
		case 'sky':
			return concreteClassNames.statSky
	}
}
