import { defineExamples } from '../../factories/createExamples'
import {
	SuggestionMenu,
	SuggestionMenuItem,
	SuggestionMenuLayer,
	SuggestionMenuList,
	SuggestionMenuTitle
} from './component'

export const suggestionMenuExamples = defineExamples({
	commands: {
		description: 'Command suggestion menu with disabled item.',
		render: () => (
			<SuggestionMenuLayer placement="inline">
				<SuggestionMenu>
					<SuggestionMenuTitle trigger="/">Commands</SuggestionMenuTitle>
					<SuggestionMenuList>
						<SuggestionMenuItem active description="Run full route audit." itemKind="command" meta="⌘↵">
							Audit catalog
						</SuggestionMenuItem>
						<SuggestionMenuItem
							description="Needs a selected component."
							disabled
							itemKind="command"
							meta="disabled"
						>
							Polish selected primitive
						</SuggestionMenuItem>
					</SuggestionMenuList>
				</SuggestionMenu>
			</SuggestionMenuLayer>
		)
	},
	default: {
		description: 'Composer suggestion menu in its layer.',
		render: () => (
			<SuggestionMenuLayer placement="inline">
				<SuggestionMenu>
					<SuggestionMenuTitle trigger="@">Mentions</SuggestionMenuTitle>
					<SuggestionMenuList>
						<SuggestionMenuItem active description="Insert reusable context." meta="⌘1">
							Workspace context
						</SuggestionMenuItem>
						<SuggestionMenuItem description="Attach a saved command." meta="⌘2">
							Command recipe
						</SuggestionMenuItem>
					</SuggestionMenuList>
				</SuggestionMenu>
			</SuggestionMenuLayer>
		)
	},
	empty: {
		description: 'Empty suggestion list.',
		render: () => (
			<SuggestionMenuLayer placement="inline">
				<SuggestionMenu>
					<SuggestionMenuTitle trigger="/">Commands</SuggestionMenuTitle>
					<SuggestionMenuList empty="No matches" />
				</SuggestionMenu>
			</SuggestionMenuLayer>
		)
	}
})
