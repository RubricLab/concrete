import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Alert } from './component'
import { alertExamples } from './examples'
import { alertMeta } from './meta'
import { type AlertValue, alertSchema } from './schema'

export type { AlertProps } from './component'
export { Alert } from './component'
export type { AlertInput, AlertValue } from './schema'
export { alertPropsSchema, alertSchema } from './schema'

export const alertPrimitiveDefinition = createPrimitive({
	...alertMeta,
	component: Alert,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(alertExamples, state),
	renderInput: input => renderAlertInput(alertSchema.parse(input)),
	schema: alertSchema,
	slug: 'alert',
	states: exampleStates(alertExamples, ['default', 'error', 'success'])
})

function renderAlertInput({ description, status, title }: AlertValue) {
	return (
		<Alert status={status} title={title}>
			{description}
		</Alert>
	)
}
