'use client'

import {
	Button,
	CommandMenu,
	type CommandMenuItem,
	Message,
	ReasoningMessage,
	SearchBar,
	type SearchToken,
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarSeparator,
	ToolCallMessage
} from '@rubriclab/concrete'
import { useMemo, useState } from 'react'

const items = [
	{
		group: 'Jump to',
		id: 'case-study',
		label: 'Case study: Sligo',
		leadingIcon: 'folder',
		shortcut: ['enter']
	},
	{
		group: 'Jump to',
		id: 'contract',
		label: 'Sligo - contract.json',
		leadingIcon: 'file-text',
		meta: '/agents/sligo'
	},
	{
		group: 'Jump to',
		id: 'runs',
		label: 'Sligo - live runs',
		leadingIcon: 'activity',
		meta: '12 active'
	},
	{
		group: 'Actions',
		id: 'new-agent',
		label: 'New agent',
		leadingIcon: 'plus',
		shortcut: ['cmd', 'N']
	},
	{
		group: 'Actions',
		id: 'ask-rubric',
		label: 'Ask Rubric...',
		leadingIcon: 'sparkles',
		shortcut: ['cmd', 'J'],
		tone: 'sky'
	}
] as const satisfies readonly CommandMenuItem[]

const initialTokens = [
	{ id: 'workspace', label: 'Rubric', leadingIcon: 'folder', tone: 'sky' },
	{ id: 'mode', label: 'agent runs', leadingIcon: 'activity', tone: 'ultra' }
] as const satisfies readonly SearchToken[]

export function InteractionDemo() {
	const [query, setQuery] = useState('sligo')
	const [tokens, setTokens] = useState<readonly SearchToken[]>(initialTokens)
	const [selectedItem, setSelectedItem] = useState<CommandMenuItem | null>(null)
	const [toolbarMode, setToolbarMode] = useState<'ask' | 'search'>('search')
	const [filtersSelected, setFiltersSelected] = useState(false)
	const visibleItems = useMemo(() => items, [])

	return (
		<div className="interactionDemo">
			<div className="interactionPanel">
				<Toolbar compact label="Search toolbar">
					<ToolbarGroup>
						<ToolbarButton
							icon="search"
							label="Search"
							onClick={() => setToolbarMode('search')}
							selected={toolbarMode === 'search'}
							shortcut={['cmd', 'k']}
						/>
						<ToolbarButton
							icon="sparkles"
							label="Ask"
							onClick={() => setToolbarMode('ask')}
							selected={toolbarMode === 'ask'}
							shortcut={['cmd', 'j']}
						/>
						<ToolbarButton
							icon="filter"
							label="Filters"
							onSelectedChange={setFiltersSelected}
							selected={filtersSelected}
							shortcut={['cmd', 'f']}
							toggleable
						/>
					</ToolbarGroup>
					<ToolbarSeparator />
					<ToolbarGroup>
						<ToolbarButton icon="settings" label="Settings" />
					</ToolbarGroup>
				</Toolbar>
				<SearchBar
					actions={
						<Button shortcut={['enter']} size="small" variant="primary">
							Run
						</Button>
					}
					menu={
						<CommandMenu
							items={visibleItems}
							onSelect={setSelectedItem}
							onQueryChange={setQuery}
							query={query}
							searchable={false}
						/>
					}
					menuPlacement="inline"
					onQueryChange={setQuery}
					onTokenRemove={token => setTokens(current => current.filter(item => item.id !== token.id))}
					placeholder="Search, ask, or command..."
					query={query}
					tokens={tokens}
				/>
			</div>
			<div className="interactionTranscript">
				<Message author="You" messageRole="user">
					Open the Sligo case study and check active runs.
				</Message>
				<ReasoningMessage
					grouped
					summary="Scoping the workspace, matching Sligo assets, and preparing the run inspection."
				/>
				<ToolCallMessage
					grouped
					duration="1.2s"
					input="loadAgentRuns({ workspace: 'sligo' })"
					name="loadAgentRuns"
					output={selectedItem ? `Selected ${selectedItem.id}` : '12 active runs found.'}
					status="success"
				/>
			</div>
		</div>
	)
}

const chatTokens = [
	{ id: 'workspace', label: 'Concrete', leadingIcon: 'folder', tone: 'sky' },
	{ id: 'mode', label: 'agent interface audit', leadingIcon: 'activity', tone: 'ultra' },
	{ id: 'packet', label: 'long-payload', leadingIcon: 'file-text' }
] as const satisfies readonly SearchToken[]

