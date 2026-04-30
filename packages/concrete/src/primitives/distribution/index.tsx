import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Distribution } from './component'
import { distributionExamples } from './examples'
import { distributionMeta } from './meta'
import { type DistributionValue, distributionSchema } from './schema'

export type { DistributionDatum, DistributionProps } from './component'
export { Distribution } from './component'
export type {
	DistributionDatumInput,
	DistributionDatumValue,
	DistributionInput,
	DistributionValue
} from './schema'
export { distributionDatumSchema, distributionPropsSchema, distributionSchema } from './schema'

export const distributionPrimitiveDefinition = createPrimitive({
	...distributionMeta,
	component: Distribution,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(distributionExamples, state),
	renderInput: input => renderDistributionInput(distributionSchema.parse(input)),
	schema: distributionSchema,
	slug: 'distribution',
	states: exampleStates(distributionExamples, ['default'])
})

function renderDistributionInput({ data }: DistributionValue) {
	return <Distribution data={data} />
}
