import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Panel } from '../panel'
import { DialogSurface } from './component'
import { dialogSurfaceExamples } from './examples'
import { dialogSurfaceMeta } from './meta'
import { type DialogSurfaceValue, dialogSurfaceSchema } from './schema'

export type { DialogSurfaceProps } from './component'
export { DialogSurface } from './component'
export type { DialogSurfaceInput, DialogSurfaceMeasure, DialogSurfaceValue } from './schema'
export {
	dialogSurfaceMeasureSchema,
	dialogSurfacePropsSchema,
	dialogSurfaceSchema
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

function renderDialogSurfaceInput({ content, modal, measure }: DialogSurfaceValue) {
	return (
		<DialogSurface modal={modal} measure={measure}>
			<Panel title="Dialog">{content}</Panel>
		</DialogSurface>
	)
}
