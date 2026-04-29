import type { FormHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { Button, Input, Select, Switch } from '../primitives'
import { cn } from '../primitives/utils'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import type { FieldStatus } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { NumberStepper } from './number-stepper-view'
import { ValidationSummary } from './validation-summary'

const formShellStatusValues = ['default', 'error', 'success'] as const
const formShellVariantValues = ['panel', 'modal', 'drawer'] as const

export type FormShellVariant = (typeof formShellVariantValues)[number]
export type FormGridColumns = 1 | 2 | 3
export type FormRowAlign = 'center' | 'start'

export type FormShellProps = Omit<FormHTMLAttributes<HTMLFormElement>, 'title'> & {
	actions?: ReactNode | undefined
	children: ReactNode
	compact?: boolean | undefined
	description?: ReactNode | undefined
	eyebrow?: ReactNode | undefined
	footer?: ReactNode | undefined
	meta?: ReactNode | undefined
	status?: FieldStatus | undefined
	title: ReactNode
	variant?: FormShellVariant | undefined
}

export function FormShell({
	actions,
	children,
	className,
	compact = false,
	description,
	eyebrow,
	footer,
	meta,
	status = 'default',
	title,
	variant = 'panel',
	...props
}: FormShellProps) {
	return (
		<form
			className={cn(concreteClassNames.formShell, className)}
			data-compact={compact ? true : undefined}
			data-status={status}
			data-variant={variant}
			{...props}
		>
			<header className={concreteClassNames.formShellHeader}>
				<div className={concreteClassNames.formShellIntro}>
					{eyebrow ? <span className={concreteClassNames.formEyebrow}>{eyebrow}</span> : null}
					<div className={concreteClassNames.formShellTitleRow}>
						<h2>{title}</h2>
						{meta ? <span className={concreteClassNames.formShellMeta}>{meta}</span> : null}
					</div>
					{description ? <p>{description}</p> : null}
				</div>
				{actions ? <div className={concreteClassNames.formShellActions}>{actions}</div> : null}
			</header>
			<div className={concreteClassNames.formShellBody}>{children}</div>
			{footer ? <footer className={concreteClassNames.formShellFooter}>{footer}</footer> : null}
		</form>
	)
}

export type FormSectionProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
	action?: ReactNode | undefined
	children: ReactNode
	description?: ReactNode | undefined
	divided?: boolean | undefined
	eyebrow?: ReactNode | undefined
	title?: ReactNode | undefined
}

export function FormSection({
	action,
	children,
	className,
	description,
	divided = true,
	eyebrow,
	title,
	...props
}: FormSectionProps) {
	return (
		<section
			className={cn(concreteClassNames.formSection, className)}
			data-divided={divided ? true : undefined}
			{...props}
		>
			{title || description || eyebrow || action ? (
				<header className={concreteClassNames.formSectionHeader}>
					<div>
						{eyebrow ? <span className={concreteClassNames.formEyebrow}>{eyebrow}</span> : null}
						{title ? <h3>{title}</h3> : null}
						{description ? <p>{description}</p> : null}
					</div>
					{action ? <div className={concreteClassNames.formSectionAction}>{action}</div> : null}
				</header>
			) : null}
			<div className={concreteClassNames.formSectionBody}>{children}</div>
		</section>
	)
}

export type FormGridProps = HTMLAttributes<HTMLDivElement> & {
	columns?: FormGridColumns | undefined
	compact?: boolean | undefined
}

export function FormGrid({
	children,
	className,
	columns = 2,
	compact = false,
	...props
}: FormGridProps) {
	return (
		<div
			className={cn(concreteClassNames.formGrid, className)}
			data-columns={columns}
			data-compact={compact ? true : undefined}
			{...props}
		>
			{children}
		</div>
	)
}

export type FormRowProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	align?: FormRowAlign | undefined
	children?: ReactNode | undefined
	control?: ReactNode | undefined
	description?: ReactNode | undefined
	interactive?: boolean | undefined
	label: ReactNode
	meta?: ReactNode | undefined
	status?: FieldStatus | undefined
}

