import { z } from 'zod'
import type { IconName } from './icons'

const foundationSlugSchema = z.enum([
	'color',
	'typography',
	'density',
	'spacing',
	'radii',
	'elevation',
	'motion',
	'focus',
	'textures',
	'icons',
	'pressure'
])

const foundationRecordSchema = z.object({
	description: z.string().min(1),
	name: z.string().min(1),
	slug: foundationSlugSchema,
	summary: z.string().min(1)
})

const primitiveSlugSchema = z.enum([
	'button',
	'input',
	'textarea',
	'select',
	'checkbox',
	'radio',
	'switch',
	'slider',
	'chip',
	'pill',
	'tag',
	'badge',
	'indicator',
	'delta',
	'card',
	'frame',
	'row',
	'divider',
	'bubble',
	'stat',
	'sparkline',
	'avatar',
	'progress',
	'spinner',
	'distribution',
	'skeleton',
	'tooltip',
	'link',
	'code',
	'kbd',
	'icon',
	'caret',
	'scrollbar',
	'empty-state'
])

const primitiveRecordSchema = z.object({
	description: z.string().min(1),
	name: z.string().min(1),
	role: z.string().min(1),
	slug: primitiveSlugSchema
})

const componentRecordSchema = z.object({
	description: z.string().min(1),
	name: z.string().min(1),
	primitives: z.array(primitiveSlugSchema).min(1),
	slug: z.enum(['data-table', 'chart-panel', 'command-panel', 'message-thread'])
})

const iconSlugSchema = z.enum([
	'activity',
	'alert',
	'arrowDown',
	'arrowUp',
	'avatar',
	'branch',
	'caretDown',
	'check',
	'code',
	'database',
	'filter',
	'grid',
	'home',
	'info',
	'layers',
	'link',
	'message',
	'minus',
	'moon',
	'plus',
	'search',
	'settings',
	'sparkles',
	'table',
	'x'
])

const iconRecordSchema = z.object({
	description: z.string().min(1),
	name: z.string().min(1),
	slug: iconSlugSchema
})

export type FoundationSlug = z.infer<typeof foundationSlugSchema>
export type FoundationRecord = z.infer<typeof foundationRecordSchema>
export type PrimitiveSlug = z.infer<typeof primitiveSlugSchema>
export type PrimitiveRecord = z.infer<typeof primitiveRecordSchema>
export type ComponentRecord = z.infer<typeof componentRecordSchema>
export type IconRecord = z.infer<typeof iconRecordSchema> & { slug: IconName }

export const foundationRegistry = z.array(foundationRecordSchema).parse([
	{
		description:
			'The neutral ramp, sky accent, and three system signals used across controls, charts, and status.',
		name: 'Color',
		slug: 'color',
		summary: 'Ink carries structure. Sky carries action. Signals carry state.'
	},
	{
		description:
			'Plus Jakarta Sans carries interface density. Fraunces adds editorial lift at display scale.',
		name: 'Typography',
		slug: 'typography',
		summary: 'Two families, one voice.'
	},
	{
		description:
			'Editorial, product, generative, and explainer modes compress one grid to different pressure levels.',
		name: 'Density',
		slug: 'density',
		summary: 'One grid, four densities.'
	},
	{
		description: 'A 4px spatial scale for atoms, rows, surfaces, sections, and editorial canvases.',
		name: 'Spacing',
		slug: 'spacing',
		summary: 'Small steps, clear rhythm.'
	},
	{
		description:
			'Tight corners for atoms, modest cards for surfaces, and pills only when the shape is semantic.',
		name: 'Radii',
		slug: 'radii',
		summary: 'Soft edges, strict meaning.'
	},
	{
		description:
			'Hairline-first depth with shadows reserved for overlays, raised cards, and active surfaces.',
		name: 'Elevation',
		slug: 'elevation',
		summary: 'Depth without decoration.'
	},
	{
		description:
			'Short, purposeful transitions for feedback, disclosure, loading, and active state changes.',
		name: 'Motion',
		slug: 'motion',
		summary: 'Motion proves state.'
	},
	{
		description: 'A single sky ring applied by all interactive primitives without shifting layout.',
		name: 'Focus',
		slug: 'focus',
		summary: 'One visible interaction contract.'
	},
	{
		description:
			'Lattice, dots, and grain give editorial surfaces structure without becoming illustration.',
		name: 'Textures',
		slug: 'textures',
		summary: 'Three textures, one material logic.'
	},
	{
		description:
			'A consistent 24px stroke icon set with compact symbols for tools, states, and navigation.',
		name: 'Icons',
		slug: 'icons',
		summary: 'Symbols before labels.'
	},
	{
		description:
			'Pressure describes how much density, proof, state, and navigation a surface should expose.',
		name: 'Pressure',
		slug: 'pressure',
		summary: 'Same primitives, different compression.'
	}
] satisfies readonly FoundationRecord[])

