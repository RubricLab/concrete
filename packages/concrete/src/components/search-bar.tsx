import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { Button } from '../primitives'
import { booleanControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { searchBarTokenSchema } from '../schemas'
import { CommandMenu, type CommandMenuItem } from './command-menu-view'
import { SearchBar } from './search-bar-view'

export { SearchBar, type SearchBarProps, type SearchToken } from './search-bar-view'

export const searchBarComponentSchema = z
	.object({
		menu: z.boolean().default(false),
		placeholder: z.string().default('Search, ask, or command...'),
		query: z.string().default('triage sligo'),
		tokens: z.array(searchBarTokenSchema).default([]),
		wrap: z.boolean().default(false)
	})
	.strict()

const searchBarCommandItems = [
	{ group: 'Actions', id: 'triage', label: 'Run triage', leadingIcon: 'activity' },
	{ group: 'Research', id: 'sligo', label: 'Open Sligo memo', leadingIcon: 'file-text' }
] as const satisfies readonly CommandMenuItem[]

export const searchBarComponentDefinition = defineConcreteComponent({
	category: 'form',
	component: SearchBar,
	controls: [
		textControl('query', 'Query', 'triage sligo'),
		textControl('placeholder', 'Placeholder', 'Search, ask, or command...'),
		booleanControl('tokens', 'Tokens', 'true'),
		booleanControl('menu', 'Menu', 'false'),
		booleanControl('wrap', 'Wrap', 'false')
	],
	description:
		'Compact single-line command input with removable scope tokens, keyboard hint, action slots, and optional menu slot.',
	guidance:
		'Search bar is intentionally slot-first: it can stay a search field, become a prompt bar, or host a command menu without changing the primitive contract.',
	kind: 'component',
	name: 'Search bar',
	pressure: ['product', 'generative'],
	props: [
		prop('query', 'string', 'Controlled input query.'),
		prop('defaultValue', 'string', 'Uncontrolled initial query.', "''"),
		prop('tokens', 'readonly SearchToken[]', 'Optional removable scope chips before the input.'),
		prop('actions', 'ReactNode', 'Trailing action slot for submit, filter, or mode controls.'),
		prop('menu', 'ReactNode', 'Popdown slot, commonly a CommandMenu.'),
		prop(
			'menuPlacement',
			"'popdown' | 'inline'",
			'Whether the menu floats over content or reserves flow height.',
			'popdown'
		),
		prop(
			'shortcut',
			'readonly string[]',
			'Keyboard hint rendered as a grouped chord in the field.',
			'[]'
		),
		prop(
			'wrap',
			'boolean',
			'Allows tokens and input to wrap when a composition wants taller search chrome.',
			'false'
		),
		prop('onSubmit', '(query: string) => void', 'Called on form submit.'),
		prop(
			'onTokenRemove',
			'(token: SearchToken) => void',
			'Called when a token close button is clicked.'
		)
	],
	renderExample: renderSearchBarExample,
	schema: searchBarComponentSchema,
	slug: 'search-bar',
	states: states([
		['default', 'Plain search with shortcut and trailing action.'],
		['scoped', 'Search with removable scope tokens and action slots.'],
		['menu', 'Search bar composed with the command menu slot.']
	])
})

function renderSearchBarExample(state = 'default'): ReactNode {
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
