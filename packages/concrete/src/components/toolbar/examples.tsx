import { defineExamples } from '../../factories/createExamples'
import { ToolbarFormatGlyph } from '../../primitives'
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from './component'

export const toolbarExamples = defineExamples({
	compact: {
		description: 'Dense rail suitable for editors, inspectors, and composers.',
		render: () => renderToolbarExample('compact')
	},
	default: {
		description: 'Grouped controls with tooltip and shortcut affordances.',
		render: () => renderToolbarExample('default')
	},
	selected: {
		description: 'Selected and keyboard-pressed states for mode controls.',
		render: () => renderToolbarExample('selected')
	}
})

function renderToolbarExample(state: 'compact' | 'default' | 'selected') {
	const compact = state === 'compact'

	return (
		<Toolbar compact={compact} label="Editor toolbar">
			<ToolbarGroup>
				<ToolbarButton icon="paperclip" label="Attach" showLabel={false} />
				<ToolbarButton icon="at-sign" label="Mention" shortcut={['@']} showLabel={false} />
				<ToolbarButton icon="slash" label="Command" shortcut={['/']} showLabel={false} />
			</ToolbarGroup>
			<ToolbarSeparator />
			<ToolbarGroup>
				<ToolbarButton
					appearance="subtle"
					label="Bold"
					pressed={state === 'selected'}
					shortcut={['cmd', 'B']}
					showShortcut={compact ? 'tooltip' : 'inline'}
				>
					B
				</ToolbarButton>
				<ToolbarButton
					appearance="subtle"
					label="Italic"
					shortcut={['cmd', 'I']}
					showShortcut={compact ? 'tooltip' : 'inline'}
				>
					<ToolbarFormatGlyph format="italic">I</ToolbarFormatGlyph>
				</ToolbarButton>
				<ToolbarButton
					appearance="subtle"
					label="Underline"
					selected={state === 'selected'}
					shortcut={['cmd', 'U']}
					showShortcut={compact ? 'tooltip' : 'inline'}
				>
					<ToolbarFormatGlyph format="underline">U</ToolbarFormatGlyph>
				</ToolbarButton>
			</ToolbarGroup>
			<ToolbarSeparator />
			<ToolbarGroup>
				<ToolbarButton icon="settings" label="Settings" showLabel={false} />
			</ToolbarGroup>
		</Toolbar>
	)
}
