import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DataSurface } from './component'
import { dataSurfaceExamples } from './examples'
import { dataSurfaceMeta } from './meta'
import { type DataSurfaceValue, dataSurfaceSchema } from './schema'

export type { DataSurfaceProps } from './component'
export { DataSurface } from './component'
export type {
	DataSurfaceInput,
	DataSurfaceLayout,
	DataSurfacePurpose,
	DataSurfaceValue
} from './schema'
export {
	dataSurfaceLayoutSchema,
	dataSurfacePropsSchema,
	dataSurfacePurposeSchema,
	dataSurfaceSchema
} from './schema'

export const dataSurfacePrimitiveDefinition = createPrimitive({
	...dataSurfaceMeta,
	component: DataSurface,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(dataSurfaceExamples, state),
	renderInput: input => renderDataSurfaceInput(dataSurfaceSchema.parse(input)),
	schema: dataSurfaceSchema,
	slug: 'data-surface',
	states: exampleStates(dataSurfaceExamples, ['default', 'media', 'toolbar'])
})

function renderDataSurfaceInput({
	compact,
	content,
	density,
	depth,
	description,
	footer,
	layout,
	meta,
	purpose,
	title,
	tone
}: DataSurfaceValue) {
	return (
		<DataSurface
			compact={compact}
			density={density}
			depth={depth}
			description={description}
			footer={footer}
			layout={layout}
			meta={meta}
			purpose={purpose}
			title={title}
			tone={tone}
		>
			{content}
		</DataSurface>
	)
}
