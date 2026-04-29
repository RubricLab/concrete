import type { AnchorHTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { ConcreteIcon } from '../icons'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

const linkToneValues = ['default', 'sky', 'muted'] as const
const linkVariantValues = ['inline', 'nav'] as const

export type TextLinkTone = (typeof linkToneValues)[number]
export type TextLinkVariant = (typeof linkVariantValues)[number]

export type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	external?: boolean
	tone?: TextLinkTone
	variant?: TextLinkVariant
}

export function TextLink({
	children,
	className,
	external = false,
	tone = 'default',
	variant = 'inline',
	...props
}: TextLinkProps) {
	return (
		<a
			className={cn(
				concreteClassNames.link,
				tone === 'sky' && concreteClassNames.linkSky,
				tone === 'muted' && concreteClassNames.linkMuted,
				external && concreteClassNames.linkExternal,
				variant === 'nav' && concreteClassNames.linkNav,
				className
			)}
			{...props}
		>
			{children}
			{external ? <ConcreteIcon aria-hidden name="external-link" /> : null}
		</a>
	)
}

export const linkPropsSchema = z
	.object({
		external: z.boolean().default(false),
		label: z.string().default('Open research note'),
		tone: z.enum(linkToneValues).default('default'),
		variant: z.enum(linkVariantValues).default('inline')
	})
	.strict()

export const linkPrimitiveDefinition = defineConcretePrimitive({
	category: 'navigation',
	component: TextLink,
	controls: [
		selectControl('tone', 'Tone', 'default', linkToneValues),
		selectControl('variant', 'Variant', 'inline', linkVariantValues),
		booleanControl('external', 'External', 'false'),
		textControl('label', 'Label', 'Open research note')
	],
	description: 'Ink-first text link with restrained underline treatment.',
	guidance:
		'Links should read as text first. Use nav for compact navigation lists and external only when destination context changes.',
	kind: 'primitive',
	name: 'Link',
	pressure: ['editorial', 'product'],
	props: [
		prop('href', 'string', 'Native anchor destination.'),
		prop('tone', "'default' | 'sky' | 'muted'", 'Inline link tone.', 'default'),
		prop('variant', "'inline' | 'nav'", 'Prose underline or nav-link treatment.', 'inline'),
		prop('external', 'boolean', 'Appends an external-link glyph.', 'false'),
		prop('children', 'ReactNode', 'Link text.')
	],
	renderExample: renderLinkExample,
	schema: linkPropsSchema,
	slug: 'link',
	states: states([
		['default', 'Inline text link.'],
		['tones', 'Default, sky, and muted link tones.'],
		['nav', 'Compact nav link treatment.']
	])
})

function renderLinkExample(state = 'default') {
	switch (state) {
		case 'nav':
			return (
				<Frame>
					<TextLink href="#" variant="nav">
						Overview
					</TextLink>
					<TextLink href="#" tone="sky" variant="nav">
						Components
					</TextLink>
					<TextLink external href="#" variant="nav">
						Changelog
					</TextLink>
				</Frame>
			)
		case 'tones':
			return (
				<Frame>
					<TextLink href="#">Default</TextLink>
					<TextLink href="#" tone="sky">
						Sky
					</TextLink>
					<TextLink href="#" tone="muted">
						Muted
					</TextLink>
				</Frame>
			)
		default:
			return (
				<Frame>
					<TextLink href="#">Open research note</TextLink>
				</Frame>
			)
	}
}
