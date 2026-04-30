import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Stat } from './component'
import { statExamples } from './examples'
import { statMeta } from './meta'
import { type StatValue, statSchema } from './schema'

export type { StatProps, StatSize, StatTone, StatVariant } from './component'
export { Stat } from './component'
export type { StatInput, StatValue } from './schema'
export { statPropsSchema, statSchema } from './schema'

export const statPrimitiveDefinition = createPrimitive({
	...statMeta,
	component: Stat,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(statExamples, state),
	renderInput: input => renderStatInput(statSchema.parse(input)),
	schema: statSchema,
	slug: 'stat',
	states: exampleStates(statExamples, ['default', 'numeric', 'display'])
})

function renderStatInput({ label, meta, unit, ...props }: StatValue) {
	return (
		<Stat
			{...props}
			{...(label ? { label } : {})}
			{...(meta ? { meta } : {})}
			{...(unit ? { unit } : {})}
		/>
	)
}
