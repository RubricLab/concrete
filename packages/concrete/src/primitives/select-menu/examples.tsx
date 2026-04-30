import { defineExamples } from '../../factories/createExamples'
import { OptionRow } from '../option-row'
import { SelectMenu } from './component'

export const selectMenuExamples = defineExamples({
	default: {
		description: 'Filterable select menu with selectable options.',
		render: () => (
			<SelectMenu
				filterInputProps={{ 'aria-label': 'Filter options', placeholder: 'Filter...' }}
				placement="inline"
			>
				<OptionRow kind="select" meta="12" selected>
					Research
				</OptionRow>
				<OptionRow kind="select" meta="8">
					Design system
				</OptionRow>
			</SelectMenu>
		)
	},
	static: {
		description: 'Select menu without a filter input.',
		render: () => (
			<SelectMenu placement="inline">
				<OptionRow kind="select" selected>
					Product
				</OptionRow>
				<OptionRow kind="select">Editorial</OptionRow>
			</SelectMenu>
		)
	}
})
