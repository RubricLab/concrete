import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { Button, Select, Switch } from '../../primitives'
import { NumberStepper } from '../number-stepper'
import { SettingsPanel } from './component'

export const settingsPanelExamples = defineExamples({
	compact: {
		description: 'Short modal-friendly settings stack.',
		render: () => renderSettingsPanelExample('compact')
	},
	default: {
		description: 'Dense product settings with toggles, select, stepper, and upload state.',
		render: () => renderSettingsPanelExample('default')
	},
	error: {
		description: 'Settings panel with row and summary validation.',
		render: () => renderSettingsPanelExample('error')
	}
})

function renderSettingsPanelExample(state: 'compact' | 'default' | 'error') {
	return (
		<FormWideStage>
			<SettingsPanel
				description="Dense settings rows keep labels, explanatory copy, metadata, and controls aligned."
				footer={
					<>
						<Button size="small" variant="secondary">
							Reset
						</Button>
						<Button size="small">Save</Button>
					</>
				}
				sections={[
					{
						description: 'Core behavior for generated work and local tools.',
						id: 'runtime',
						rows: [
							{
								control: <Switch checked label="Enabled" readOnly />,
								description: 'Permit tool calls from approved command surfaces.',
								id: 'tools',
								label: 'Tools',
								meta: 'on'
							},
							{
								control: <NumberStepper defaultValue={state === 'compact' ? 2 : 6} max={12} min={1} />,
								description: 'Maximum active workers for one request.',
								id: 'workers',
								label: 'Parallel workers',
								meta: 'max 12'
							},
							{
								control: (
									<Select
										defaultValue={state === 'error' ? '' : 'router'}
										options={[
											{ label: 'Select model...', value: '' },
											{ label: 'Router v2', value: 'router' },
											{ label: 'Research agent', value: 'research' }
										]}
									/>
								),
								description: 'Fallback model used when a prompt does not pin a route.',
								id: 'model',
								label: 'Default model',
								status: state === 'error' ? 'error' : 'default'
							}
						],
						title: 'Runtime'
					},
					...(state === 'compact'
						? []
						: [
								{
									description: 'Optional local context attached to every run.',
									id: 'context',
									rows: [
										{
											control: (
												<Button leadingIcon="paperclip" size="small" variant="secondary">
													Attach
												</Button>
											),
											description: 'Research packet, spec, or evaluation fixture.',
											id: 'packet',
											label: 'Reference packet'
										}
									],
									title: 'Context'
								}
							])
				]}
				status={state === 'error' ? 'error' : 'default'}
				title={state === 'compact' ? 'Run defaults' : 'Agent workspace'}
			/>
		</FormWideStage>
	)
}

function FormWideStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 760, width: '100%' }}>{children}</div>
}
