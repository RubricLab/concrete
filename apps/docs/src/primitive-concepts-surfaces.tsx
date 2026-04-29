'use client'

import {
	Avatar,
	BrandMark,
	Bubble,
	Button,
	Card,
	CodeBlock,
	ConcreteIcon,
	Divider,
	EmptyState,
	Frame,
	InlineCode,
	Input,
	Kbd,
	Row,
	Texture,
	Tooltip,
	Wordmark
} from '@rubriclab/concrete'
import type { IconName } from '@rubriclab/concrete/icons'
import { ConceptLabel } from './primitive-concept-parts'

const miniIconNames = [
	'search',
	'home',
	'settings',
	'bell',
	'message-square',
	'activity',
	'file-text',
	'folder',
	'check',
	'plus',
	'trash-2',
	'sparkles'
] as const satisfies readonly IconName[]

const emptyStateCatalog = [
	['search', 'No results', 'Filtered views and empty queries.'],
	['file-text', 'No documents yet', 'Blank-slate creation surfaces.'],
	['inbox', 'All caught up', 'Good-empty queues without a CTA.'],
	['user', 'No members', 'Empty groups, channels, and projects.'],
	['lock', 'No access', 'Permission and authentication gates.'],
	['trash-2', 'Trash is empty', 'Destructive history with nothing to show.']
] as const satisfies readonly [IconName, string, string][]

export function CardConcept() {
	return (
		<div className="conceptGridThree">
			<Card description="Border only. The canonical surface." title="Default" />
			<Card description="One step over canvas." title="Raised" variant="raised" />
			<Card description="Recessed. Code, quotes, wells." title="Sunken" variant="sunken" />
			<Card
				className="conceptSpanAll"
				description="Hairline lifts on hover; border tightens."
				interactive
				title="Interactive"
			/>
		</div>
	)
}

export function RowConcept() {
	return (
		<div className="rowsMock">
			<Row leadingIcon="file-text" meta="edited" interactive>
				Research memo
			</Row>
			<Row leadingIcon="activity" meta="live" interactive>
				Agent run
			</Row>
			<Row leadingIcon="folder" meta="12k" interactive>
				Memory shard
			</Row>
		</div>
	)
}

export function AvatarConcept() {
	return (
		<div className="conceptRow">
			<Avatar initials="AK" size="small" />
			<Avatar initials="RL" />
			<Avatar initials="C" size="large" />
		</div>
	)
}

export function BubbleConcept() {
	return (
		<div className="conceptStack">
			<Bubble>Can you summarize the last run?</Bubble>
			<Bubble direction="outbound">Summarizing the trace now.</Bubble>
		</div>
	)
}

export function CodeConcept() {
	return (
		<div className="conceptStack">
			<ConceptLabel>Inline</ConceptLabel>
			<p>
				Install with <InlineCode>npm i @rubriclab/concrete</InlineCode>, then use{' '}
				<InlineCode>{'<ConcreteProvider>'}</InlineCode>. Tokens are exposed as{' '}
				<InlineCode>--concrete-ink-9</InlineCode>.
			</p>
			<ConceptLabel>Block - TypeScript</ConceptLabel>
			<CodeBlock
				code={`// Resolve a design token from the active theme
import { Tokens, fallback } from "./tokens"

export const DEFAULT_SCALE: number = 1.125

function token<K extends keyof Tokens>(name: K): string {
  const root = document.documentElement
  const value = getComputedStyle(root).getPropertyValue(\`--\${name}\`)
  return value.trim() || fallback(name, 12)
}`}
			/>
			<ConceptLabel>Block - HTML</ConceptLabel>
			<CodeBlock
				code={`<button class="btn btn--primary" type="submit">
  <svg viewBox="0 0 24 24">...</svg>
  Continue
</button>`}
				language="HTML"
			/>
		</div>
	)
}

export function DividerConcept() {
	return (
		<div className="conceptStack">
			<Divider />
			<Divider label="Section" />
		</div>
	)
}

export function EmptyStateConcept() {
	return (
		<div className="conceptStack">
			<ConceptLabel>Mark - icon catalog</ConceptLabel>
			<div className="emptyCatalog">
				{emptyStateCatalog.map(([iconName, label, description]) => (
					<div className="emptyCatalogRow" key={iconName}>
						<span className="emptyCatalogMark">
							<ConcreteIcon name={iconName} />
						</span>
						<span>
							<b>{label}</b>
							<small>{description}</small>
						</span>
					</div>
				))}
			</div>
			<ConceptLabel>Sizes - 36 - 48 - 64 - sky</ConceptLabel>
			<div className="conceptRow emptySizeRow">
				<span className="emptyCatalogMark emptyCatalogMarkSmall">
					<ConcreteIcon name="search" />
				</span>
				<span className="emptyCatalogMark">
					<ConcreteIcon name="search" />
				</span>
				<span className="emptyCatalogMark emptyCatalogMarkLarge">
					<ConcreteIcon name="search" />
				</span>
				<span className="emptyCatalogMark emptyCatalogMarkSky">
					<ConcreteIcon name="search" />
				</span>
			</div>
			<ConceptLabel>In context - copy - CTA</ConceptLabel>
			<div className="emptyContextGrid">
				<EmptyState
					action={
						<div className="emptyActionRow">
							<Button size="small" variant="secondary">
								Clear filters
							</Button>
							<Button size="small" variant="primary">
								New search
							</Button>
						</div>
					}
					body="Try a broader keyword, or clear the filters applied to this view."
					icon="search"
					size="large"
					title={
						<>
							No matches for <em>"concrete-ost"</em>
						</>
					}
				/>
				<EmptyState
					action={
						<div className="emptyActionRow">
							<Button size="small" variant="secondary">
								Import
							</Button>
							<Button size="small" variant="primary">
								New document <Kbd tone="dark">⌘N</Kbd>
							</Button>
						</div>
					}
					body="Drafts and shared docs will live here. Start one, or import from an existing source."
					icon="file-text"
					size="large"
					title={
						<>
							No <em>documents</em> yet
						</>
					}
					tone="sky"
				/>
				<EmptyState
					body="Nothing in the inbox."
					icon="inbox"
					size="large"
					title={
						<>
							All <em>caught up</em>
						</>
					}
				/>
			</div>
		</div>
	)
}

