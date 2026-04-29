import { z } from 'zod/v4'
import { ConcreteIcon } from '../icons'
import { selectOptionsControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { Button } from './button'
import { Frame } from './frame'

const iconControlOptions = [
	{ label: 'Search', value: 'search' },
	{ label: 'Settings', value: 'settings' },
	{ label: 'Sparkles', value: 'sparkles' },
	{ label: 'File', value: 'file-text' },
	{ label: 'Activity', value: 'activity' }
] as const

export const iconPropsSchema = z
	.object({
		name: z.enum(['search', 'settings', 'sparkles', 'file-text', 'activity']).default('search'),
		title: z.string().optional()
	})
	.strict()

export const iconPrimitiveDefinition = defineConcretePrimitive({
	category: 'foundation',
	component: ConcreteIcon,
	controls: [
		selectOptionsControl('name', 'Name', 'search', iconControlOptions),
		textControl('title', 'Title', '')
	],
	description: 'Lucide-compatible currentColor icon surface.',
	guidance:
		'Icons inherit currentColor and should stay subordinate to labels, buttons, and rows. Prefer the typed Concrete icon registry over inline SVG.',
	kind: 'primitive',
	name: 'Icon',
	pressure: ['product'],
	props: [
		prop('name', 'IconName', 'Typed Concrete icon name.', '', true),
		prop('title', 'string', 'Optional accessible title.')
	],
	renderExample: renderIconExample,
	schema: iconPropsSchema,
	slug: 'icon',
	states: states([
		['default', 'Icon-only controls.'],
		['inline', 'Standalone currentColor icons.']
	])
})

function renderIconExample(state = 'default') {
	switch (state) {
		case 'inline':
			return (
				<Frame>
					<ConcreteIcon name="search" />
					<ConcreteIcon name="settings" />
					<ConcreteIcon name="sparkles" />
				</Frame>
			)
		default:
			return (
				<Frame>
					<Button iconOnly leadingIcon="search" variant="secondary" />
					<Button iconOnly leadingIcon="settings" />
					<Button iconOnly leadingIcon="sparkles" variant="ultra" />
				</Frame>
			)
	}
}
