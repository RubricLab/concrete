import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { Button } from '../../primitives'
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
		description: 'Plain search with shortcut and trailing action.',
		render: () => renderSearchBarExample('default')
	},
	menu: {
		description: 'Search bar composed with the command menu slot.',
		render: () => renderSearchBarExample('menu')
	},
	scoped: {
		description: 'Search with removable scope tokens and action slots.',
		render: () => renderSearchBarExample('scoped')
	}
})

function renderSearchBarExample(state: 'default' | 'menu' | 'scoped'): ReactNode {
	return (
		<CommandStage>
			<SearchBar
				actions={
					<Button shortcut={['enter']} size="small" variant="primary">
						Run
					</Button>
				}
				placeholder="Search, ask, or command..."
				query={state === 'default' ? '' : 'triage sligo'}
				tokens={
					state === 'scoped' || state === 'menu'
						? [
								{ id: 'workspace', label: 'Rubric', leadingIcon: 'folder', tone: 'sky' },
								{ id: 'mode', label: 'agent runs', leadingIcon: 'activity', tone: 'ultra' }
							]
						: []
				}
				{...(state === 'menu'
					? { menu: <CommandMenu items={searchBarCommandItems} query="sligo" searchable={false} /> }
					: {})}
			/>
		</CommandStage>
	)
}

function CommandStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 520, width: '100%' }}>{children}</div>
}
