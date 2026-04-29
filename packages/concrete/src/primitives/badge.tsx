import type { HTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import type { ConcreteSignal } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

const badgeSignalValues = ['terminal', 'ultra', 'error'] as const
const badgeVariantValues = ['soft', 'solid', 'ghost', 'count'] as const

export type BadgeVariant = (typeof badgeVariantValues)[number]

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
	signal?: ConcreteSignal
	variant?: BadgeVariant
}

export function Badge({
	children,
	className,
	signal = 'terminal',
	variant = 'soft',
	...props
}: BadgeProps) {
	return (
		<span
			className={cn(
				concreteClassNames.badge,
				getBadgeSignalClass(signal),
				getBadgeVariantClass(variant),
				className
			)}
			{...props}
		>
			{children}
		</span>
	)
}

export const badgePropsSchema = z
	.object({
		label: z.string().default('Live'),
		signal: z.enum(badgeSignalValues).default('terminal'),
		variant: z.enum(badgeVariantValues).default('soft')
	})
	.strict()

export const badgePrimitiveDefinition = defineConcretePrimitive({
	category: 'status',
	component: Badge,
	controls: [
		selectControl('signal', 'Signal', 'terminal', badgeSignalValues),
		selectControl('variant', 'Variant', 'soft', badgeVariantValues),
		textControl('label', 'Label', 'Live')
	],
	description: 'Status-leading signal label using terminal, ultra, or error only.',
	guidance:
		'Badges are terse status markers. Keep them signal-bound, numeric only for counts, and avoid inventing warning states.',
	kind: 'primitive',
	name: 'Badge',
	pressure: ['product'],
	props: [
		prop(
			'signal',
			"'terminal' | 'ultra' | 'error'",
			'Status signal. Amber warning is intentionally absent.',
			'terminal'
		),
		prop(
			'variant',
			"'soft' | 'solid' | 'ghost' | 'count'",
			'Badge emphasis and count treatment.',
			'soft'
		),
		prop('children', 'ReactNode', 'Badge label or count.')
	],
	renderExample: renderBadgeExample,
	schema: badgePropsSchema,
	slug: 'badge',
	states: states([
		['default', 'Soft signal badges.'],
		['solid', 'Reserved high-emphasis badges.'],
		['count', 'Notification count treatment.']
	])
})

function renderBadgeExample(state = 'default') {
	switch (state) {
		case 'count':
			return (
				<Frame>
					<Badge signal="terminal" variant="count">
						24
					</Badge>
					<Badge signal="error" variant="count">
						3
					</Badge>
					<Badge signal="ultra" variant="ghost">
						v2.4.1
					</Badge>
				</Frame>
			)
		case 'solid':
			return (
				<Frame>
					<Badge signal="terminal" variant="solid">
						Live
					</Badge>
					<Badge signal="ultra" variant="solid">
						Pro
					</Badge>
					<Badge signal="error" variant="solid">
						Delete
					</Badge>
				</Frame>
			)
		default:
			return (
				<Frame>
					<Badge signal="terminal">Live</Badge>
					<Badge signal="ultra">Featured</Badge>
					<Badge signal="error">Blocked</Badge>
				</Frame>
			)
	}
}

function getBadgeSignalClass(signal: ConcreteSignal): string | undefined {
	switch (signal) {
		case 'error':
			return concreteClassNames.badgeError
		case 'terminal':
			return concreteClassNames.badgeTerminal
		case 'ultra':
			return concreteClassNames.badgeUltra
	}
}

function getBadgeVariantClass(variant: BadgeVariant): string | undefined {
	switch (variant) {
		case 'count':
			return concreteClassNames.badgeCount
		case 'ghost':
			return concreteClassNames.badgeGhost
		case 'soft':
			return undefined
		case 'solid':
			return concreteClassNames.badgeSolid
	}
}