export const primitiveRegistry = z.array(primitiveRecordSchema).parse([
	{
		description: 'Primary, secondary, and quiet commands with icon support.',
		name: 'Button',
		role: 'command',
		slug: 'button'
	},
	{
		description: 'Single-line values, filters, search, and short configuration fields.',
		name: 'Input',
		role: 'value',
		slug: 'input'
	},
	{
		description: 'Longer text entry where rows need to expand without becoming a document.',
		name: 'Textarea',
		role: 'long value',
		slug: 'textarea'
	},
	{
		description: 'Compact native choice control for a known option set.',
		name: 'Select',
		role: 'option',
		slug: 'select'
	},
	{
		description: 'Boolean state that can stand alone or live inside rows.',
		name: 'Checkbox',
		role: 'boolean',
		slug: 'checkbox'
	},
	{
		description: 'Mutually exclusive choice inside a small option group.',
		name: 'Radio',
		role: 'exclusive',
		slug: 'radio'
	},
	{
		description: 'Immediate binary setting where the current state is visible.',
		name: 'Switch',
		role: 'instant',
		slug: 'switch'
	},
	{
		description: 'A bounded continuous value such as density, confidence, or threshold.',
		name: 'Slider',
		role: 'range',
		slug: 'slider'
	},
	{
		description: 'Clickable and toggleable filter atoms.',
		name: 'Chip',
		role: 'toggle',
		slug: 'chip'
	},
	{
		description: 'Soft rounded label for stable metadata or low-priority state.',
		name: 'Pill',
		role: 'soft label',
		slug: 'pill'
	},
	{
		description: 'Tiny structured metadata such as owner, branch, model, or source.',
		name: 'Tag',
		role: 'metadata',
		slug: 'tag'
	},
	{
		description: 'Compact state with stronger semantic color than a pill.',
		name: 'Badge',
		role: 'status',
		slug: 'badge'
	},
	{
		description: 'A dot and label for live state in dense surfaces.',
		name: 'Indicator',
		role: 'state dot',
		slug: 'indicator'
	},
	{
		description: 'Signed change over time with direction and numeric value.',
		name: 'Delta',
		role: 'change',
		slug: 'delta'
	},
	{
		description: 'A modest surface for grouped content or repeated objects.',
		name: 'Card',
		role: 'surface',
		slug: 'card'
	},
	{
		description: 'A labelled canvas for examples, figures, and product panels.',
		name: 'Frame',
		role: 'canvas',
		slug: 'frame'
	},
	{
		description: 'One record with leading, content, and trailing affordances.',
		name: 'Row',
		role: 'record',
		slug: 'row'
	},
	{
		description: 'Hairline separation without creating another surface.',
		name: 'Divider',
		role: 'separate',
		slug: 'divider'
	},
	{
		description: 'Single chat or assistant message with side-aware tone.',
		name: 'Bubble',
		role: 'chat',
		slug: 'bubble'
	},
	{
		description: 'A metric with label, value, and optional helper.',
		name: 'Stat',
		role: 'number',
		slug: 'stat'
	},
	{
		description: 'Small trend line for dense product and generative surfaces.',
		name: 'Sparkline',
		role: 'trend',
		slug: 'sparkline'
	},
	{
		description: 'Human or agent identity in tight interface spaces.',
		name: 'Avatar',
		role: 'person',
		slug: 'avatar'
	},
	{
		description: 'Known progress for jobs, generation, and uploads.',
		name: 'Progress',
		role: 'known',
		slug: 'progress'
	},
	{
		description: 'Unknown progress where the system is still working.',
		name: 'Spinner',
		role: 'unknown',
		slug: 'spinner'
	},
	{
		description: 'A compact shape preview for histograms or sample spread.',
		name: 'Distribution',
		role: 'shape',
		slug: 'distribution'
	},
	{
		description: 'Pending structure that preserves rhythm while data loads.',
		name: 'Skeleton',
		role: 'pending',
		slug: 'skeleton'
	},
	{
		description: 'Hover/focus help for compact controls.',
		name: 'Tooltip',
		role: 'clarify',
		slug: 'tooltip'
	},
	{
		description: 'Inline navigation or cross-reference using the sky action voice.',
		name: 'Link',
		role: 'navigate',
		slug: 'link'
	},
	{
		description: 'Literal command, token, file, or API value.',
		name: 'Code',
		role: 'literal',
		slug: 'code'
	},
	{
		description: 'Keyboard shortcut or physical key reference.',
		name: 'Kbd',
		role: 'shortcut',
		slug: 'kbd'
	},
	{
		description: 'A 24px symbol using the Concrete stroke and corner logic.',
		name: 'Icon',
		role: 'symbol',
		slug: 'icon'
	},
	{
		description: 'Disclosure direction for selects, menus, accordions, and rows.',
		name: 'Caret',
		role: 'disclose',
		slug: 'caret'
	},
	{
		description: 'Compact overflow affordance for constrained panes.',
		name: 'Scrollbar',
		role: 'overflow',
		slug: 'scrollbar'
	},
	{
		description: 'An empty surface with a clear title and optional action.',
		name: 'EmptyState',
		role: 'none',
		slug: 'empty-state'
	}
] satisfies readonly PrimitiveRecord[])

