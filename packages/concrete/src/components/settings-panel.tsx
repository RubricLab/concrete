import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { Button, Select, Switch } from '../primitives'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { type FieldStatus, settingsPanelSectionSchema } from '../schemas'
import { FormRow, FormSection, FormShell, type FormShellProps } from './form-shell'
import { NumberStepper } from './number-stepper-view'

const settingsPanelStatusValues = ['default', 'error', 'success'] as const

export type SettingsPanelRow = {
	control: ReactNode
	description?: ReactNode | undefined
	id: string
	label: ReactNode
	meta?: ReactNode | undefined
	status?: FieldStatus | undefined
}

export type SettingsPanelSection = {
	description?: ReactNode | undefined
	id: string
	rows: readonly SettingsPanelRow[]
	title: ReactNode
}

export type SettingsPanelProps = Omit<FormShellProps, 'children'> & {
	sections: readonly SettingsPanelSection[]
}

export function SettingsPanel({ sections, ...props }: SettingsPanelProps) {
	return (
		<FormShell compact {...props}>
			{sections.map(section => (
				<FormSection description={section.description} key={section.id} title={section.title}>
					{section.rows.map(row => (
						<FormRow
							control={row.control}
							description={row.description}
							key={row.id}
							label={row.label}
							meta={row.meta}
							status={row.status}
						/>
					))}
				</FormSection>
			))}
		</FormShell>
	)
}

export const settingsPanelComponentSchema = z
	.object({
		compact: z.boolean().default(false),
		description: z.string().optional(),
		sections: z.array(settingsPanelSectionSchema).default([]),
		status: z.enum(settingsPanelStatusValues).default('default'),
		title: z.string().default('Agent workspace')
	})
	.strict()

export const settingsPanelComponentDefinition = defineConcreteComponent({
	category: 'layout',
	component: SettingsPanel,
	controls: [
		textControl('title', 'Title', 'Agent workspace'),
		textControl('description', 'Description', 'Dense settings rows.'),
		selectControl('status', 'Status', 'default', settingsPanelStatusValues),
		booleanControl('compact', 'Compact', 'false')
	],
	description:
		'Dense settings form composed from shell, sections, rows, and slotted primitive controls.',
	guidance:
		'Settings panel is a row-based assembly helper. It standardizes layout and hierarchy while every control stays an explicit primitive or component slot.',
	kind: 'component',
	name: 'Settings panel',
	pressure: ['product'],
	props: [
		prop(
			'sections',
			'readonly SettingsPanelSection[]',
			'Section and row metadata with explicit ReactNode control slots. Serializable metadata is validated by settingsPanelSectionSchema.',
			'',
			true
		),
		prop('title', 'ReactNode', 'Primary form title rendered in the shell header.', undefined, true),
		prop('description', 'ReactNode', 'Supporting copy below the title.'),
		prop('eyebrow', 'ReactNode', 'Optional compact section label above the title.'),
		prop('meta', 'ReactNode', 'Small metadata beside the title.'),
		prop('actions', 'ReactNode', 'Header action slot.'),
		prop('footer', 'ReactNode', 'Footer action slot, usually cancel and submit buttons.'),
		prop('status', "'default' | 'error' | 'success'", 'Outer status border treatment.', 'default'),
		prop('compact', 'boolean', 'Tightens header/body spacing for dense settings.', 'false'),
		prop('FormRow.control', 'ReactNode', 'Right-aligned primitive or component control slot.')
	],
	renderExample: renderSettingsPanelExample,
	schema: settingsPanelComponentSchema,
	slug: 'settings-panel',
	states: states([
		['default', 'Dense product settings with toggles, select, stepper, and upload state.'],
		['error', 'Settings panel with row and summary validation.'],
		['compact', 'Short modal-friendly settings stack.']
	])
})

function renderSettingsPanelExample(state = 'default'): ReactNode {
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
				status={state === 'error' ? 'error' : 'default'}
				title={state === 'compact' ? 'Run defaults' : 'Agent workspace'}
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
			/>
		</FormWideStage>
	)
}

function FormWideStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 760, width: '100%' }}>{children}</div>
}
