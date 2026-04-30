import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { Frame } from '../../primitives'
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from './component'
import { toolbarExamples } from './examples'
import { toolbarMeta } from './meta'
import { type ToolbarValue, toolbarComponentSchema } from './schema'

export type {
	ToolbarButtonAppearance,
	ToolbarButtonProps,
	ToolbarGroupProps,
	ToolbarProps,
	ToolbarSeparatorProps
} from './component'
export { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from './component'
export type { ToolbarInput, ToolbarValue } from './schema'
export { toolbarComponentSchema } from './schema'

export const toolbarComponentDefinition = createComponent({
	...toolbarMeta,
	component: Toolbar,
	kind: 'component',
	renderExample: (state?: string) => renderExample(toolbarExamples, state),
	renderInput: input => renderToolbarInput(toolbarComponentSchema.parse(input)),
	schema: toolbarComponentSchema,
	slug: 'toolbar',
	states: exampleStates(toolbarExamples, ['default', 'selected', 'compact'])
})

function renderToolbarInput(input: ToolbarValue) {
	const shortcut =
		input.shortcut === 'cmd-enter'
			? ['cmd', 'enter']
			: input.shortcut === 'cmd-k'
				? ['cmd', 'K']
				: undefined

	return (
		<Frame>
			<Toolbar compact={input.compact} label="Preview toolbar">
				<ToolbarGroup>
					<ToolbarButton
						appearance={input.appearance}
						label={input.label}
						pressed={input.pressed}
						selected={input.selected}
						{...(input.appearance === 'chip' ? {} : { icon: 'search' as const })}
						{...(shortcut ? { shortcut } : {})}
						showLabel={input.appearance === 'chip'}
					/>
					<ToolbarButton icon="settings" label="Settings" showLabel={false} />
				</ToolbarGroup>
				<ToolbarSeparator />
				<ToolbarGroup>
					<ToolbarButton icon="copy" label="Copy" showLabel={false} />
				</ToolbarGroup>
			</Toolbar>
		</Frame>
	)
}
