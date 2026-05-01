import type { ReactNode, SVGProps } from 'react'
import type { ConceptConnectorKind, DiagramTone } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { getDiagramToneClass } from '../diagram-helpers'
import { cn } from '../utils'

export type ConceptConnectorProps = SVGProps<SVGSVGElement> & {
	kind?: ConceptConnectorKind
	muted?: boolean
	selected?: boolean
	intent?: DiagramTone
}

export function ConceptConnector({
	className,
	kind = 'straight',
	muted = false,
	selected = false,
	intent = 'muted',
	...props
}: ConceptConnectorProps) {
	return (
		<svg
			aria-hidden="true"
			className={cn(
				concreteClassNames.conceptConnector,
				getDiagramToneClass(intent),
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
