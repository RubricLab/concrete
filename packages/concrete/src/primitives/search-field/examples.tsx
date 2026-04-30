import { defineExamples } from '../../factories/createExamples'
import { MenuShell, MenuShellBody, MenuShellGroup } from '../menu-shell'
import { OptionRow } from '../option-row'
import { SearchTokenPrimitive } from '../search-token'
import { SearchField } from './component'

export const searchFieldExamples = defineExamples({
	default: {
		description: 'Compact search field with shortcut hint.',
		render: () => (
			<SearchField
				inputProps={{ 'aria-label': 'Search', placeholder: 'Search...' }}
				shortcut={['⌘', 'K']}
			/>
		)
	},
	menu: {
		description: 'Search field with inline command menu slot.',
		render: () => (
			<SearchField
				inputProps={{ 'aria-label': 'Search', placeholder: 'Search commands...' }}
				menu={
					<MenuShell>
						<MenuShellBody>
							<MenuShellGroup title="Commands">
								<OptionRow kind="command" leadingIcon="file-text" shortcuts={['N']}>
									New research note
								</OptionRow>
								<OptionRow kind="command" leadingIcon="settings">
									Open workspace settings
								</OptionRow>
							</MenuShellGroup>
						</MenuShellBody>
					</MenuShell>
				}
				menuPlacement="inline"
			/>
		)
	},
	tokens: {
		description: 'Search field with query tokens.',
		render: () => (
			<SearchField
				inputProps={{ 'aria-label': 'Search', placeholder: 'Search...' }}
				tokens={
					<SearchTokenPrimitive leadingIcon="folder" tone="sky">
						Workspace
					</SearchTokenPrimitive>
				}
				wrap
			/>
		)
	}
})
