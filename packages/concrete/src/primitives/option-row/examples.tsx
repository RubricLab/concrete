import { defineExamples } from '../../factories/createExamples'
import { OptionRow } from './component'

export const optionRowExamples = defineExamples({
	command: {
		description: 'Command row with icon, description, and shortcut.',
		render: () => renderCommandOptionRow()
	},
	danger: {
		description: 'Destructive command treatment.',
		render: () => (
			<>
				<OptionRow active kind="command" leadingIcon="trash-2" intent="error">
					Delete thread
				</OptionRow>
			</>
		)
	},
	default: {
		description: 'Command, select, and destructive option row anatomy.',
		render: () => (
			<>
				<OptionRow
					active
					description="Create a new research note"
					kind="command"
					leadingIcon="folder-plus"
					shortcuts={['N']}
				>
					New note
				</OptionRow>
				<OptionRow description="Research workspace" kind="select" meta="12" selected>
					Rubric Labs
				</OptionRow>
				<OptionRow kind="command" leadingIcon="trash-2" intent="error">
					Delete thread
				</OptionRow>
			</>
		)
	},
	select: {
		description: 'Selectable option row with meta and selected state.',
		render: () => (
			<>
				<OptionRow description="Research workspace" kind="select" meta="12" selected>
					Rubric Labs
				</OptionRow>
			</>
		)
	}
})

function renderCommandOptionRow() {
	return (
		<OptionRow
			active
			description="Create a new research note"
			kind="command"
			leadingIcon="folder-plus"
			shortcuts={['N']}
		>
			New note
		</OptionRow>
	)
}
