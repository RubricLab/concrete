import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Input } from '../input'
import { Switch } from '../switch'
import { FormLayoutGrid, FormLayoutRow, FormLayoutSection, FormLayoutShell } from './component'

export const formLayoutExamples = defineExamples({
	default: {
		description: 'Compact product form shell with grouped fields.',
		render: () => (
			<FormLayoutShell
				actions={<Button size="small">Save</Button>}
				description="Defaults applied to new research workspaces."
				title="Workspace settings"
			>
				<FormLayoutSection description="Naming and runtime defaults." title="General">
					<FormLayoutGrid>
						<Input defaultValue="Rubric Research" label="Workspace name" />
						<Input defaultValue="concrete-preview" label="Default model" />
					</FormLayoutGrid>
				</FormLayoutSection>
			</FormLayoutShell>
		)
	},
	rows: {
		description: 'Settings rows with compact trailing controls.',
		render: () => (
			<FormLayoutShell compact title="Agent defaults">
				<FormLayoutSection title="Runtime">
					<FormLayoutRow
						control={<Switch checked readOnly />}
						description="Allow the agent to continue safe queued tasks."
						label="Autonomous mode"
						meta="On"
					/>
					<FormLayoutRow
						control={
							<Button size="small" variant="secondary">
								Review
							</Button>
						}
						description="Require review before publishing generated artifacts."
						label="Human review"
						meta="Required"
					/>
				</FormLayoutSection>
			</FormLayoutShell>
		)
	}
})
