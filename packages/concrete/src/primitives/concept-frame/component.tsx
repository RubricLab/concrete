import type { ReactNode, SVGProps } from 'react'
import type { ConceptFrameKind } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type ConceptFrameSize = 'large' | 'medium' | 'small'

export type ConceptFrameProps = Omit<SVGProps<SVGSVGElement>, 'title'> & {
	kind?: ConceptFrameKind
	muted?: boolean
	selected?: boolean
	size?: ConceptFrameSize
	title?: string
}

export function ConceptFrame({
	className,
	kind = 'browser-window',
	muted = false,
	selected = false,
	size = 'medium',
	title,
	...props
}: ConceptFrameProps) {
	return (
		<svg
			aria-hidden={title ? undefined : true}
			className={cn(
				concreteClassNames.conceptFrame,
				getConceptFrameSizeClass(size),
				muted && concreteClassNames.conceptFrameMuted,
				selected && concreteClassNames.conceptFrameSelected,
				className
			)}
			fill="none"
			height={72}
			role={title ? 'img' : undefined}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.25}
			viewBox="0 0 96 72"
			width={96}
			{...props}
		>
			<title>{title ?? kind}</title>
			{renderConceptFrameBody(kind)}
		</svg>
	)
}

function renderConceptFrameBody(kind: ConceptFrameKind): ReactNode {
	switch (kind) {
		case 'ai-website':
			return (
				<>
					<rect x="9" y="10" width="78" height="52" rx="5" />
					<path d="M9 22h78M20 16h18M24 33h30M24 42h22M62 31l5 5-5 5M70 31l5 5-5 5" />
					<rect x="23" y="49" width="23" height="6" rx="2" opacity=".35" />
				</>
			)
		case 'api-card':
			return (
				<>
					<rect x="12" y="14" width="72" height="44" rx="5" />
					<path d="M24 27h18M24 36h36M24 45h24M64 26l8 10-8 10" />
				</>
			)
		case 'assistant-response':
			return (
				<>
					<rect x="12" y="12" width="72" height="48" rx="8" />
					<path d="M25 27h34M25 36h46M25 45h26M62 48l10 7v-9" />
					<circle cx="22" cy="22" r="2" />
				</>
			)
		case 'browser-window':
			return (
				<>
					<rect x="8" y="10" width="80" height="52" rx="4" />
					<path d="M8 22h80M36 16h34M78 14l3 2-3 2M43 31h28M43 38h22M43 45h28M16 53h22" />
					<circle cx="16" cy="16" r="1" />
					<circle cx="22" cy="16" r="1" />
					<circle cx="28" cy="16" r="1" />
					<rect x="16" y="31" width="19" height="15" rx="1" opacity=".35" />
				</>
			)
		case 'chart-frame':
			return (
				<>
					<rect x="10" y="12" width="76" height="48" rx="5" />
					<path d="M22 49V30M34 49V38M46 49V25M58 49V34M70 49V28M18 50h58" />
				</>
			)
		case 'chat-interface':
			return (
				<>
					<rect x="11" y="11" width="74" height="50" rx="6" />
					<path d="M21 26h28M47 37h27M21 49h36" />
					<rect x="18" y="21" width="38" height="10" rx="5" opacity=".35" />
					<rect x="40" y="32" width="38" height="10" rx="5" />
				</>
			)
		case 'code-editor':
			return (
				<>
					<rect x="9" y="10" width="78" height="52" rx="5" />
					<path d="M27 10v52M38 25h24M38 34h35M38 43h18M16 24h3M16 34h3M16 44h3" />
				</>
			)
		case 'dashboard-frame':
			return (
				<>
					<rect x="9" y="10" width="78" height="52" rx="5" />
					<path d="M18 22h21M18 34h21M18 46h21M48 22h28M48 34h28M48 46h14" />
					<rect x="47" y="18" width="29" height="10" rx="2" opacity=".35" />
					<rect x="18" y="51" width="58" height="5" rx="1" />
				</>
			)
		case 'data-table':
			return (
				<>
					<rect x="10" y="13" width="76" height="46" rx="4" />
					<path d="M10 25h76M10 36h76M10 47h76M32 13v46M60 13v46" />
				</>
			)
		case 'database-panel':
			return (
				<>
					<path d="M23 23c0-5 11-9 25-9s25 4 25 9v26c0 5-11 9-25 9s-25-4-25-9Z" />
					<path d="M23 23c0 5 11 9 25 9s25-4 25-9M23 36c0 5 11 9 25 9s25-4 25-9M23 49c0 5 11 9 25 9s25-4 25-9" />
				</>
			)
		case 'document-page':
			return (
				<>
					<path d="M24 9h31l17 17v37H24Z" />
					<path d="M55 9v17h17M34 35h28M34 44h24M34 53h30" />
				</>
			)
		case 'mobile-screen':
			return (
				<>
					<rect x="31" y="7" width="34" height="58" rx="7" />
					<path d="M42 14h12M39 27h18M39 36h18M39 45h12M45 58h6" />
				</>
			)
		case 'model-card':
			return (
				<>
					<rect x="10" y="13" width="76" height="46" rx="4" />
					<path d="M31 23l13 7.5v15L31 53l-13-7.5v-15L31 23ZM18 30.5 31 38l13-7.5M31 38v15M54 27h20M54 35h16M54 43h22M54 51h12" />
				</>
			)
		case 'stacked-windows':
			return (
				<>
					<rect x="18" y="20" width="58" height="37" rx="4" />
					<path d="M24 14h58v37M12 26v37h58" />
				</>
			)
		case 'terminal-window':
			return (
				<>
					<rect x="9" y="12" width="78" height="48" rx="5" />
					<path d="M9 24h78M23 37l7 6-7 6M38 50h24" />
					<circle cx="17" cy="18" r="1" />
					<circle cx="23" cy="18" r="1" />
					<circle cx="29" cy="18" r="1" />
				</>
			)
		case 'workflow-canvas':
			return (
				<>
					<rect x="9" y="10" width="78" height="52" rx="5" />
					<rect x="18" y="24" width="19" height="12" rx="3" />
					<rect x="59" y="24" width="19" height="12" rx="3" />
					<rect x="38" y="44" width="20" height="12" rx="3" />
					<path d="M37 30h22M48 36v8" />
				</>
			)
	}
}

function getConceptFrameSizeClass(size: ConceptFrameSize): string | undefined {
	switch (size) {
		case 'large':
			return concreteClassNames.conceptFrameLarge
		case 'medium':
			return undefined
		case 'small':
			return concreteClassNames.conceptFrameSmall
	}
}
