import { defineExamples } from '../../factories/createExamples'
import { OptionRow } from '../option-row'
import { MenuGroup } from './component'

export const menuGroupExamples = defineExamples({
	default: {
		description: 'Labeled menu group with active and passive commands.',
		render: () => (
			<MenuGroup title="Commands">
				<OptionRow active kind="command" leadingIcon="sparkles">
					Ask Concrete
				</OptionRow>
				<OptionRow kind="command" leadingIcon="file-text">
					Open brief
				</OptionRow>
			</MenuGroup>
		)
	},
	selection: {
		description: 'Group containing selectable options.',
		render: () => (
			<MenuGroup title="Views">
				<OptionRow selected>Product</OptionRow>
				<OptionRow>Editorial</OptionRow>
				<OptionRow disabled>Archived</OptionRow>
			</MenuGroup>
		)
	},
	status: {
		description: 'Group with destructive command state.',
		render: () => (
			<MenuGroup title="Danger">
				<OptionRow kind="command" intent="error">
					Delete run
				</OptionRow>
			</MenuGroup>
		)
	}
})
