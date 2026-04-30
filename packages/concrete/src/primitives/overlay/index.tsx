import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Panel } from '../panel'
import { Overlay } from './component'
import { overlayExamples } from './examples'
import { overlayMeta } from './meta'
import { type OverlayValue, overlaySchema } from './schema'

export type { OverlayProps } from './component'
export { Overlay } from './component'
export type { OverlayInput, OverlayPlacement, OverlayPresentation, OverlayValue } from './schema'
export {
	overlayPlacementSchema,
	overlayPresentationSchema,
	overlayPropsSchema,
	overlaySchema
} from './schema'

export const overlayPrimitiveDefinition = createPrimitive({
	...overlayMeta,
	component: Overlay,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(overlayExamples, state),
	renderInput: input => renderOverlayInput(overlaySchema.parse(input)),
	schema: overlaySchema,
	slug: 'overlay',
	states: exampleStates(overlayExamples, ['default', 'fixed', 'stretch'])
})

function renderOverlayInput({ content, open, placement, presentation, scrim }: OverlayValue) {
	return (
		<Overlay open={open} placement={placement} presentation={presentation} scrim={scrim}>
			<Panel title="Overlay">{content}</Panel>
		</Overlay>
	)
}
