import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Surface } from './component'
import { surfaceExamples } from './examples'
import { surfaceMeta } from './meta'
import { type SurfaceValue, surfaceSchema } from './schema'

export type { SurfaceProps } from './component'
export { Surface } from './component'
export type {
	SurfaceDepth,
	SurfaceElement,
	SurfaceInput,
	SurfaceTone,
	SurfaceValue
} from './schema'
export {
	surfaceDepthSchema,
	surfaceElementSchema,
	surfacePropsSchema,
	surfaceSchema,
	surfaceToneSchema
} from './schema'

export const surfacePrimitiveDefinition = createPrimitive({
	...surfaceMeta,
	component: Surface,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(surfaceExamples, state),
	renderInput: input => renderSurfaceInput(surfaceSchema.parse(input)),
	schema: surfaceSchema,
	slug: 'surface',
	states: exampleStates(surfaceExamples, ['default', 'raised', 'inverse'])
})

function renderSurfaceInput({
	content,
	density,
	depth,
	disabled,
	interactive,
	selected,
	tone
}: SurfaceValue) {
	return (
		<Surface
			density={density}
			depth={depth}
			disabled={disabled}
			interactive={interactive}
			selected={selected}
			tone={tone}
		>
			{content}
		</Surface>
	)
}
