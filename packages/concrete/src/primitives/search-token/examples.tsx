import { defineExamples } from '../../factories/createExamples'
import { SearchTokenPrimitive } from './component'

export const searchTokenExamples = defineExamples({
	default: {
		description: 'Default removable search token.',
		render: () => (
			<>
				<SearchTokenPrimitive removable>Workspace</SearchTokenPrimitive>
			</>
		)
	},
	icon: {
		description: 'Search token with leading glyph.',
		render: () => (
			<>
				<SearchTokenPrimitive leadingIcon="folder" removable tone="sky">
					Rubric
				</SearchTokenPrimitive>
			</>
		)
	},
	locked: {
		description: 'Non-removable search token.',
		render: () => (
			<>
				<SearchTokenPrimitive tone="ultra">Agent runs</SearchTokenPrimitive>
			</>
		)
	}
})
