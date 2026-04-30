import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { CalendarPanel } from './component'
import { calendarPanelExamples } from './examples'
import { calendarPanelMeta } from './meta'
import { type CalendarPanelValue, calendarPanelSchema } from './schema'

export type { CalendarPanelProps } from './component'
export { CalendarPanel } from './component'
export type { CalendarPanelInput, CalendarPanelValue } from './schema'
export { calendarPanelPropsSchema, calendarPanelSchema } from './schema'

export const calendarPanelPrimitiveDefinition = createPrimitive({
	...calendarPanelMeta,
	component: CalendarPanel,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(calendarPanelExamples, state),
	renderInput: input => renderCalendarPanelInput(calendarPanelSchema.parse(input)),
	schema: calendarPanelSchema,
	slug: 'calendar-panel',
	states: exampleStates(calendarPanelExamples, ['default', 'range', 'disabled'])
})

function renderCalendarPanelInput(input: CalendarPanelValue) {
	return <CalendarPanel {...input} />
}
