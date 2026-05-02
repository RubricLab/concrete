import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { Badge, Button, Select, Switch } from '../../primitives'
import { NumberStepper } from '../number-stepper'
import { SettingsPanel, type SettingsPanelSection } from './component'
import { settingsPanelExamples } from './examples'
import { settingsPanelMeta } from './meta'
import { type SettingsPanelValue, settingsPanelComponentSchema } from './schema'

export type {
	SettingsPanelProps,
	SettingsPanelRow,
	SettingsPanelSection
} from './component'
export { SettingsPanel } from './component'
export type { SettingsPanelInput, SettingsPanelValue } from './schema'
export { settingsPanelComponentSchema } from './schema'

export const settingsPanelComponentDefinition = createComponent({
	...settingsPanelMeta,
	component: SettingsPanel,
	kind: 'component',
	renderExample: (state?: string) => renderExample(settingsPanelExamples, state),
	renderInput: input => renderSettingsPanelInput(settingsPanelComponentSchema.parse(input)),
	schema: settingsPanelComponentSchema,
	seed: settingsPanelComponentSchema.parse({
		description: 'Dense settings rows.',
		sections: [
			{
				description: 'Core behavior for generated work and local tools.',
				id: 'runtime',
				rows: [
					{
						description: 'Permit tool calls from approved command surfaces.',
						id: 'tools',
						label: 'Tools',
						meta: 'on'
					},
					{
						description: 'Maximum active workers for one request.',
						id: 'workers',
						label: 'Parallel workers',
						meta: 'max 12'
					},
					{
						description: 'Fallback model used when a prompt does not pin a route.',
						id: 'model',
						label: 'Default model',
						meta: 'router'
					}
				],
				title: 'Runtime'
			},
			{
				description: 'Optional local context attached to every run.',
				id: 'context',
				rows: [
					{
						description: 'Research packet, spec, or evaluation fixture.',
						id: 'packet',
						label: 'Reference packet',
						meta: '2 files'
					},
					{
						description: 'Where generated interface updates are promoted.',
						id: 'channel',
						label: 'Release channel',
						meta: 'preview'
					}
				],
				title: 'Context'
			}
		],
		title: 'Agent workspace'
	}),
	slug: 'settings-panel',
	states: exampleStates(settingsPanelExamples, ['default', 'error', 'compact', 'success'])
})

function renderSettingsPanelInput(input: SettingsPanelValue) {
	const { description, sections, ...props } = input
	const isSuccess = input.status === 'success'

	return (
		<SettingsPanel
			{...props}
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
			{...(description ? { description } : {})}
			footer={
				<>
					<Button density="small" hierarchy="secondary">
						Reset
					</Button>
					<Button density="small" hierarchy="primary">
						Save changes
					</Button>
				</>
			}
			meta={
				<Badge intent={input.status === 'error' ? 'danger' : isSuccess ? 'ultra' : 'terminal'}>
					{input.status === 'error' ? 'Needs review' : isSuccess ? 'Synced' : 'Live'}
				</Badge>
			}
			sections={renderSettingsSections(sections)}
		/>
	)
}

function renderSettingsSections(sections: SettingsPanelValue['sections']): SettingsPanelSection[] {
	return sections.map(section => ({
		...section,
		rows: section.rows.map((row, rowIndex) => ({
			...row,
			control: renderSettingsControl(row, rowIndex)
		}))
	}))
}

function renderSettingsControl(
	row: SettingsPanelValue['sections'][number]['rows'][number],
	rowIndex: number
) {
	switch (row.id) {
		case 'tools':
			return <Switch checked label="Enabled" readOnly />
		case 'workers':
			return <NumberStepper defaultValue={6} max={12} min={1} />
		case 'model':
			return (
				<Select
					aria-label="Default model"
					defaultValue="router"
					options={[
						{ label: 'Router v2', value: 'router' },
						{ label: 'Research agent', value: 'research' }
					]}
				/>
			)
		case 'packet':
			return (
				<Button density="small" hierarchy="secondary" leadingIcon="paperclip">
					Attach
				</Button>
			)
		case 'channel':
			return (
				<Select
					aria-label="Release channel"
					defaultValue="preview"
					options={[
						{ label: 'Preview', value: 'preview' },
						{ label: 'Stable', value: 'stable' },
						{ label: 'Internal only', value: 'internal' }
					]}
				/>
			)
		default:
			return renderFallbackSettingsControl(rowIndex)
	}
}

function renderFallbackSettingsControl(rowIndex: number) {
	switch (rowIndex % 3) {
		case 0:
			return <Switch checked label="Enabled" readOnly />
		case 1:
			return <NumberStepper defaultValue={6} max={12} min={1} />
		default:
			return (
				<Select
					aria-label="Default setting"
					defaultValue="enabled"
					options={[
						{ label: 'Enabled', value: 'enabled' },
						{ label: 'Paused', value: 'paused' }
					]}
				/>
			)
	}
}
