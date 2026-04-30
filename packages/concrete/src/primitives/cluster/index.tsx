import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Cluster } from './component'
import { clusterExamples } from './examples'
import { clusterMeta } from './meta'
import { type ClusterValue, clusterSchema } from './schema'

export type { ClusterProps } from './component'
export { Cluster } from './component'
export type { ClusterAlign, ClusterInput, ClusterJustify, ClusterValue } from './schema'
export {
	clusterAlignSchema,
	clusterJustifySchema,
	clusterPropsSchema,
	clusterSchema
} from './schema'

export const clusterPrimitiveDefinition = createPrimitive({
	...clusterMeta,
	component: Cluster,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(clusterExamples, state),
	renderInput: input => renderClusterInput(clusterSchema.parse(input)),
	schema: clusterSchema,
	slug: 'cluster',
	states: exampleStates(clusterExamples, ['default', 'actions', 'between'])
})

function renderClusterInput({ align, content, density, justify }: ClusterValue) {
	return (
		<Cluster align={align} density={density} justify={justify}>
			{content}
		</Cluster>
	)
}
