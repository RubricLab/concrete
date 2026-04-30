import { defineExamples } from '../../factories/createExamples'
import {
	ToolbarControl,
	ToolbarControlButton,
	ToolbarControlGroup,
	ToolbarControlSeparator,
	ToolbarFormatGlyph
} from './component'

export const toolbarControlExamples = defineExamples({
	compact: {
		description: 'Dense rail suitable for editors, inspectors, and composers.',
		render: () => renderToolbarControlExample('compact')
	},
	default: {
		description: 'Grouped controls with tooltip and shortcut affordances.',
		render: () => renderToolbarControlExample('default')
	},
	selected: {
		description: 'Selected and keyboard-pressed states for mode controls.',
		render: () => renderToolbarControlExample('selected')
	}
})

function renderToolbarControlExample(state: 'compact' | 'default' | 'selected') {
	const compact = state === 'compact'

	return (
		<ToolbarControl compact={compact} label="Editor toolbar">
			<ToolbarControlGroup>
				<ToolbarControlButton icon="paperclip" label="Attach" showLabel={false} />
				<ToolbarControlButton icon="at-sign" label="Mention" shortcut={['@']} showLabel={false} />
				<ToolbarControlButton icon="slash" label="Command" shortcut={['/']} showLabel={false} />
			</ToolbarControlGroup>
			<ToolbarControlSeparator />
			<ToolbarControlGroup>
				<ToolbarControlButton
					appearance="subtle"
					label="Bold"
					pressed={state === 'selected'}
					shortcut={['cmd', 'B']}
					showShortcut={compact ? 'tooltip' : 'inline'}
				>
					<ToolbarFormatGlyph format="bold">B</ToolbarFormatGlyph>
				</ToolbarControlButton>
				<ToolbarControlButton
					appearance="subtle"
					label="Italic"
					shortcut={['cmd', 'I']}
					showShortcut={compact ? 'tooltip' : 'inline'}
				>
					<ToolbarFormatGlyph format="italic">I</ToolbarFormatGlyph>
				</ToolbarControlButton>
				<ToolbarControlButton
					appearance="subtle"
					label="Underline"
					selected={state === 'selected'}
					shortcut={['cmd', 'U']}
					showShortcut={compact ? 'tooltip' : 'inline'}
				>
					<ToolbarFormatGlyph format="underline">U</ToolbarFormatGlyph>
				</ToolbarControlButton>
			</ToolbarControlGroup>
			<ToolbarControlSeparator />
			<ToolbarControlGroup>
				<ToolbarControlButton icon="settings" label="Settings" showLabel={false} />
			</ToolbarControlGroup>
		</ToolbarControl>
	)
}
