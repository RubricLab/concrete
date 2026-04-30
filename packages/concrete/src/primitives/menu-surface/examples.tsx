import { defineExamples } from '../../factories/createExamples'
import { MenuGroup } from '../menu-group'
import { OptionRow } from '../option-row'
import { SearchInput } from '../search-input'
import { MenuSurface } from './component'

export const menuSurfaceExamples = defineExamples({
	compact: {
		description: 'Compact menu density.',
		render: () => (
			<MenuSurface density="compact">
				<MenuGroup title="Actions">
					<OptionRow kind="command" leadingIcon="copy">
						Copy
					</OptionRow>
					<OptionRow kind="command" leadingIcon="trash-2" tone="error">
						Delete
					</OptionRow>
				</MenuGroup>
			</MenuSurface>
		)
	},
	default: {
		description: 'Menu surface for command and selection workflows.',
		render: () => (
			<MenuSurface>
				<MenuGroup title="Commands">
					<OptionRow kind="command" leadingIcon="sparkles">
						Ask Concrete
					</OptionRow>
					<OptionRow kind="command" leadingIcon="file-text">
						Open brief
					</OptionRow>
				</MenuGroup>
			</MenuSurface>
		)
	},
	search: {
		description: 'Menu surface with search input anatomy.',
		render: () => (
			<MenuSurface>
				<SearchInput inputProps={{ placeholder: 'Search commands...' }} />
				<MenuGroup title="Results">
					<OptionRow kind="command" leadingIcon="search">
						Search docs
					</OptionRow>
				</MenuGroup>
			</MenuSurface>
		)
	}
})
