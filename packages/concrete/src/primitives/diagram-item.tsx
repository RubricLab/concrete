import type { HTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import type { DiagramItemKind, DiagramTone } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { getDiagramToneClass } from './diagram-helpers'
import { Frame } from './frame'
import { cn } from './utils'

const diagramItemKindValues = [
	'metric',
	'code',
	'status',
	'note',
	'chart',
	'table',
	'document',
	'card'
] as const
const diagramToneValues = ['ink', 'muted', 'sky', 'terminal', 'ultra', 'error'] as const
const diagramItemTones = ['sky', 'ink', 'terminal', 'ultra'] as const

export type DiagramItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	body?: ReactNode
	kind?: DiagramItemKind
	meta?: ReactNode
	muted?: boolean
	selected?: boolean
	title: ReactNode
	tone?: DiagramTone
	value?: ReactNode
}

export function DiagramItem({
	body,
	className,
	kind = 'note',
	meta,
	muted = false,
	selected = false,
	title,
	tone = 'ink',
	value,
	...props
}: DiagramItemProps) {
	return (
		<div
			className={cn(
				concreteClassNames.diagramItem,
				getDiagramItemClass(kind),
				getDiagramToneClass(tone),
				muted && concreteClassNames.diagramItemMuted,
				selected && concreteClassNames.diagramItemSelected,
				className
			)}
			data-diagram-kind={kind}
			data-diagram-tone={tone}
			{...props}
		>
			<span className={concreteClassNames.diagramItemKind}>{kind}</span>
			<strong>{title}</strong>
			{value ? <b>{value}</b> : null}
			{body ? <p>{body}</p> : null}
			{meta ? <span className={concreteClassNames.diagramItemMeta}>{meta}</span> : null}
		</div>
	)
}

export const diagramItemPrimitivePropsSchema = z
	.object({
		kind: z.enum(diagramItemKindValues).default('metric'),
		meta: z.string().optional(),
		muted: z.boolean().default(false),
		selected: z.boolean().default(false),
		title: z.string().default('Trace'),
		tone: z.enum(diagramToneValues).default('ink'),
		value: z.string().optional()
	})
	.strict()

export const diagramItemPrimitiveDefinition = defineConcretePrimitive({
	category: 'diagram',
	component: DiagramItem,
	controls: [
		textControl('title', 'Title', 'Trace'),
		textControl('value', 'Value', '184ms'),
		textControl('meta', 'Meta', 'p95'),
		selectControl('kind', 'Kind', 'metric', diagramItemKindValues),
		selectControl('tone', 'Tone', 'ink', diagramToneValues),
		booleanControl('selected', 'Selected', 'false')
	],
	description:
		'Supporting evidence item for metrics, notes, code, documents, charts, tables, and status.',
	guidance:
		'Diagram items are secondary evidence inside a graph; they should not compete with the main nodes.',
	kind: 'primitive',
	name: 'Diagram item',
	pressure: ['educational', 'editorial', 'generative'],
	props: [
		prop('title', 'ReactNode', 'Primary item label.', '', true),
		prop('value', 'ReactNode', 'Optional prominent value.'),
		prop('body', 'ReactNode', 'Optional supporting copy.'),
		prop('meta', 'ReactNode', 'Optional small metadata.'),
		prop(
			'kind',
			"'card' | 'chart' | 'code' | 'document' | 'metric' | 'note' | 'status' | 'table'",
			'Item evidence type.',
			'note'
		),
		prop(
			'tone',
			"'ink' | 'muted' | 'sky' | 'terminal' | 'ultra' | 'error'",
			'Concrete-native item tone.',
			'ink'
		),
		prop('selected', 'boolean', 'Selected canvas state.', 'false'),
		prop('muted', 'boolean', 'Background canvas state.', 'false')
	],
	renderExample: renderDiagramItemExample,
	schema: diagramItemPrimitivePropsSchema,
	slug: 'diagram-item',
	states: states([
		['default', 'Supporting evidence item atlas.'],
		['selected', 'Selected item state.'],
		['tones', 'Metric, code, status, and note tones.']
	])
})

function renderDiagramItemExample(state = 'default') {
	const items = [
		['metric', 'Trace', '184ms', 'p95'],
		['code', 'Hydrate', undefined, 'ts'],
		['status', 'Ready', undefined, 'live'],
		['note', 'Constraint', undefined, 'policy']
	] as const

	return (
		<Frame>
			<div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
				{items.map(([kind, title, value, meta], index) => (
					<DiagramItem
						key={kind}
						kind={kind}
						meta={meta}
						selected={state === 'selected' && index === 0}
						title={title}
						tone={state === 'tones' ? (diagramItemTones[index] ?? 'ink') : 'ink'}
						{...(value ? { value } : {})}
					/>
				))}
			</div>
		</Frame>
	)
}

function getDiagramItemClass(kind: DiagramItemKind): string | undefined {
	switch (kind) {
		case 'card':
		case 'note':
			return undefined
		case 'chart':
			return concreteClassNames.diagramItemChart
		case 'code':
			return concreteClassNames.diagramItemCode
		case 'document':
			return concreteClassNames.diagramItemDocument
		case 'metric':
			return concreteClassNames.diagramItemMetric
		case 'status':
			return concreteClassNames.diagramItemStatus
		case 'table':
			return concreteClassNames.diagramItemTable
	}
}
