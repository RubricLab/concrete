import type { ReactNode, SVGProps } from 'react'
import { z } from 'zod/v4'
import { booleanControl, selectControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import type { ConceptConnectorKind, DiagramTone } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { getDiagramToneClass } from './diagram-helpers'
import { Frame } from './frame'
import { cn } from './utils'

const conceptConnectorKindValues = [
	'straight',
	'elbow',
	'curved',
	'dashed-relation',
	'bidirectional',
	'branch',
	'feedback-loop',
	'annotation-leader'
] as const
const diagramToneValues = ['ink', 'muted', 'sky', 'terminal', 'ultra', 'error'] as const
const connectorTones = ['ink', 'sky', 'terminal', 'ultra', 'error'] as const

export type ConceptConnectorProps = SVGProps<SVGSVGElement> & {
	kind?: ConceptConnectorKind
	muted?: boolean
	selected?: boolean
	tone?: DiagramTone
}

export function ConceptConnector({
	className,
	kind = 'straight',
	muted = false,
	selected = false,
	tone = 'muted',
	...props
}: ConceptConnectorProps) {
	return (
		<svg
			aria-hidden="true"
			className={cn(
				concreteClassNames.conceptConnector,
				getDiagramToneClass(tone),
				muted && concreteClassNames.conceptConnectorMuted,
				selected && concreteClassNames.conceptConnectorSelected,
				className
			)}
			fill="none"
			height={24}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.25}
			viewBox="0 0 96 24"
			width={96}
			{...props}
		>
			{renderConceptConnectorBody(kind)}
		</svg>
	)
}

export const conceptConnectorPrimitivePropsSchema = z
	.object({
		kind: z.enum(conceptConnectorKindValues).default('straight'),
		muted: z.boolean().default(false),
		selected: z.boolean().default(false),
		tone: z.enum(diagramToneValues).default('muted')
	})
	.strict()

export const conceptConnectorPrimitiveDefinition = defineConcretePrimitive({
	category: 'diagram',
	component: ConceptConnector,
	controls: [
		selectControl('kind', 'Kind', 'straight', conceptConnectorKindValues),
		selectControl('tone', 'Tone', 'muted', diagramToneValues),
		booleanControl('selected', 'Selected', 'false'),
		booleanControl('muted', 'Muted', 'false')
	],
	description: 'Small relation glyphs for flow, sync, branch, loop, and callout diagrams.',
	guidance:
		'Use connectors deliberately: one relation type per meaning, muted by default, highlighted only when the relation is the point.',
	kind: 'primitive',
	name: 'Concept connector',
	pressure: ['editorial', 'educational'],
	props: [
		prop('kind', 'ConceptConnectorKind', 'Connector grammar asset name.', 'straight'),
		prop(
			'tone',
			"'ink' | 'muted' | 'sky' | 'terminal' | 'ultra' | 'error'",
			'Concrete-native connector tone.',
			'muted'
		),
		prop('selected', 'boolean', 'Highlights the relation.', 'false'),
		prop('muted', 'boolean', 'Subdues the relation.', 'false')
	],
	renderExample: renderConceptConnectorExample,
	schema: conceptConnectorPrimitivePropsSchema,
	slug: 'concept-connector',
	states: states([
		['default', 'Connector atlas for flow, relation, and callouts.'],
		['selected', 'Highlighted relation.'],
		['tones', 'Concrete-native connector tones.']
	])
})

function renderConceptConnectorExample(state = 'default') {
	return (
		<Frame>
			{conceptConnectorKindValues.map((kind, index) => (
				<ConceptConnector
					key={kind}
					kind={kind}
					selected={state === 'selected' && index === 1}
					tone={state === 'tones' ? (connectorTones[index % connectorTones.length] ?? 'ink') : 'muted'}
				/>
			))}
		</Frame>
	)
}

function renderConceptConnectorBody(kind: ConceptConnectorKind): ReactNode {
	switch (kind) {
		case 'annotation-leader':
			return (
				<>
					<path d="M18 18 48 6h28" />
					<circle cx="18" cy="18" r="2" />
				</>
			)
		case 'bidirectional':
			return (
				<>
					<path d="M18 12h60" />
					<path d="M24 7l-6 5 6 5M72 7l6 5-6 5" />
				</>
			)
		case 'branch':
			return (
				<>
					<path d="M14 12h28M42 12l15-7h24M42 12l15 7h24" />
					<path d="M76 3l5 2-5 2M76 17l5 2-5 2" />
				</>
			)
		case 'curved':
			return (
				<>
					<path d="M14 18C34 3 58 3 80 12" />
					<path d="M74 7l6 5-7 4" />
				</>
			)
		case 'dashed-relation':
			return (
				<>
					<path d="M14 12h66" strokeDasharray="6 5" />
					<path d="M74 7l6 5-6 5" />
				</>
			)
		case 'elbow':
			return (
				<>
					<path d="M14 7h34v10h32" />
					<path d="M74 12l6 5-6 5" />
				</>
			)
		case 'feedback-loop':
			return (
				<>
					<path d="M21 8h43c9 0 14 4 14 10s-5 10-14 10H35" transform="translate(0 -6)" />
					<path d="M40 17l-6 5 6 5" />
				</>
			)
		case 'straight':
			return (
				<>
					<path d="M14 12h66" />
					<path d="M74 7l6 5-6 5" />
				</>
			)
	}
}