const reasoningSteps = [
	{
		detail:
			'Read the transcript, active component state, registry metadata, and the render route contract before changing the composition.',
		id: 'read-context',
		label: 'Read transcript context',
		status: 'complete'
	},
	{
		detail:
			'Compare the visible hierarchy: final answer first, generated UI second, reasoning and tool calls lower but still expandable.',
		id: 'rank-hierarchy',
		label: 'Rank hierarchy pressure',
		status: 'complete'
	},
	{
		detail:
			'Stress the thread with long JSON, long natural language, removable chips, avatars, grouped rows, and message action toolbars.',
		id: 'stress-layout',
		label: 'Stress layout boundaries',
		status: 'complete'
	},
	{
		detail:
			'Keep behavior local and deterministic: product code owns execution, while Concrete owns focus, disclosure, and visual state.',
		id: 'local-contract',
		label: 'Preserve local contracts',
		status: 'complete'
	}
] as const

const longToolInput = `{
  "workspace": "rubric/concrete",
  "route": "/components",
	"viewport": { "width": 1280, "height": 880 },
	"packet": {
    "goal": "Validate quiet toolbars, message actions, reasoning collapse, and long search input behavior.",
    "selection": [
      "@rubriclab/concrete/components:interaction",
      "@rubriclab/concrete/components:ai",
      "apps/docs/app/components/interaction-demo.tsx"
    ],
    "longLine": "agent_event_01:command_menu_result:case-study-sligo:active-runs:12:latency-p95-180ms:token-window-128000:memory-layer-project:tooling-layer-playwright:render-route-jpeg"
  }
}`

const longToolOutput =
	'Loaded 42 transcript artifacts, 12 live runs, 8 component states, and 3 screenshot routes. The longest packet line remained horizontally scrollable inside the code block and did not expand the chat column.'

export function ChatStressDemo() {
	const [query, setQuery] = useState(
		'Ask Rubric to summarize the live Sligo runs, isolate the failing tool-call boundary, and draft the smallest deterministic fix with citations to the exact files touched.'
	)
	const [tokens, setTokens] = useState<readonly SearchToken[]>(chatTokens)

	return (
		<div className="chatShell">
			<header className="chatHeader">
				<div>
					<span className="eyebrow">Chat assembly</span>
					<h2>Long transcript, small controls.</h2>
				</div>
				<Toolbar compact label="Thread controls">
					<ToolbarButton icon="copy" label="Copy thread" showLabel={false} />
					<ToolbarButton icon="refresh-ccw" label="Retry latest" showLabel={false} />
					<ToolbarButton icon="more-horizontal" label="More" showLabel={false} />
				</Toolbar>
			</header>
			<div className="chatTranscript">
				<Message
					actions={
						<Toolbar compact label="User message actions">
							<ToolbarButton icon="pencil" label="Edit" showLabel={false} tooltipPlacement="bottom" />
							<ToolbarButton icon="copy" label="Copy" showLabel={false} tooltipPlacement="bottom" />
						</Toolbar>
					}
					author="Dexter"
					avatarInitials="DS"
					messageRole="user"
					showAvatar
				>
					Can you audit the interaction components against the real docs page and make sure the system
					can handle a large agent packet without the final answer getting buried?
				</Message>
				<ReasoningMessage
					grouped
					open
					steps={reasoningSteps}
					summary="Checking hierarchy, overflow, local behavior, and transcript density before changing code."
				/>
				<ToolCallMessage
					duration="2.4s"
					grouped
					input={longToolInput}
					language="json"
					name="inspectInteractionSurface"
					output={longToolOutput}
					status="success"
				/>
				<Message
					author="Rubric"
					avatarInitials="RL"
					grouped
					meta="interim"
					messageRole="assistant"
					showAvatar
					surface="plain"
				>
					<p>
						Edited interaction primitives and message composition. The visible reasoning and tool
						artifacts are intentionally lower contrast so the answer and generated interface remain the
						strongest layer.
					</p>
				</Message>
				<Message
					actions={
						<Toolbar compact label="Assistant message actions">
							<ToolbarButton icon="copy" label="Copy" showLabel={false} tooltipPlacement="bottom" />
							<ToolbarButton
								icon="refresh-ccw"
								label="Retry"
								showLabel={false}
								tooltipPlacement="bottom"
							/>
						</Toolbar>
					}
					author="Rubric"
					avatarInitials="RL"
					messageRole="assistant"
					showAvatar
				>
					<p>
						The interaction layer now behaves like a compact product surface: toolbar controls stay quiet,
						transcript rows support multiplayer avatars and action rails, reasoning collapses into a quiet
						process line, and tool calls can carry large payloads without widening the layout.
					</p>
					<ul>
						<li>Final answers stay plain and readable.</li>
						<li>Thinking and tool calls stay inspectable but visually secondary.</li>
						<li>Long search text stays inside the field instead of reshaping the surrounding chrome.</li>
					</ul>
				</Message>
			</div>
			<SearchBar
				actions={
					<Button
						leadingIcon="send-horizontal"
						shortcut={['cmd', 'enter']}
						size="small"
						variant="primary"
					>
						Send
					</Button>
				}
				onQueryChange={setQuery}
				onTokenRemove={token => setTokens(current => current.filter(item => item.id !== token.id))}
				placeholder="Ask, search, or run a command..."
				query={query}
				tokens={tokens}
			/>
		</div>
	)
}
