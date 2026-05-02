import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { Meter } from './component'
import { meterExamples } from './examples'
import { meterMeta } from './meta'
import { type MeterValue, meterSchema } from './schema'

export type { MeterProps } from './component'
export { Meter } from './component'
export type { MeterInput, MeterValue } from './schema'
export { meterSchema } from './schema'

export const meterComponentDefinition = createComponent({
	...meterMeta,
	component: Meter,
	kind: 'component',
	renderExample: (state?: string) => renderExample(meterExamples, state),
	renderInput: input => renderMeterInput(meterSchema.parse(input)),
	schema: meterSchema,
	seed: meterSchema.parse({
		description: 'Workspace command budget',
		label: 'Usage',
		target: 80,
		value: { max: 100, min: 0, value: 72 }
	}),
	slug: 'meter',
	states: exampleStates(meterExamples, ['default', 'bar', 'ring', 'compact', 'signal', 'danger'])
})

function renderMeterInput(input: MeterValue) {
	return <Meter {...input} />
}
