import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import {
	SuggestionMenu,
	SuggestionMenuItem,
	SuggestionMenuLayer,
	SuggestionMenuList,
	SuggestionMenuTitle
} from './component'
import { suggestionMenuExamples } from './examples'
import { suggestionMenuMeta } from './meta'
import { type SuggestionMenuValue, suggestionMenuSchema } from './schema'

export type {
	SuggestionMenuItemProps,
	SuggestionMenuLayerProps,
	SuggestionMenuListProps,
	SuggestionMenuProps,
	SuggestionMenuTitleProps
} from './component'
export {
	SuggestionMenu,
	SuggestionMenuItem,
	SuggestionMenuLayer,
	SuggestionMenuList,
	SuggestionMenuTitle
} from './component'
export type { SuggestionMenuInput, SuggestionMenuValue } from './schema'
export { suggestionMenuPropsSchema, suggestionMenuSchema } from './schema'

export const suggestionMenuPrimitiveDefinition = createPrimitive({
	...suggestionMenuMeta,
	component: SuggestionMenu,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(suggestionMenuExamples, state),
	renderInput: input => renderSuggestionMenuInput(suggestionMenuSchema.parse(input)),
	schema: suggestionMenuSchema,
	slug: 'suggestion-menu',
	states: exampleStates(suggestionMenuExamples, ['default', 'commands', 'empty'])
})

function renderSuggestionMenuInput({
	active,
	description,
	label,
	meta,
	title,
	trigger
}: SuggestionMenuValue) {
	return (
		<SuggestionMenuLayer placement="inline">
			<SuggestionMenu>
				<SuggestionMenuTitle trigger={trigger}>{title}</SuggestionMenuTitle>
				<SuggestionMenuList>
					<SuggestionMenuItem active={active} description={description} meta={meta}>
						{label}
					</SuggestionMenuItem>
				</SuggestionMenuList>
			</SuggestionMenu>
		</SuggestionMenuLayer>
	)
}
