import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Panel } from '../panel'
import { DialogSurface } from './component'
import { dialogSurfaceExamples } from './examples'
import { dialogSurfaceMeta } from './meta'
import { type DialogSurfaceValue, dialogSurfaceSchema } from './schema'

export type { DialogSurfaceProps } from './component'
export { DialogSurface } from './component'
export type { DialogSurfaceInput, DialogSurfaceSize, DialogSurfaceValue } from './schema'
export {
	dialogSurfacePropsSchema,
	dialogSurfaceSchema,
	dialogSurfaceSizeSchema
} from './schema'

export const dialogSurfacePrimitiveDefinition = createPrimitive({
	...dialogSurfaceMeta,
	component: DialogSurface,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(dialogSurfaceExamples, state),
	renderInput: input => renderDialogSurfaceInput(dialogSurfaceSchema.parse(input)),
	schema: dialogSurfaceSchema,
	slug: 'dialog-surface',
	states: exampleStates(dialogSurfaceExamples, ['default', 'compact', 'wide'])
})

function renderDialogSurfaceInput({ content, modal, size }: DialogSurfaceValue) {
	return (
		<DialogSurface modal={modal} size={size}>
			<Panel title="Dialog">{content}</Panel>
		</DialogSurface>
	)
}
