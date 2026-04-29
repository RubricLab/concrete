import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { booleanControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { commandItemSchema } from '../schemas'
import { CommandMenu, type CommandMenuItem } from './command-menu-view'

export { CommandMenu, type CommandMenuItem, type CommandMenuProps } from './command-menu-view'

export const commandMenuComponentSchema = z
	.object({
		items: z.array(commandItemSchema).default([]),
		loading: z.boolean().default(false),
		query: z.string().default('sligo'),
		searchable: z.boolean().default(true)
	})
	.strict()

const commandMenuItems = [
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
	}
] as const satisfies readonly CommandMenuItem[]

export const commandMenuComponentDefinition = defineConcreteComponent({
	category: 'navigation',
	component: CommandMenu,
	controls: [
		textControl('query', 'Query', 'sligo'),
		booleanControl('searchable', 'Searchable', 'true'),
		booleanControl('loading', 'Loading', 'false')
	],
	description:
		'Searchable action and navigation listbox with grouped items, keyboard navigation, shortcuts, loading, and empty states.',
	guidance:
		'Command menu is the shared substrate for palettes, / commands, @ suggestions, quick switchers, and model/action pickers.',
	kind: 'component',
	name: 'Command menu',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'items',
			'readonly CommandMenuItem[]',
			'Grouped command items with labels, metadata, shortcuts, and disabled state.',
			undefined,
			true
		),
		prop('query', 'string', 'Controlled search query.'),
		prop('defaultActiveId', 'string', 'Initial active item id for uncontrolled navigation.'),
		prop('activeId', 'string', 'Controlled active item id.'),
		prop('searchable', 'boolean', 'Renders the search input header.', 'true'),
		prop('loading', 'boolean', 'Shows a pending remote results row.', 'false'),
		prop(
			'onSelect',
			'(item: CommandMenuItem) => void',
			'Called when Enter, Tab, or click selects an enabled item.'
		),
		prop('onEscape', '() => void', 'Called when Escape closes the menu.')
	],
	renderExample: renderCommandMenuExample,
	schema: commandMenuComponentSchema,
	slug: 'command-menu',
	states: states([
		['default', 'Palette with search, grouped results, active row, shortcuts, and footer hints.'],
		['empty', 'No-result state with the same shell and keyboard contract.'],
		['loading', 'Pending remote results without changing layout.']
	])
})

function renderCommandMenuExample(state = 'default'): ReactNode {
	return (
		<CommandStage>
			<CommandMenu
				items={state === 'empty' ? [] : commandMenuItems}
				loading={state === 'loading'}
				query={state === 'empty' ? 'missing' : 'sligo'}
			/>
		</CommandStage>
	)
}

function CommandStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 420, width: '100%' }}>{children}</div>
}
