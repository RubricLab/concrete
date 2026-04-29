import type { HTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Button } from './button'
import { Frame } from './frame'
import { cn } from './utils'

const tooltipPlacementValues = ['top', 'right', 'bottom', 'left'] as const

export type TooltipPlacement = (typeof tooltipPlacementValues)[number]

export type TooltipProps = HTMLAttributes<HTMLSpanElement> & {
	content?: ReactNode
	forceOpen?: boolean
	placement?: TooltipPlacement
	shortcut?: readonly string[]
	title?: ReactNode
}

export function Tooltip({
	children,
	className,
	content,
	forceOpen = false,
	placement = 'top',
	shortcut,
	title,
	...props
}: TooltipProps) {
	if (!content && !title) {
		return (
			<span className={cn(concreteClassNames.tooltipBubble, className)} role="tooltip" {...props}>
				{children}
			</span>
		)
	}

	return (
		<span className={cn(concreteClassNames.tooltipWrap, className)} {...props}>
			<span className={concreteClassNames.tooltipAnchor}>{children}</span>
			<span
				className={cn(
					concreteClassNames.tooltip,
					getTooltipPlacementClass(placement),
					forceOpen && concreteClassNames.tooltipForceOpen,
					title && concreteClassNames.tooltipRich
				)}
				role="tooltip"
			>
				{title ? <b>{title}</b> : null}
				{content ? <span>{content}</span> : null}
				{shortcut?.map(shortcutKey => (
					<span className={concreteClassNames.tooltipKbd} key={shortcutKey}>
						{formatShortcutKey(shortcutKey)}
					</span>
				))}
			</span>
		</span>
	)
}

export const tooltipPropsSchema = z
	.object({
		content: z.string().default('Use one short sentence.'),
		forceOpen: z.boolean().default(true),
		placement: z.enum(tooltipPlacementValues).default('top'),
		title: z.string().optional()
	})
	.strict()

export const tooltipPrimitiveDefinition = defineConcretePrimitive({
	category: 'feedback',
	component: Tooltip,
	controls: [
		selectControl('placement', 'Placement', 'top', tooltipPlacementValues),
		booleanControl('forceOpen', 'Force open', 'true'),
		textControl('content', 'Content', 'Use one short sentence.')
	],
	description: 'Dark inverse hint surface for focused labels.',
	guidance:
		'Tooltips name unfamiliar controls or add short context. Do not put workflow instructions or long content in them.',
	kind: 'primitive',
	name: 'Tooltip',
	pressure: ['product'],
	props: [
		prop('content', 'ReactNode', 'Tooltip body rendered in the floating surface.'),
		prop('placement', "'top' | 'right' | 'bottom' | 'left'", 'Floating surface placement.', 'top'),
		prop(
			'forceOpen',
			'boolean',
			'Keeps the tooltip visible for documentation and screenshots.',
			'false'
		),
		prop('shortcut', 'readonly string[]', 'Optional keycaps inside the tooltip.'),
		prop('children', 'ReactNode', 'Tooltip anchor.')
	],
	renderExample: renderTooltipExample,
	schema: tooltipPropsSchema,
	slug: 'tooltip',
	states: states([
		['default', 'Forced-open hint tooltip.'],
		['rich', 'Tooltip with title and shortcut.']
	])
})

function renderTooltipExample(state = 'default') {
	return (
		<Frame>
			<Tooltip
				content={state === 'rich' ? 'Search across docs and examples.' : 'Use one short sentence.'}
				forceOpen
				{...(state === 'rich' ? { shortcut: ['cmd', 'k'], title: 'Command search' } : {})}
			>
				<Button variant="secondary">Anchor</Button>
			</Tooltip>
		</Frame>
	)
}

function getTooltipPlacementClass(placement: TooltipPlacement): string | undefined {
	switch (placement) {
		case 'bottom':
			return concreteClassNames.tooltipBottom
		case 'left':
			return concreteClassNames.tooltipLeft
		case 'right':
			return concreteClassNames.tooltipRight
		case 'top':
			return concreteClassNames.tooltipTop
	}
}

function formatShortcutKey(shortcutKey: string): string {
	switch (shortcutKey.toLowerCase()) {
		case 'cmd':
		case 'command':
		case 'meta':
			return '⌘'
		case 'enter':
		case 'return':
			return '↵'
		case 'shift':
			return '⇧'
		case 'option':
		case 'alt':
			return '⌥'
		default:
			return shortcutKey
	}
}
