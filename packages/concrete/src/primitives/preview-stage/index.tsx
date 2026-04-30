import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Button } from '../button'
import { Input } from '../input'
import { PreviewStage } from './component'
import { previewStageExamples } from './examples'
import { previewStageMeta } from './meta'
import { type PreviewStageValue, previewStageSchema } from './schema'

export type { PreviewStageLayout, PreviewStageProps, PreviewStageWidth } from './component'
export { PreviewStage } from './component'
export type { PreviewStageInput, PreviewStageValue } from './schema'
export { previewStagePropsSchema, previewStageSchema } from './schema'

export const previewStagePrimitiveDefinition = createPrimitive({
	...previewStageMeta,
	component: PreviewStage,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(previewStageExamples, state),
	renderInput: input => renderPreviewStageInput(previewStageSchema.parse(input)),
	schema: previewStageSchema,
	slug: 'preview-stage',
	states: exampleStates(previewStageExamples, ['default', 'stack'])
})

function renderPreviewStageInput({ layout, width }: PreviewStageValue) {
	return (
		<PreviewStage layout={layout} width={width}>
			{layout === 'stack' ? (
				<>
					<Button variant="secondary">Approve</Button>
					<Button variant="ghost">Queue follow-up</Button>
				</>
			) : (
				<Input defaultValue="concrete-preview" label="Default model" />
			)}
		</PreviewStage>
	)
}