export const componentRegistry = z.array(componentRecordSchema).parse([
	{
		description: 'Dense records with filters, row state, sorting, and compact actions.',
		name: 'Data table',
		primitives: ['row', 'checkbox', 'badge', 'indicator', 'button', 'select'],
		slug: 'data-table'
	},
	{
		description: 'Charts surrounded by stats, keys, selection state, and explanatory notes.',
		name: 'Chart panel',
		primitives: ['frame', 'sparkline', 'stat', 'distribution', 'delta', 'badge'],
		slug: 'chart-panel'
	},
	{
		description: 'A focused control surface for commands, search, filters, and keyboard flow.',
		name: 'Command panel',
		primitives: ['input', 'chip', 'button', 'kbd', 'tooltip', 'empty-state'],
		slug: 'command-panel'
	},
	{
		description: 'Generative UI that pairs messages with inline charts, citations, and progress.',
		name: 'Message thread',
		primitives: ['bubble', 'avatar', 'card', 'progress', 'link', 'code'],
		slug: 'message-thread'
	}
])

export const iconRegistry = z.array(iconRecordSchema).parse([
	{ description: 'Trend, activity, and live data.', name: 'Activity', slug: 'activity' },
	{ description: 'Error, caution, or forced attention.', name: 'Alert', slug: 'alert' },
	{ description: 'Negative direction or download.', name: 'Arrow down', slug: 'arrowDown' },
	{ description: 'Positive direction or upload.', name: 'Arrow up', slug: 'arrowUp' },
	{ description: 'Person, agent, or identity.', name: 'Avatar', slug: 'avatar' },
	{ description: 'Branch, flow, or lineage.', name: 'Branch', slug: 'branch' },
	{ description: 'Disclosure down.', name: 'Caret down', slug: 'caretDown' },
	{ description: 'Success or selected state.', name: 'Check', slug: 'check' },
	{ description: 'Code, API, and literal values.', name: 'Code', slug: 'code' },
	{ description: 'Stored data or dataset.', name: 'Database', slug: 'database' },
	{ description: 'Filter and refine controls.', name: 'Filter', slug: 'filter' },
	{ description: 'Grid, primitives, or dense layout.', name: 'Grid', slug: 'grid' },
	{ description: 'Home navigation.', name: 'Home', slug: 'home' },
	{ description: 'Inline help.', name: 'Info', slug: 'info' },
	{ description: 'Layers, elevation, or compositing.', name: 'Layers', slug: 'layers' },
	{ description: 'External or internal links.', name: 'Link', slug: 'link' },
	{ description: 'Message or chat.', name: 'Message', slug: 'message' },
	{ description: 'Subtract or flat delta.', name: 'Minus', slug: 'minus' },
	{ description: 'Dark surface mode.', name: 'Moon', slug: 'moon' },
	{ description: 'Create or expand.', name: 'Plus', slug: 'plus' },
	{ description: 'Search and command entry.', name: 'Search', slug: 'search' },
	{ description: 'Settings or configuration.', name: 'Settings', slug: 'settings' },
	{ description: 'Ultra signal or featured intelligence.', name: 'Sparkles', slug: 'sparkles' },
	{ description: 'Tabular data.', name: 'Table', slug: 'table' },
	{ description: 'Dismiss, close, or remove.', name: 'X', slug: 'x' }
] satisfies readonly IconRecord[])
