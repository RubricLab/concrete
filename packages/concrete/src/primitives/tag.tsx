import type { HTMLAttributes } from 'react'
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
import type { ConcreteSignal } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import {
	getLabelToneClass,
	type LabelIconSlot,
	type LabelTone,
	renderLabelIconSlot
} from './label-helpers'
import { cn } from './utils'

const tagSizeValues = ['small', 'medium', 'large'] as const
const tagToneValues = ['default', 'ink', 'sky', 'sunken', 'terminal', 'ultra', 'error'] as const
const tagVariantValues = ['default', 'outline', 'active', 'selected'] as const

export type TagSize = (typeof tagSizeValues)[number]
export type TagTone = ConcreteSignal | LabelTone
export type TagVariant = (typeof tagVariantValues)[number]

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
	dismissible?: boolean
	leadingIcon?: LabelIconSlot
	onDismiss?: () => void
	size?: TagSize
	tone?: TagTone
	variant?: TagVariant
}

export function Tag({
	children,
	className,
	dismissible = false,
	leadingIcon,
	onDismiss,
	size = 'medium',
	tone = 'default',
	variant = 'default',
	...props
}: TagProps) {
	return (
		<span
			className={cn(
				concreteClassNames.tag,
				getTagToneClass(tone),
				getTagVariantClass(variant),
				getTagSizeClass(size),
				className
			)}
			{...props}
		>
			{variant === 'selected' && !leadingIcon ? (
				<ConcreteIcon name="check" />
			) : (
				renderLabelIconSlot(leadingIcon)
			)}
			{children}
			{dismissible || onDismiss ? (
				<button
					aria-label="Dismiss tag"
					className={concreteClassNames.tagClose}
					onClick={onDismiss}
					type="button"
				>
					<ConcreteIcon name="x" />
				</button>
			) : null}
		</span>
	)
}

export const tagPropsSchema = z
	.object({
		dismissible: z.boolean().default(false),
		label: z.string().default('concrete'),
		leadingIcon: z.string().optional(),
		size: z.enum(tagSizeValues).default('medium'),
		tone: z.enum(tagToneValues).default('default'),
		variant: z.enum(tagVariantValues).default('default')
	})
	.strict()

export const tagPrimitiveDefinition = defineConcretePrimitive({
	category: 'status',
	component: Tag,
	controls: [
		selectControl('tone', 'Tone', 'default', tagToneValues),
		selectControl('variant', 'Variant', 'default', tagVariantValues),
		selectControl('size', 'Size', 'medium', tagSizeValues),
		selectOptionsControl('leadingIcon', 'Leading icon', '', iconOptions),
		booleanControl('dismissible', 'Dismissible', 'true'),
		textControl('label', 'Label', 'concrete')
	],
	description: 'Closeable filter or entity label.',
	guidance:
		'Tags identify entities, filters, and scoped state. Use dismissible tags only when removal is available in the surrounding workflow.',
	kind: 'primitive',
	name: 'Tag',
	pressure: ['product'],
	props: [
		prop(
			'tone',
			"'default' | 'ink' | 'sky' | 'sunken' | 'terminal' | 'ultra' | 'error'",
			'Inline label tone or signal wash.',
			'default'
		),
		prop('variant', "'default' | 'outline' | 'active' | 'selected'", 'Tag emphasis.', 'default'),
		prop('size', "'small' | 'medium' | 'large'", 'Tag height and type rhythm.', 'medium'),
		prop('leadingIcon', 'IconName | ReactElement', 'Optional leading glyph.'),
		prop('dismissible', 'boolean', 'Shows a passive dismiss affordance.', 'false'),
		prop('onDismiss', '() => void', 'Interactive dismiss action.'),
		prop('children', 'ReactNode', 'Tag label.')
	],
	renderExample: renderTagExample,
	schema: tagPropsSchema,
	slug: 'tag',
	states: states([
		['default', 'Entity tag with icon.'],
		['variants', 'Outline, active, and selected treatments.'],
		['sizes', 'Small, medium, and large rhythm.']
	])
})

function renderTagExample(state = 'default') {
	switch (state) {
		case 'sizes':
			return (
				<Frame>
					<Tag size="small">small</Tag>
					<Tag size="medium">medium</Tag>
					<Tag size="large">large</Tag>
				</Frame>
			)
		case 'variants':
			return (
				<Frame>
					<Tag variant="outline">Outline</Tag>
					<Tag tone="sky" variant="active">
						Active
					</Tag>
					<Tag variant="selected">Selected</Tag>
					<Tag dismissible tone="terminal">
						Running
					</Tag>
				</Frame>
			)
		default:
			return (
				<Frame>
					<Tag leadingIcon="filter" tone="sky">
						Agents
					</Tag>
					<Tag tone="sunken">Docs</Tag>
					<Tag dismissible>concrete</Tag>
				</Frame>
			)
	}
}

function getTagToneClass(tone: TagTone): string | undefined {
	switch (tone) {
		case 'error':
			return concreteClassNames.tagError
		case 'sky':
			return concreteClassNames.tagSky
		case 'terminal':
			return concreteClassNames.tagTerminal
		case 'ultra':
			return concreteClassNames.tagUltra
		default:
			return getLabelToneClass(tone)
	}
}

function getTagVariantClass(variant: TagVariant): string | undefined {
	switch (variant) {
		case 'active':
			return concreteClassNames.tagActive
		case 'default':
			return undefined
		case 'outline':
			return concreteClassNames.tagOutline
		case 'selected':
			return concreteClassNames.tagSelected
	}
}

function getTagSizeClass(size: TagSize): string | undefined {
	switch (size) {
		case 'large':
			return concreteClassNames.tagLarge
		case 'medium':
			return undefined
		case 'small':
			return concreteClassNames.tagSmall
	}
}
