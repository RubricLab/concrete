import { defineExamples } from '../../factories/createExamples'
import { Kbd } from '../kbd'
import { OptionRow } from '../option-row'
import {
	MenuShell,
	MenuShellBody,
	MenuShellEmpty,
	MenuShellFooter,
	MenuShellGroup,
	MenuShellSearch
} from './component'

export const menuShellExamples = defineExamples({
	default: {
		description: 'Command menu shell with search, grouped rows, and footer.',
		render: () => (
			<MenuShell>
				<MenuShellSearch inputProps={{ placeholder: 'Search commands...' }} />
				<MenuShellBody>
					<MenuShellGroup title="Actions">
						<OptionRow kind="command" leadingIcon="folder-plus" shortcuts={['N']}>
							New workspace
						</OptionRow>
						<OptionRow kind="command" leadingIcon="settings">
							Open settings
						</OptionRow>
					</MenuShellGroup>
				</MenuShellBody>
				<MenuShellFooter
					end={
						<>
							<Kbd>↑</Kbd> <Kbd>↓</Kbd> navigate
						</>
					}
					start="Commands"
				/>
			</MenuShell>
		)
	},
	empty: {
		description: 'Empty command menu treatment.',
		render: () => (
			<MenuShell>
				<MenuShellBody>
					<MenuShellEmpty>No matches</MenuShellEmpty>
				</MenuShellBody>
			</MenuShell>
		)
	}
})
