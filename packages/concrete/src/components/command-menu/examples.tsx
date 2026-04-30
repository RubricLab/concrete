import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { CommandMenu, type CommandMenuItem } from './component'

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

export const commandMenuExamples = defineExamples({
	default: {
		description: 'Palette with search, grouped results, active row, shortcuts, and footer hints.',
		render: () => renderCommandMenuExample('default')
	},
	empty: {
		description: 'No-result state with the same shell and keyboard contract.',
		render: () => renderCommandMenuExample('empty')
	},
	loading: {
		description: 'Pending remote results without changing layout.',
		render: () => renderCommandMenuExample('loading')
	}
})

function renderCommandMenuExample(state: 'default' | 'empty' | 'loading'): ReactNode {
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
