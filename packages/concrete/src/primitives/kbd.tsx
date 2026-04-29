import type { HTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Button } from './button'
import { Frame } from './frame'
import { cn } from './utils'

export type KbdProps = HTMLAttributes<HTMLElement> & {
	tone?: 'dark' | 'default'
}

export function Kbd({ children, className, tone = 'default', ...props }: KbdProps) {
	return (
		<kbd
			className={cn(concreteClassNames.kbd, tone === 'dark' && concreteClassNames.kbdDark, className)}
			{...props}
		>
			{children}
		</kbd>
	)
}

const kbdToneValues = ['default', 'dark'] as const

export const kbdPropsSchema = z
	.object({
		label: z.string().default('⌘'),
		tone: z.enum(kbdToneValues).default('default')
	})
	.strict()

export const kbdPrimitiveDefinition = defineConcretePrimitive({
	category: 'typography',
	component: Kbd,
	controls: [
		selectControl('tone', 'Tone', 'default', kbdToneValues),
		textControl('label', 'Key', '⌘')
	],
	description: 'Keyboard shortcut keycap.',
	guidance:
		'Use Kbd for short command hints only. Prefer grouped keycaps inside commands and tooltips over explanatory keyboard copy.',
	kind: 'primitive',
	name: 'Kbd',
	pressure: ['product'],
	props: [
		prop('tone', "'default' | 'dark'", 'Keycap surface tone.', 'default'),
		prop('children', 'ReactNode', 'Visible key label.')
	],
	renderExample: renderKbdExample,
	schema: kbdPropsSchema,
	slug: 'kbd',
	states: states([
		['default', 'Standalone keycaps.'],
		['shortcut', 'Button shortcut composition.']
	])
})

function renderKbdExample(state = 'default') {
	switch (state) {
		case 'shortcut':
			return (
				<Frame>
					<Button shortcut={['cmd', 'k']}>Search</Button>
					<Button shortcut={['cmd', 'enter']} variant="primary">
						Send
					</Button>
				</Frame>
			)
		default:
			return (
				<Frame>
					<Kbd>⌘</Kbd>
					<Kbd>K</Kbd>
					<Kbd tone="dark">↵</Kbd>
				</Frame>
			)
	}
}
