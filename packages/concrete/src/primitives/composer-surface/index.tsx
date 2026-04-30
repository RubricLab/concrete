import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import {
	ComposerEditor,
	ComposerFooter,
	ComposerSendButton,
	ComposerSubmitDock,
	ComposerSurface,
	ComposerToolbar
} from './component'
import { composerSurfaceExamples } from './examples'
import { composerSurfaceMeta } from './meta'
import { type ComposerSurfaceValue, composerSurfaceSchema } from './schema'

export type {
	ComposerEditorProps,
	ComposerFooterProps,
	ComposerMenuLayerProps,
	ComposerSendButtonProps,
	ComposerSubmitDockProps,
	ComposerSurfaceProps,
	ComposerToolbarProps
} from './component'
export {
	ComposerEditor,
	ComposerFooter,
	ComposerMenuLayer,
	ComposerSendButton,
	ComposerSubmitDock,
	ComposerSurface,
	ComposerToolbar
} from './component'
export type { ComposerSurfaceInput, ComposerSurfaceValue } from './schema'
export { composerSurfacePropsSchema, composerSurfaceSchema } from './schema'

export const composerSurfacePrimitiveDefinition = createPrimitive({
	...composerSurfaceMeta,
	component: ComposerSurface,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(composerSurfaceExamples, state),
	renderInput: input => renderComposerSurfaceInput(composerSurfaceSchema.parse(input)),
	schema: composerSurfaceSchema,
	slug: 'composer-surface',
	states: exampleStates(composerSurfaceExamples, ['default', 'filled', 'disabled'])
})

function renderComposerSurfaceInput({ disabled, placeholder, submitLabel }: ComposerSurfaceValue) {
	return (
		<ComposerSurface disabled={disabled}>
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
		</ComposerSurface>
	)
}
