import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { CalendarGrid } from './component'
import { calendarGridExamples } from './examples'
import { calendarGridMeta } from './meta'
import { type CalendarGridValue, calendarGridSchema } from './schema'

export type { CalendarGridProps } from './component'
export { CalendarGrid } from './component'
export type { CalendarGridInput, CalendarGridValue } from './schema'
export { calendarGridPropsSchema, calendarGridSchema } from './schema'

export const calendarGridPrimitiveDefinition = createPrimitive({
	...calendarGridMeta,
	component: CalendarGrid,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(calendarGridExamples, state),
	renderInput: input => renderCalendarGridInput(calendarGridSchema.parse(input)),
	schema: calendarGridSchema,
	slug: 'calendar-grid',
	states: exampleStates(calendarGridExamples, ['default', 'range', 'disabled'])
})

function renderCalendarGridInput(input: CalendarGridValue) {
	return <CalendarGrid {...input} />
}
