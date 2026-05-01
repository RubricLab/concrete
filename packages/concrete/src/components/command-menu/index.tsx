import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { CommandMenu, type CommandMenuItem } from './component'
import { commandMenuExamples } from './examples'
import { commandMenuMeta } from './meta'
import { type CommandMenuValue, commandMenuComponentSchema } from './schema'

export type { CommandMenuItem, CommandMenuProps } from './component'
export { CommandMenu } from './component'
export type { CommandMenuInput, CommandMenuValue } from './schema'
export { commandMenuComponentSchema } from './schema'

const commandMenuSeedItems = [
	{
		description: 'Create a new experiment from the current workspace.',
		group: 'Actions',
		id: 'new-run',
		label: 'New run',
		leadingIcon: 'plus',
		shortcut: ['cmd', 'N']
	},
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
	},
	{
		description: 'Requires a selected run.',
		disabled: true,
		group: 'Actions',
		id: 'rerun',
		label: 'Rerun selected',
		leadingIcon: 'refresh-ccw',
		meta: 'disabled'
	}
] as const satisfies readonly CommandMenuItem[]

export const commandMenuComponentDefinition = createComponent({
	...commandMenuMeta,
	component: CommandMenu,
	kind: 'component',
	renderExample: (state?: string) => renderExample(commandMenuExamples, state),
	renderInput: input => renderCommandMenuInput(commandMenuComponentSchema.parse(input)),
	schema: commandMenuComponentSchema,
	seed: commandMenuComponentSchema.parse({ items: commandMenuSeedItems, query: 'sligo' }),
	slug: 'command-menu',
	states: exampleStates(commandMenuExamples, ['default', 'empty', 'loading'])
})

function renderCommandMenuInput(input: CommandMenuValue) {
	return (
		<CommandMenu
			items={input.items}
			loading={input.loading}
			query={input.query}
			searchable={input.searchable}
		/>
	)
}
