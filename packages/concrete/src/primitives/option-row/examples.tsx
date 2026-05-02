import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../stack'
import { OptionRow } from './component'

export const optionRowExamples = defineExamples({
	command: {
		description: 'Command row with icon, description, and shortcut.',
		render: () => (
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
		description: 'Active command, selected value, disabled, and destructive rows.',
		render: () => (
			<Stack density="compact">
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
				<OptionRow disabled description="Locked by release policy" kind="select">
					Production
				</OptionRow>
				<OptionRow kind="command" leadingIcon="trash-2" intent="error">
					Delete thread
				</OptionRow>
			</Stack>
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
