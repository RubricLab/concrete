import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Indicator, type IndicatorTone } from '../indicator'
import { DataCardHeader } from './component'
import { dataCardHeaderExamples } from './examples'
import { dataCardHeaderMeta } from './meta'
import { type DataCardHeaderValue, dataCardHeaderSchema } from './schema'

export type { DataCardHeaderProps } from './component'
export { DataCardHeader } from './component'
export type { DataCardHeaderInput, DataCardHeaderValue } from './schema'
export {
	dataCardHeaderPropsSchema,
	dataCardHeaderSchema,
	dataCardHeaderStateValues
} from './schema'

export const dataCardHeaderPrimitiveDefinition = createPrimitive({
	...dataCardHeaderMeta,
	component: DataCardHeader,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(dataCardHeaderExamples, state),
	renderInput: input => renderDataCardHeaderInput(dataCardHeaderSchema.parse(input)),
	schema: dataCardHeaderSchema,
	slug: 'data-card-header',
	states: exampleStates(dataCardHeaderExamples, ['default', 'compact', 'states'])
})

function renderDataCardHeaderInput({ description, state, title }: DataCardHeaderValue) {
	return (
		<DataCardHeader
			description={description}
			end={<Indicator tone={getDataCardHeaderStateTone(state)}>{state}</Indicator>}
			title={title}
		/>
	)
}

function getDataCardHeaderStateTone(
	state: DataCardHeaderValue['state']
): Exclude<IndicatorTone, 'default' | 'ultra'> {
	switch (state) {
		case 'empty':
			return 'muted'
		case 'error':
			return 'error'
		case 'loading':
			return 'sky'
		case 'ready':
			return 'terminal'
	}
}
