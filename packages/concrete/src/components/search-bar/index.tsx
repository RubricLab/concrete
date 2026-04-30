import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { Button } from '../../primitives'
import { CommandMenu, type CommandMenuItem } from '../command-menu'
import { SearchBar, type SearchToken } from './component'
import { searchBarExamples } from './examples'
import { searchBarMeta } from './meta'
import { type SearchBarValue, searchBarComponentSchema } from './schema'

export type { SearchBarProps, SearchToken } from './component'
export { SearchBar } from './component'
export type { SearchBarInput, SearchBarValue } from './schema'
export { searchBarComponentSchema } from './schema'

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

export const searchBarComponentDefinition = createComponent({
	...searchBarMeta,
	component: SearchBar,
	kind: 'component',
	renderExample: (state?: string) => renderExample(searchBarExamples, state),
	renderInput: input => renderSearchBarInput(searchBarComponentSchema.parse(input)),
	schema: searchBarComponentSchema,
	seed: searchBarComponentSchema.parse({
		query: 'triage sligo',
		tokens: [
			{ id: 'workspace', label: 'Rubric', leadingIcon: 'folder', tone: 'sky' },
			{ id: 'mode', label: 'agent runs', leadingIcon: 'activity', tone: 'ultra' }
		]
	}),
	slug: 'search-bar',
	states: exampleStates(searchBarExamples, ['default', 'scoped', 'menu'])
})

function renderSearchBarInput(input: SearchBarValue) {
	const tokens = input.tokens.map(token => {
		const { leadingIcon, ...requiredToken } = token

		return {
			...requiredToken,
			...(leadingIcon ? { leadingIcon } : {})
		} satisfies SearchToken
	})

	return (
		<SearchBar
			actions={
				<Button shortcut={['enter']} size="small" variant="primary">
					Run
				</Button>
			}
			placeholder={input.placeholder}
			query={input.query}
			tokens={tokens}
			wrap={input.wrap}
			{...(input.menu
				? { menu: <CommandMenu items={searchBarCommandItems} query={input.query} searchable={false} /> }
				: {})}
		/>
	)
}
