import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { FormLayoutRow, FormLayoutSection, FormLayoutShell } from '../form-layout'
import { FormOverlayDialog, FormOverlayDrawer, FormOverlayRoot } from './component'

export const formOverlayExamples = defineExamples({
	default: {
		description: 'Inline dialog preview with form shell content.',
		render: () => (
			<FormOverlayRoot type="dialog">
				<FormOverlayDialog>
					<FormLayoutShell
						actions={<Button size="small">Save</Button>}
						description="Inline preview for generated settings dialogs."
						title="Dialog settings"
						variant="modal"
					>
						<FormLayoutSection title="General">
							<FormLayoutRow label="Default model" meta="Preview">
								concrete-preview
							</FormLayoutRow>
						</FormLayoutSection>
					</FormLayoutShell>
				</FormOverlayDialog>
			</FormOverlayRoot>
		)
	},
	drawer: {
		description: 'Inline drawer preview aligned to one side.',
		render: () => (
			<FormOverlayRoot type="drawer">
				<FormOverlayDrawer>
					<FormLayoutShell compact title="Drawer settings" variant="drawer">
						<FormLayoutSection title="Runtime">
							<FormLayoutRow label="Autonomous mode" meta="On">
								Enabled
							</FormLayoutRow>
						</FormLayoutSection>
					</FormLayoutShell>
				</FormOverlayDrawer>
			</FormOverlayRoot>
		)
	}
})
