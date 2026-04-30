import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { TimeList } from './component'
import { timeListExamples } from './examples'
import { timeListMeta } from './meta'
import { type TimeListValue, timeListSchema } from './schema'

export type { TimeListProps } from './component'
export { TimeList } from './component'
export type { TimeListInput, TimeListValue } from './schema'
export { timeListPropsSchema, timeListSchema } from './schema'

const defaultTimeListOptions = ['13:30', '14:00', '14:30', '15:00', '15:30']

export const timeListPrimitiveDefinition = createPrimitive({
	...timeListMeta,
	component: TimeList,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(timeListExamples, state),
	renderInput: input => renderTimeListInput(timeListSchema.parse(input)),
	schema: timeListSchema,
	slug: 'time-list',
	states: exampleStates(timeListExamples, ['default', 'later'])
})

function renderTimeListInput(input: TimeListValue) {
	return <TimeList {...input} options={defaultTimeListOptions} />
}
