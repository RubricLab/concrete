import type { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { z } from 'zod/v4'
import { ConcreteIcon, type IconName } from '../icons'
import { iconOptions, selectControl, selectOptionsControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Button } from './button'
import { Frame } from './frame'
import { cn } from './utils'

const emptyStateSizeValues = ['small', 'medium', 'large'] as const
const emptyStateToneValues = ['default', 'sky'] as const

type EmptyStateIconSlot = IconName | ReactElement

export type EmptyStateSize = (typeof emptyStateSizeValues)[number]
export type EmptyStateTone = (typeof emptyStateToneValues)[number]

export type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	action?: ReactNode
	body?: ReactNode
	icon?: EmptyStateIconSlot
	size?: EmptyStateSize
	title: ReactNode
	tone?: EmptyStateTone
}

export function EmptyState({
	action,
	body,
	className,
	icon = 'search',
	size = 'medium',
	title,
	tone = 'default',
	...props
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				concreteClassNames.emptyState,
				getEmptyStateSizeClass(size),
				tone === 'sky' && concreteClassNames.emptyStateSky,
				className
			)}
			{...props}
		>
			<span className={concreteClassNames.mark}>{renderEmptyStateIconSlot(icon)}</span>
			<div>
				<h3 className={concreteClassNames.emptyTitle}>{title}</h3>
				{body ? <p className={concreteClassNames.emptyBody}>{body}</p> : null}
			</div>
			{action}
		</div>
	)
}

export const emptyStatePropsSchema = z
	.object({
		body: z.string().optional(),
		icon: z.string().default('search'),
		size: z.enum(emptyStateSizeValues).default('medium'),
		title: z.string().default('No matches'),
		tone: z.enum(emptyStateToneValues).default('default')
	})
	.strict()

export const emptyStatePrimitiveDefinition = defineConcretePrimitive({
	category: 'feedback',
	component: EmptyState,
	controls: [
		textControl('title', 'Title', 'No matches'),
		textControl('body', 'Body', 'Try a broader keyword.'),
		selectOptionsControl('leadingIcon', 'Icon', 'search', iconOptions),
		selectControl('size', 'Size', 'medium', emptyStateSizeValues),
		selectControl('tone', 'Tone', 'default', emptyStateToneValues)
	],
	description: 'Blank-slate composition with dashed glyph tile and terse copy.',
	guidance:
		'Empty states should explain the absence and offer one next action when useful. Keep copy direct and avoid decorative illustration.',
	kind: 'primitive',
	name: 'Empty state',
	pressure: ['product', 'educational'],
	props: [
		prop('title', 'ReactNode', 'Primary blank-state message.', '', true),
		prop('body', 'ReactNode', 'Muted explanation.'),
		prop('icon', 'IconName | ReactElement', 'Glyph inside the dashed mark tile.', 'search'),
		prop('size', "'small' | 'medium' | 'large'", 'Mark tile scale.', 'medium'),
		prop('tone', "'default' | 'sky'", 'Default ink or sky mark treatment.', 'default'),
		prop('action', 'ReactNode', 'Optional CTA row.')
	],
	renderExample: renderEmptyStateExample,
	schema: emptyStatePropsSchema,
	slug: 'empty-state',
	states: states([
		['default', 'Blank-slate message with action.'],
		['small', 'Compact empty state.'],
		['sky', 'Sky-accented empty state.']
	])
})

function renderEmptyStateExample(state = 'default') {
	return (
		<Frame>
			<EmptyState
				action={state === 'small' ? undefined : <Button variant="primary">New search</Button>}
				body="Try a broader keyword, or clear the filters applied to this view."
				size={state === 'small' ? 'small' : 'medium'}
				title="No matches"
				tone={state === 'sky' ? 'sky' : 'default'}
			/>
		</Frame>
	)
}

function getEmptyStateSizeClass(size: EmptyStateSize): string | undefined {
	switch (size) {
		case 'large':
			return concreteClassNames.emptyStateLarge
		case 'medium':
			return undefined
		case 'small':
			return concreteClassNames.emptyStateSmall
	}
}

function renderEmptyStateIconSlot(icon: EmptyStateIconSlot | undefined): ReactNode {
	switch (typeof icon) {
		case 'string':
			return <ConcreteIcon name={icon} />
		default:
			return icon
	}
}
