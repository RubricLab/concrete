import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Stack } from '../stack'
import { Token } from '../token'
import { SearchInput } from './component'

export const searchInputExamples = defineExamples({
	default: {
		description: 'Query control with icon, shortcut slot, and action region.',
		render: () => (
			<SearchInput
				actions={<Button density="tiny">Run</Button>}
				inputProps={{ placeholder: 'Search components...' }}
				shortcut={['cmd', 'K']}
			/>
		)
	},
	tokens: {
		description: 'Search input with selected token grammar.',
		render: () => (
			<SearchInput
				actions={
					<Button density="tiny" hierarchy="secondary">
						Clear
					</Button>
				}
				inputProps={{ placeholder: 'Filter traces...' }}
				tokens={
					<>
						<Token leadingIcon="folder" removable intent="sky">
							Research
						</Token>
						<Token leadingIcon="sparkles" removable>
							Agent
						</Token>
					</>
				}
				wrap
			/>
		)
	},
	value: {
		description: 'Controlled value display without owning search behavior.',
		render: () => (
			<Stack density="compact">
				<SearchInput inputProps={{ defaultValue: 'agent traces' }} />
				<SearchInput inputProps={{ defaultValue: 'schema errors', disabled: true }} />
			</Stack>
		)
	}
})
