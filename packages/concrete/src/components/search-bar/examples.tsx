import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { Button, Stack } from '../../primitives'
import { CommandMenu, type CommandMenuItem } from '../command-menu'
import { SearchBar } from './component'

const searchBarCommandItems = [
	{
		description: 'Find the Sligo contract analysis memo.',
		group: 'Research',
		id: 'sligo-memo',
		label: 'Sligo memo',
		leadingIcon: 'file-text',
		meta: '12m'
	},
	{
		description: 'Open runtime configuration.',
		group: 'Settings',
		id: 'runtime',
		label: 'Runtime settings',
		leadingIcon: 'settings'
	}
] as const satisfies readonly CommandMenuItem[]

export const searchBarExamples = defineExamples({
	default: {
		description: 'Command search with scope tokens and submit affordance.',
		render: () => renderSearchBarExample('default')
	},
	menu: {
		description: 'Search bar composed with the command menu slot.',
		render: () => renderSearchBarExample('menu')
	},
	scoped: {
		description: 'Search with removable scope tokens and action slots.',
		render: () => renderSearchBarExample('scoped')
	},
	wrapped: {
		description: 'Wrapped token search for narrow generated surfaces.',
		render: () => renderSearchBarExample('wrapped')
	}
})

function renderSearchBarExample(state: 'default' | 'menu' | 'scoped' | 'wrapped'): ReactNode {
	const tokens = [
		{ id: 'workspace', intent: 'sky' as const, label: 'Rubric', leadingIcon: 'folder' as const },
		{ id: 'mode', intent: 'ultra' as const, label: 'agent runs', leadingIcon: 'activity' as const }
	]
	const actions = (
		<Button shortcut={['enter']} density="small" hierarchy="primary">
			Run
		</Button>
	)

	switch (state) {
		case 'default':
			return (
				<Stack density="compact">
					<SearchBar
						placeholder="Search, ask, or command..."
						query="triage sligo"
						shortcut={['command', 'k']}
					/>
					<SearchBar placeholder="Filter current results..." query="schema drift" shortcut={['/']} />
				</Stack>
			)
		case 'menu':
			return (
				<SearchBar
					actions={actions}
					menu={<CommandMenu items={searchBarCommandItems} query="sligo" searchable={false} />}
					placeholder="Search, ask, or command..."
					query="triage sligo"
					shortcut={['command', 'k']}
					tokens={tokens}
				/>
			)
		case 'scoped':
			return (
				<SearchBar
					actions={actions}
					placeholder="Search, ask, or command..."
					query="triage sligo"
					shortcut={['command', 'k']}
					tokens={tokens}
				/>
			)
		case 'wrapped':
			return (
				<SearchBar
					actions={actions}
					placeholder="Ask the workspace..."
					query="summarize failures"
					tokens={[
						...tokens,
						{ id: 'source', intent: 'terminal', label: 'docs', leadingIcon: 'book-open' },
						{ id: 'priority', intent: 'error', label: 'regression', leadingIcon: 'triangle-alert' }
					]}
					wrap
				/>
			)
	}
}
