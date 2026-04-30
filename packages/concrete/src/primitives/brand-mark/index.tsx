import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { BrandMark } from './component'
import { brandMarkExamples } from './examples'
import { brandMarkMeta } from './meta'
import { type BrandMarkValue, brandMarkSchema } from './schema'

export type { BrandMarkProps } from './component'
export { BrandMark } from './component'
export type { BrandMarkInput, BrandMarkValue } from './schema'
export { brandMarkPropsSchema, brandMarkSchema } from './schema'

export const brandMarkPrimitiveDefinition = createPrimitive({
	...brandMarkMeta,
	component: BrandMark,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(brandMarkExamples, state),
	renderInput: input => renderBrandMarkInput(brandMarkSchema.parse(input)),
	schema: brandMarkSchema,
	slug: 'brand-mark',
	states: exampleStates(brandMarkExamples, ['default', 'inverse'])
})

function renderBrandMarkInput(input: BrandMarkValue) {
	return <BrandMark {...input} />
}