export function FormRow({
	align = 'center',
	children,
	className,
	control,
	description,
	interactive = false,
	label,
	meta,
	status = 'default',
	...props
}: FormRowProps) {
	return (
		<div
			className={cn(concreteClassNames.formRow, className)}
			data-align={align}
			data-interactive={interactive ? true : undefined}
			data-status={status}
			{...props}
		>
			<div className={concreteClassNames.formRowCopy}>
				<span className={concreteClassNames.formRowLabel}>{label}</span>
				{description ? (
					<span className={concreteClassNames.formRowDescription}>{description}</span>
				) : null}
			</div>
			{meta ? <span className={concreteClassNames.formRowMeta}>{meta}</span> : null}
			<div className={concreteClassNames.formRowControl}>{control ?? children}</div>
		</div>
	)
}

export const formShellComponentSchema = z
	.object({
		compact: z.boolean().default(false),
		description: z.string().optional(),
		status: z.enum(formShellStatusValues).default('default'),
		title: z.string().default('Runtime settings'),
		variant: z.enum(formShellVariantValues).default('panel')
	})
	.strict()

export const formShellComponentDefinition = defineConcreteComponent({
	category: 'layout',
	component: FormShell,
	controls: [
		textControl('title', 'Title', 'Runtime settings'),
		textControl('description', 'Description', 'Configure a reusable agent workspace.'),
		selectControl('status', 'Status', 'default', formShellStatusValues),
		selectControl('variant', 'Variant', 'panel', formShellVariantValues),
		booleanControl('compact', 'Compact', 'false')
	],
	description:
		'Canonical form container with title hierarchy, metadata, action slots, body spacing, status border, and sticky-feeling footer.',
	guidance:
		'Form shell owns product form chrome and density. It deliberately slots controls and policy so persistence, submit rules, and validation source stay in application code.',
	kind: 'component',
	name: 'Form shell',
	pressure: ['product'],
	props: [
		prop('title', 'ReactNode', 'Primary form title rendered in the shell header.', undefined, true),
		prop('description', 'ReactNode', 'Supporting copy below the title.'),
		prop('eyebrow', 'ReactNode', 'Optional compact section label above the title.'),
		prop('meta', 'ReactNode', 'Small metadata beside the title.'),
		prop('actions', 'ReactNode', 'Header action slot.'),
		prop('footer', 'ReactNode', 'Footer action slot, usually cancel and submit buttons.'),
		prop('variant', "'panel' | 'modal' | 'drawer'", 'Surface treatment for the shell.', 'panel'),
		prop('status', "'default' | 'error' | 'success'", 'Outer status border treatment.', 'default'),
		prop('compact', 'boolean', 'Tightens header/body spacing for dense settings.', 'false'),
		prop('FormSection.title', 'ReactNode', 'Section title slot.'),
		prop('FormGrid.columns', '1 | 2 | 3', 'Responsive field grid column count.', '2'),
		prop('FormRow.control', 'ReactNode', 'Right-aligned primitive or component control slot.')
	],
	renderExample: renderFormShellExample,
	schema: formShellComponentSchema,
	slug: 'form-shell',
	states: states([
		['default', 'Panel shell with sections and action footer.'],
		['validation', 'Shell composed with validation summary.'],
		['compact', 'Dense settings surface rhythm.']
	])
})

function renderFormShellExample(state = 'default'): ReactNode {
	return (
		<FormWideStage>
			<FormShell
				compact={state === 'compact'}
				description="Configure a reusable agent workspace without leaving the local form contract."
				eyebrow="Workspace"
				footer={
					<>
						<Button size="small" variant="secondary">
							Cancel
						</Button>
						<Button size="small">Save changes</Button>
					</>
				}
				status={state === 'validation' ? 'error' : 'default'}
				title="Runtime settings"
			>
				{state === 'validation' ? (
					<ValidationSummary
						description="Two fields need attention before this workspace can run."
						items={[
							{
								href: '#workspace-name',
								id: 'name',
								label: 'Workspace name',
								message: 'Names must be unique inside the organization.'
							},
							{
								href: '#default-model',
								id: 'model',
								label: 'Default model',
								message: 'Choose a model before saving.'
							}
						]}
					/>
				) : null}
				<FormSection
					description="Short identity fields stay compact and directly editable."
					title="Identity"
				>
					<FormGrid columns={2} compact={state === 'compact'}>
						<Input defaultValue="Contract research" id="workspace-name" label="Name" />
						<Select
							defaultValue={state === 'validation' ? '' : 'router'}
							error={state === 'validation' ? 'Choose a default model.' : undefined}
							id="default-model"
							label="Default model"
							options={[
								{ label: 'Select model...', value: '' },
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
		</FormWideStage>
	)
}

function FormWideStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 760, width: '100%' }}>{children}</div>
}
