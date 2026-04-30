import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { Input, Select, Switch } from '../../primitives'
import { NumberStepper } from '../number-stepper'
import { FormGrid, FormRow, FormSection, FormShell } from './component'
import { formShellExamples } from './examples'
import { formShellMeta } from './meta'
import { type FormShellValue, formShellComponentSchema } from './schema'

export type {
	FormGridColumns,
	FormGridProps,
	FormRowAlign,
	FormRowProps,
	FormSectionProps,
	FormShellProps,
	FormShellVariant
} from './component'
export { FormGrid, FormRow, FormSection, FormShell } from './component'
export type { FormShellInput, FormShellValue } from './schema'
export { formShellComponentSchema } from './schema'

export const formShellComponentDefinition = createComponent({
	...formShellMeta,
	component: FormShell,
	kind: 'component',
	renderExample: (state?: string) => renderExample(formShellExamples, state),
	renderInput: input => renderFormShellInput(formShellComponentSchema.parse(input)),
	schema: formShellComponentSchema,
	seed: formShellComponentSchema.parse({
		description: 'Configure a reusable agent workspace.',
		title: 'Runtime settings'
	}),
	slug: 'form-shell',
	states: exampleStates(formShellExamples, ['default', 'validation', 'compact'])
})

function renderFormShellInput(input: FormShellValue) {
	const { description, ...props } = input

	return (
		<FormShell {...props} {...(description ? { description } : {})} eyebrow="Workspace">
			<FormSection
				description="Short identity fields stay compact and directly editable."
				title="Identity"
			>
				<FormGrid columns={2} compact={input.compact}>
					<Input defaultValue="Contract research" label="Name" />
					<Select
						defaultValue="router"
						label="Default model"
						options={[
							{ label: 'Router v2', value: 'router' },
							{ label: 'Reasoning agent', value: 'reasoning' }
						]}
					/>
				</FormGrid>
			</FormSection>
			<FormSection title="Runtime">
				<FormRow
					control={<Switch checked label="Enabled" readOnly />}
					description="Allow scheduled runs and manual tool execution."
					label="Agent execution"
				/>
				<FormRow
					control={<NumberStepper defaultValue={4} max={8} min={1} />}
					description="Parallel workers available to this workspace."
					label="Worker limit"
					meta="1-8"
				/>
			</FormSection>
		</FormShell>
	)
}
