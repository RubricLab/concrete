import { defineExamples } from '../../factories/createExamples'
import { Token } from '../token'
import { SearchInput } from './component'

export const searchInputExamples = defineExamples({
	default: {
		description: 'Search input anatomy with icon and shortcut slot.',
		render: () => <SearchInput inputProps={{ placeholder: 'Search...' }} shortcut={['⌘', 'K']} />
	},
	tokens: {
		description: 'Search input with selected token grammar.',
		render: () => (
			<SearchInput
				inputProps={{ placeholder: 'Filter...' }}
				tokens={
					<Token leadingIcon="folder" removable intent="sky">
						Research
					</Token>
				}
				wrap
			/>
		)
	},
	value: {
		description: 'Controlled value display without owning search behavior.',
		render: () => <SearchInput inputProps={{ defaultValue: 'agent traces' }} />
	}
})
