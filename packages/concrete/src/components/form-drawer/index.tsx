import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { Button, Select, Switch } from '../../primitives'
import { FormRow, FormSection } from '../form-shell'
import { NumberStepper } from '../number-stepper'
import { FormDrawer } from './component'
import { formDrawerExamples } from './examples'
import { formDrawerMeta } from './meta'
import { type FormDrawerValue, formDrawerComponentSchema } from './schema'

export type { FormDrawerProps, FormDrawerSide } from './component'
export { FormDrawer } from './component'
export type { FormDrawerInput, FormDrawerValue } from './schema'
export { formDrawerComponentSchema } from './schema'

export const formDrawerComponentDefinition = createComponent({
	...formDrawerMeta,
	component: FormDrawer,
	kind: 'component',
	renderExample: (state?: string) => renderExample(formDrawerExamples, state),
	renderInput: input => renderFormDrawerInput(formDrawerComponentSchema.parse(input)),
	schema: formDrawerComponentSchema,
	seed: formDrawerComponentSchema.parse({
		description: 'Contextual editing beside dense product surfaces.',
		title: 'Workspace policy'
	}),
	slug: 'form-drawer',
	states: exampleStates(formDrawerExamples, ['default', 'review', 'left'])
})

function renderFormDrawerInput(input: FormDrawerValue) {
	const { description, ...props } = input

	return (
		<FormDrawer
			{...props}
			{...(description ? { description } : {})}
			footer={
				<>
					<Button size="small" variant="secondary">
						Discard
					</Button>
					<Button size="small">Apply</Button>
				</>
			}
		>
			<FormSection title="Access">
				<FormRow
					control={<Switch checked label="Enabled" readOnly />}
					description="Allow collaborators to inspect generated artifacts."
					label="Shared visibility"
				/>
				<FormRow
					control={
						<Select
							defaultValue="team"
							options={[
								{ label: 'Team', value: 'team' },
								{ label: 'Private', value: 'private' }
							]}
						/>
					}
					description="Default visibility for new runs."
					label="Scope"
				/>
			</FormSection>
			<FormSection title="Limits">
				<FormRow
					control={<NumberStepper defaultValue={25} max={100} min={0} />}
					description="Daily command executions for this workspace."
					label="Run budget"
					meta="daily"
				/>
			</FormSection>
		</FormDrawer>
	)
}
