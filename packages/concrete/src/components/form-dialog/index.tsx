import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { Button, Input } from '../../primitives'
import { DateRangePicker } from '../date-range-picker'
import { FormGrid } from '../form-shell'
import { FormDialog } from './component'
import { formDialogExamples } from './examples'
import { formDialogMeta } from './meta'
import { type FormDialogValue, formDialogComponentSchema } from './schema'

export type { FormDialogPresentation, FormDialogProps, FormDialogSize } from './component'
export { FormDialog } from './component'
export type { FormDialogInput, FormDialogValue } from './schema'
export { formDialogComponentSchema } from './schema'

export const formDialogComponentDefinition = createComponent({
	...formDialogMeta,
	component: FormDialog,
	kind: 'component',
	renderExample: (state?: string) => renderExample(formDialogExamples, state),
	renderInput: input => renderFormDialogInput(formDialogComponentSchema.parse(input)),
	schema: formDialogComponentSchema,
	seed: formDialogComponentSchema.parse({
		description: 'Create a bounded experiment.',
		title: 'New experiment'
	}),
	slug: 'form-dialog',
	states: exampleStates(formDialogExamples, ['default', 'wide', 'error'])
})

function renderFormDialogInput(input: FormDialogValue) {
	const { description, ...props } = input

	return (
		<FormDialog
			{...props}
			{...(description ? { description } : {})}
			footer={
				<>
					<Button size="small" variant="secondary">
						Cancel
					</Button>
					<Button size="small">Create run</Button>
				</>
			}
		>
			<FormGrid columns={input.size === 'wide' ? 2 : 1}>
				<Input label="Run name" placeholder="Router contract check" />
				<DateRangePicker defaultValue={{ end: '2026-05-07', start: '2026-04-28' }} label="Window" />
			</FormGrid>
		</FormDialog>
	)
}
