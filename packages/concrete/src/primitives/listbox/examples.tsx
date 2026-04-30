import { defineExamples } from '../../factories/createExamples'
import { OptionRow } from '../option-row'
import { Listbox } from './component'

export const listboxExamples = defineExamples({
	compact: {
		description: 'Compact listbox for dense popovers and generated controls.',
		render: () => (
			<Listbox size="compact">
				<OptionRow kind="command" leadingIcon="search">
					Search docs
				</OptionRow>
				<OptionRow kind="command" leadingIcon="sparkles">
					Ask agent
				</OptionRow>
			</Listbox>
		)
	},
	default: {
		description: 'Selectable option listbox surface.',
		render: () => (
			<Listbox>
				<OptionRow selected>Research</OptionRow>
				<OptionRow>Design systems</OptionRow>
				<OptionRow>Agent traces</OptionRow>
			</Listbox>
		)
	},
	empty: {
		description: 'Empty listbox state.',
		render: () => <Listbox emptyLabel="No matches" />
	}
})
