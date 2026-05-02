import { defineExamples } from '../../factories/createExamples'
import {
	ToolbarControlButton,
	ToolbarControlGroup,
	ToolbarControlSeparator,
	ToolbarFormatGlyph
} from '../toolbar-control'
import {
	ComposerEditor,
	ComposerFooter,
	ComposerSendButton,
	ComposerSubmitDock,
	ComposerSurface,
	ComposerToolbar
} from './component'

export const composerSurfaceExamples = defineExamples({
	default: {
		description: 'Composer editor frame with toolbar and submit dock.',
		render: () => renderComposerSurfaceExample(false)
	},
	disabled: {
		description: 'Disabled composer shell state.',
		render: () => renderComposerSurfaceExample(true)
	},
	filled: {
		description: 'Composer shell with drafted prompt content.',
		render: () => (
			<ComposerSurface>
				<ComposerEditor
					aria-label="Message composer"
					aria-multiline="true"
					placeholder="Write a message..."
					role="textbox"
				>
					Summarize the new table fixture and call out any missing primitive states.
				</ComposerEditor>
				<ComposerFooter>
					<ComposerToolbar>
						<ToolbarControlGroup>
							<ToolbarControlButton icon="paperclip" label="Attach" showLabel={false} />
							<ToolbarControlButton icon="slash" label="Command" shortcut={['/']} showLabel={false} />
						</ToolbarControlGroup>
						<ToolbarControlSeparator />
						<ToolbarControlGroup>
							<ToolbarControlButton appearance="subtle" label="Bold" selected>
								<ToolbarFormatGlyph format="bold">B</ToolbarFormatGlyph>
							</ToolbarControlButton>
						</ToolbarControlGroup>
					</ComposerToolbar>
					<ComposerSubmitDock>
						<ComposerSendButton hierarchy="primary" leadingIcon="send-horizontal">
							Run
						</ComposerSendButton>
					</ComposerSubmitDock>
				</ComposerFooter>
			</ComposerSurface>
		)
	}
})

function renderComposerSurfaceExample(disabled: boolean) {
	return (
		<ComposerSurface disabled={disabled}>
			<ComposerEditor
				aria-label="Message composer"
				aria-multiline="true"
				disabled={disabled}
				placeholder="Write a message..."
				role="textbox"
			/>
			<ComposerFooter>
				<ComposerToolbar>
					<ToolbarControlGroup>
						<ToolbarControlButton icon="paperclip" label="Attach" showLabel={false} />
						<ToolbarControlButton icon="at-sign" label="Mention" shortcut={['@']} showLabel={false} />
						<ToolbarControlButton icon="slash" label="Command" shortcut={['/']} showLabel={false} />
					</ToolbarControlGroup>
					<ToolbarControlSeparator />
					<ToolbarControlGroup>
						<ToolbarControlButton appearance="subtle" label="Bold">
							<ToolbarFormatGlyph format="bold">B</ToolbarFormatGlyph>
						</ToolbarControlButton>
					</ToolbarControlGroup>
				</ComposerToolbar>
				<ComposerSubmitDock>
					<ComposerSendButton disabled={disabled} hierarchy="primary" leadingIcon="send-horizontal">
						Send
					</ComposerSendButton>
				</ComposerSubmitDock>
			</ComposerFooter>
		</ComposerSurface>
	)
}
