import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { ConcreteIcon, type IconName } from '../icons'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import type { DiagramNodeRole } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

const diagramNodeRoleValues = [
	'process',
	'compute',
	'data',
	'external',
	'decision',
	'boundary',
	'error'
] as const

export type DiagramNodeProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> & {
	meta?: ReactNode
	muted?: boolean
	role?: DiagramNodeRole
	selected?: boolean
	title: ReactNode
}

export function DiagramNode({
	className,
	meta,
	muted = false,
	role = 'process',
	selected = false,
	title,
	type = 'button',
	...props
}: DiagramNodeProps) {
	return (
		<button
			className={cn(
				concreteClassNames.diagramNode,
				getDiagramRoleClass(role),
				muted && concreteClassNames.diagramNodeMuted,
				selected && concreteClassNames.diagramNodeSelected,
				className
			)}
			data-diagram-role={role}
			type={type}
			{...props}
		>
			<span className={concreteClassNames.diagramNodeIcon}>
				<ConcreteIcon name={getDiagramRoleIcon(role)} />
			</span>
			<span className={concreteClassNames.diagramNodeText}>
				<strong>{title}</strong>
				{meta ? <span>{meta}</span> : null}
			</span>
		</button>
	)
}

export const diagramNodePrimitivePropsSchema = z
	.object({
		meta: z.string().optional(),
		muted: z.boolean().default(false),
		role: z.enum(diagramNodeRoleValues).default('process'),
		selected: z.boolean().default(false),
		title: z.string().default('Router')
	})
	.strict()

export const diagramNodePrimitiveDefinition = defineConcretePrimitive({
	category: 'diagram',
	component: DiagramNode,
	controls: [
		textControl('title', 'Title', 'Router'),
		textControl('meta', 'Meta', 'intent'),
		selectControl('role', 'Role', 'process', diagramNodeRoleValues),
		booleanControl('selected', 'Selected', 'false'),
		booleanControl('muted', 'Muted', 'false')
	],
	description: 'Compact typed node for concept graphs, architecture sketches, and agent explainers.',
	guidance:
		'Diagram nodes are primary graph entities. Use role to clarify category and keep labels short.',
	kind: 'primitive',
	name: 'Diagram node',
	pressure: ['educational', 'editorial', 'generative'],
	props: [
		prop('title', 'ReactNode', 'Primary node label.', '', true),
		prop('meta', 'ReactNode', 'Compact secondary label.'),
		prop(
			'role',
			"'boundary' | 'compute' | 'data' | 'decision' | 'error' | 'external' | 'process'",
			'Node semantic category.',
			'process'
		),
		prop('selected', 'boolean', 'Selected canvas state.', 'false'),
		prop('muted', 'boolean', 'Background canvas state.', 'false')
	],
	renderExample: renderDiagramNodeExample,
	schema: diagramNodePrimitivePropsSchema,
	slug: 'diagram-node',
	states: states([
		['default', 'Node role atlas.'],
		['selected', 'Selected node state.'],
		['muted', 'Subdued background node state.']
	])
})

function renderDiagramNodeExample(state = 'default') {
	const nodes = [
		['external', 'User input', 'HTTPS'],
		['decision', 'Router', 'intent'],
		['data', 'Context', 'memory'],
		['compute', 'Model', 'reasoning'],
		['process', 'Stream', 'SSE'],
		['error', 'Reject', 'policy']
	] as const

	return (
		<Frame>
			<div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
				{nodes.map(([role, title, meta]) => (
					<DiagramNode
						key={role}
						meta={meta}
						muted={state === 'muted' && role !== 'compute'}
						role={role}
						selected={state === 'selected' && role === 'compute'}
						title={title}
					/>
				))}
			</div>
		</Frame>
	)
}

function getDiagramRoleIcon(role: DiagramNodeRole): IconName {
	switch (role) {
		case 'boundary':
			return 'square'
		case 'compute':
			return 'sparkles'
		case 'data':
			return 'bar-chart-3'
		case 'decision':
			return 'chevrons-up-down'
		case 'error':
			return 'triangle-alert'
		case 'external':
			return 'user'
		case 'process':
			return 'git-branch'
	}
}

function getDiagramRoleClass(role: DiagramNodeRole): string | undefined {
	switch (role) {
		case 'boundary':
			return concreteClassNames.diagramRoleBoundary
		case 'compute':
			return concreteClassNames.diagramRoleCompute
		case 'data':
			return concreteClassNames.diagramRoleData
		case 'decision':
			return concreteClassNames.diagramRoleDecision
		case 'error':
			return concreteClassNames.diagramRoleError
		case 'external':
			return concreteClassNames.diagramRoleExternal
		case 'process':
			return undefined
	}
}
