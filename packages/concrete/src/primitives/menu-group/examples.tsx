import { defineExamples } from '../../factories/createExamples'
import { OptionRow } from '../option-row'
import { MenuGroup } from './component'

export const menuGroupExamples = defineExamples({
	default: {
		description: 'Labeled menu group region.',
		render: () => (
			<MenuGroup title="Commands">
				<OptionRow kind="command">Ask Concrete</OptionRow>
				<OptionRow kind="command">Open brief</OptionRow>
			</MenuGroup>
		)
	},
	selection: {
		description: 'Group containing selectable options.',
		render: () => (
			<MenuGroup title="Views">
				<OptionRow selected>Product</OptionRow>
				<OptionRow>Editorial</OptionRow>
			</MenuGroup>
		)
	},
	status: {
		description: 'Group with destructive command state.',
		render: () => (
			<MenuGroup title="Danger">
				<OptionRow kind="command" tone="error">
					Delete run
				</OptionRow>
			</MenuGroup>
		)
	}
})