export function TooltipConcept() {
	return (
		<>
			<ConceptLabel>Placements - hover the anchor</ConceptLabel>
			<div className="conceptRow tooltipDemoRow">
				<Tooltip content="Tooltip copy" placement="top">
					<Button variant="secondary">Top</Button>
				</Tooltip>
				<Tooltip content="Tooltip copy" placement="right">
					<Button variant="secondary">Right</Button>
				</Tooltip>
				<Tooltip content="Tooltip copy" placement="bottom">
					<Button variant="secondary">Bottom</Button>
				</Tooltip>
				<Tooltip content="Tooltip copy" placement="left">
					<Button variant="secondary">Left</Button>
				</Tooltip>
			</div>
			<ConceptLabel>Always-visible</ConceptLabel>
			<div className="conceptRow tooltipAlwaysRow">
				<Tooltip content="The quick brown fox" forceOpen placement="top">
					<Button variant="secondary">Anchor</Button>
				</Tooltip>
				<Tooltip content="With shortcut" forceOpen placement="right" shortcut={['shift', 'S']}>
					<Button variant="secondary">Anchor</Button>
				</Tooltip>
			</div>
		</>
	)
}

export function FrameConcept() {
	return (
		<Frame footer="Footer" footerMeta="meta" header="Eyebrow" headerMeta="meta">
			body
		</Frame>
	)
}

export function TextureConcept() {
	return (
		<div className="conceptGridThree">
			<Texture className="textureSample" variant="lattice" />
			<Texture className="textureSample" variant="dots" />
			<Texture className="textureSample" variant="lines" />
		</div>
	)
}

export function BrandConcept() {
	return (
		<div className="brandGrid">
			<div>
				<ConceptLabel>Mark - ink on surface</ConceptLabel>
				<div className="brandSquare">
					<BrandMark className="brandMarkLarge" />
				</div>
			</div>
			<div>
				<ConceptLabel>Mark - inverse</ConceptLabel>
				<div className="brandSquare brandSquareInverse">
					<BrandMark className="brandMarkLarge" inverse />
				</div>
			</div>
			<div>
				<ConceptLabel>Wordmark</ConceptLabel>
				<div className="brandSquare">
					<Wordmark />
				</div>
			</div>
			<div>
				<ConceptLabel>Wordmark - inverse</ConceptLabel>
				<div className="brandSquare brandSquareInverse">
					<Wordmark className="brandWordmarkInverse" />
				</div>
			</div>
		</div>
	)
}

export function WordmarkConcept() {
	return (
		<div className="wordmarkOnly">
			<Wordmark />
		</div>
	)
}

export function IconConcept() {
	return (
		<div className="iconMiniGrid">
			{miniIconNames.map(name => (
				<span key={name}>
					<ConcreteIcon name={name} />
				</span>
			))}
		</div>
	)
}

export function FocusConcept() {
	return (
		<div className="conceptStack">
			<ConceptLabel>Tokens - 3px flush ring</ConceptLabel>
			<div className="focusTokenGrid">
				<FocusToken className="focusTokenDefault" label="Default - sky" token="--ring" />
				<FocusToken className="focusTokenInk" label="Neutral - on light" token="--ring-ink" />
				<FocusToken className="focusTokenTerminal" label="Terminal" token="--ring-terminal" />
				<FocusToken className="focusTokenUltra" label="Ultra" token="--ring-ultra" />
				<FocusToken className="focusTokenError" label="Error" token="--ring-error" />
				<FocusToken className="focusTokenInvert" label="On dark" token="--ring-invert" />
			</div>
			<ConceptLabel>Live - tab through</ConceptLabel>
			<div className="conceptRow focusLiveRow">
				<Button className="focusVisibleDemo" variant="secondary">
					Secondary
				</Button>
				<Button variant="primary">Primary</Button>
				<Button variant="sky">Ship</Button>
				<Button variant="ultra">Upgrade</Button>
				<Button variant="danger">Delete</Button>
				<Input className="focusDemoInput" placeholder="Search..." />
			</div>
		</div>
	)
}

function FocusToken({
	className,
	label,
	token
}: {
	className: string
	label: string
	token: string
}) {
	return (
		<div className={`focusToken ${className}`}>
			<div>Aa</div>
			<code>{token}</code>
			<span>{label}</span>
		</div>
	)
}
