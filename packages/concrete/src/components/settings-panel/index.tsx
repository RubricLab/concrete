import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { Select, Switch } from '../../primitives'
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
					}
				],
				title: 'Runtime'
			}
		],
		title: 'Agent workspace'
	}),
	slug: 'settings-panel',
	states: exampleStates(settingsPanelExamples, ['default', 'error', 'compact'])
})

function renderSettingsPanelInput(input: SettingsPanelValue) {
	const { description, sections, ...props } = input

	return (
		<SettingsPanel
			{...props}
			{...(description ? { description } : {})}
			sections={renderSettingsSections(sections)}
		/>
	)
}

function renderSettingsSections(sections: SettingsPanelValue['sections']): SettingsPanelSection[] {
	return sections.map(section => ({
		...section,
		rows: section.rows.map((row, rowIndex) => ({
			...row,
			control: renderSettingsControl(rowIndex)
		}))
	}))
}

function renderSettingsControl(rowIndex: number) {
	switch (rowIndex % 3) {
		case 0:
			return <Switch checked label="Enabled" readOnly />
		case 1:
			return <NumberStepper defaultValue={6} max={12} min={1} />
		default:
			return (
				<Select
					defaultValue="router"
					options={[
						{ label: 'Router v2', value: 'router' },
						{ label: 'Research agent', value: 'research' }
					]}
				/>
			)
	}
}
