import { defineExamples } from '../../factories/createExamples'
import { Badge, Button, Select, Switch } from '../../primitives'
import { NumberStepper } from '../number-stepper'
import { SettingsPanel } from './component'

export const settingsPanelExamples = defineExamples({
	compact: {
		description: 'Short modal-friendly settings stack.',
		render: () => renderSettingsPanelExample('compact')
	},
	default: {
		description: 'Dense product settings with toggles, selects, steppers, and packet actions.',
		render: () => renderSettingsPanelExample('default')
	},
	error: {
		description: 'Settings panel with row and summary validation.',
		render: () => renderSettingsPanelExample('error')
	},
	success: {
		description: 'Settings panel with successful sync state.',
		render: () => renderSettingsPanelExample('success')
	}
})

function renderSettingsPanelExample(state: 'compact' | 'default' | 'error' | 'success') {
	const isCompact = state === 'compact'
	const isError = state === 'error'
	const isSuccess = state === 'success'

	return (
		<SettingsPanel
			actions={
				<>
					<Button density="small" hierarchy="ghost" leadingIcon="settings">
						Advanced
					</Button>
					<Button density="small" hierarchy="primary" intent={isSuccess ? 'sky' : 'neutral'}>
						{isSuccess ? 'Synced' : 'Save'}
					</Button>
				</>
			}
			compact={isCompact}
			description="Dense settings rows keep labels, explanatory copy, metadata, and controls aligned."
			footer={
				<>
					<Button density="small" hierarchy="secondary">
						Reset
					</Button>
					<Button density="small" hierarchy="primary">
						{isSuccess ? 'Apply next' : 'Save changes'}
					</Button>
				</>
			}
			meta={
				<Badge intent={isError ? 'danger' : isSuccess ? 'ultra' : 'terminal'}>
					{isError ? 'Needs review' : isSuccess ? 'Synced' : 'Live'}
				</Badge>
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
							control: <NumberStepper defaultValue={isCompact ? 2 : isSuccess ? 8 : 6} max={12} min={1} />,
							description: 'Maximum active workers for one request.',
							id: 'workers',
							label: 'Parallel workers',
							meta: 'max 12'
						},
						{
							control: (
								<Select
									aria-label="Default model"
									defaultValue={isError ? '' : 'router'}
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
							status: isError ? 'error' : 'default'
						}
					],
					title: 'Runtime'
				},
				...(isCompact
					? []
					: [
							{
								description: 'Optional local context attached to every run.',
								id: 'context',
								rows: [
									{
										control: (
											<Button density="small" hierarchy="secondary" leadingIcon="paperclip">
												{isSuccess ? 'Attached' : 'Attach'}
											</Button>
										),
										description: 'Research packet, spec, or evaluation fixture.',
										id: 'packet',
										label: 'Reference packet',
										meta: isSuccess ? '2 files' : undefined,
										status: isSuccess ? ('success' as const) : ('default' as const)
									},
									{
										control: (
											<Select
												aria-label="Release channel"
												defaultValue={isSuccess ? 'stable' : 'preview'}
												options={[
													{ label: 'Preview', value: 'preview' },
													{ label: 'Stable', value: 'stable' },
													{ label: 'Internal only', value: 'internal' }
												]}
											/>
										),
										description: 'Where generated interface updates are promoted.',
										id: 'channel',
										label: 'Release channel',
										meta: isSuccess ? 'stable' : 'preview'
									}
								],
								title: 'Context'
							}
						])
			]}
			status={isError ? 'error' : isSuccess ? 'success' : 'default'}
			title={isCompact ? 'Run defaults' : 'Agent workspace'}
		/>
	)
}
