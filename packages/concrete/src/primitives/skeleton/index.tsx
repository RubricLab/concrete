import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Skeleton } from './component'
import { skeletonExamples } from './examples'
import { skeletonMeta } from './meta'
import { type SkeletonValue, skeletonSchema } from './schema'

export type { SkeletonProps } from './component'
export { Skeleton } from './component'
export type { SkeletonInput, SkeletonValue } from './schema'
export { skeletonPropsSchema, skeletonSchema } from './schema'

export const skeletonPrimitiveDefinition = createPrimitive({
	...skeletonMeta,
	component: Skeleton,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(skeletonExamples, state),
	renderInput: input => renderSkeletonInput(skeletonSchema.parse(input)),
	schema: skeletonSchema,
	slug: 'skeleton',
	states: exampleStates(skeletonExamples, ['default', 'avatar'])
})

function renderSkeletonInput(input: SkeletonValue) {
	return <Skeleton {...input} />
}
