import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import {
	ComposerEditor,
	ComposerFooter,
	ComposerSendButton,
	ComposerShell,
	ComposerSubmitDock,
	ComposerToolbar
} from './component'
import { composerShellExamples } from './examples'
import { composerShellMeta } from './meta'
import { type ComposerShellValue, composerShellSchema } from './schema'

export type {
	ComposerEditorProps,
	ComposerFooterProps,
	ComposerSendButtonProps,
	ComposerShellProps,
	ComposerSubmitDockProps,
	ComposerToolbarProps
} from './component'
export {
	ComposerEditor,
	ComposerFooter,
	ComposerSendButton,
	ComposerShell,
	ComposerSubmitDock,
	ComposerToolbar
} from './component'
export type { ComposerShellInput, ComposerShellValue } from './schema'
export { composerShellPropsSchema, composerShellSchema } from './schema'

export const composerShellPrimitiveDefinition = createPrimitive({
	...composerShellMeta,
	component: ComposerShell,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(composerShellExamples, state),
	renderInput: input => renderComposerShellInput(composerShellSchema.parse(input)),
	schema: composerShellSchema,
	slug: 'composer-shell',
	states: exampleStates(composerShellExamples, ['default', 'filled', 'disabled'])
})

function renderComposerShellInput({ disabled, placeholder, submitLabel }: ComposerShellValue) {
	return (
		<ComposerShell disabled={disabled}>
			<ComposerEditor
				aria-label="Message composer"
				aria-multiline="true"
				disabled={disabled}
				placeholder={placeholder}
				role="textbox"
			/>
			<ComposerFooter>
				<ComposerToolbar />
				<ComposerSubmitDock>
					<ComposerSendButton disabled={disabled} leadingIcon="send-horizontal" variant="primary">
						{submitLabel}
					</ComposerSendButton>
				</ComposerSubmitDock>
			</ComposerFooter>
		</ComposerShell>
	)
}
