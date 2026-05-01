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
	SurfaceIntent,
	SurfacePlacement,
	SurfaceValue
} from './schema'
export {
	surfaceDepthSchema,
	surfaceElementSchema,
	surfaceIntentSchema,
	surfacePlacementSchema,
	surfacePropsSchema,
	surfaceSchema
} from './schema'

export const surfacePrimitiveDefinition = createPrimitive({
	...surfaceMeta,
	component: Surface,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(surfaceExamples, state),
	renderInput: input => renderSurfaceInput(surfaceSchema.parse(input)),
	schema: surfaceSchema,
	slug: 'surface',
	states: exampleStates(surfaceExamples, ['default', 'raised', 'inverse', 'sticky'])
})

function renderSurfaceInput({
	as,
	content,
	density,
	depth,
	disabled,
	interactive,
	placement,
	selected,
	intent
}: SurfaceValue) {
	return (
		<Surface
			as={as}
			density={density}
			depth={depth}
			disabled={disabled}
			interactive={interactive}
			placement={placement}
			selected={selected}
			intent={intent}
		>
			{content}
		</Surface>
	)
}
