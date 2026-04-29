import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { Button, Select, Switch } from '../primitives'
import { selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { DatePicker } from './date-picker-view'
import type { FormDialogPresentation } from './form-dialog'
import { FormRow, FormSection, FormShell, type FormShellProps } from './form-shell'
import { NumberStepper } from './number-stepper-view'
import { ValidationSummary } from './validation-summary'

const formDrawerStatusValues = ['default', 'error', 'success'] as const
const overlayPresentationValues = ['inline', 'fixed'] as const
const formDrawerSideValues = ['left', 'right'] as const

export type FormDrawerSide = (typeof formDrawerSideValues)[number]

export type FormDrawerProps = Omit<FormShellProps, 'variant'> & {
	onOpenChange?: ((open: boolean) => void) | undefined
	open?: boolean | undefined
	presentation?: FormDialogPresentation | undefined
	side?: FormDrawerSide | undefined
}

export function FormDrawer({
	actions,
	children,
	className,
	onOpenChange,
	open = true,
	presentation = 'inline',
	side = 'right',
	...props
}: FormDrawerProps) {
	if (!open) {
		return null
	}

	const chromeActions =
		actions || onOpenChange ? (
			<>
				{actions}
				{onOpenChange ? (
					<Button
						aria-label="Close drawer"
						leadingIcon="x"
						onClick={() => onOpenChange(false)}
						size="small"
						type="button"
						variant="ghost"
					/>
				) : null}
			</>
		) : undefined

	return (
		<div
			className={concreteClassNames.formOverlay}
			data-presentation={presentation}
			data-side={side}
			data-type="drawer"
		>
			<aside
				aria-modal={presentation === 'fixed' ? true : undefined}
				className={concreteClassNames.formDrawer}
				role="dialog"
			>
				<FormShell actions={chromeActions} className={className} variant="drawer" {...props}>
					{children}
				</FormShell>
			</aside>
		</div>
	)
}

export const formDrawerComponentSchema = z
	.object({
		description: z.string().optional(),
		open: z.boolean().default(true),
		presentation: z.enum(overlayPresentationValues).default('inline'),
		side: z.enum(formDrawerSideValues).default('right'),
		status: z.enum(formDrawerStatusValues).default('default'),
		title: z.string().default('Workspace policy')
	})
	.strict()

export const formDrawerComponentDefinition = defineConcreteComponent({
	category: 'layout',
	component: FormDrawer,
	controls: [
		textControl('title', 'Title', 'Workspace policy'),
		textControl('description', 'Description', 'Contextual editing beside dense product surfaces.'),
		selectControl('status', 'Status', 'default', formDrawerStatusValues),
		selectControl('side', 'Side', 'right', formDrawerSideValues)
	],
	description: 'Inline or fixed side-sheet form surface for inspect-and-edit workflows.',
	guidance:
		'Form drawer is for contextual editing beside dense product surfaces. It uses the same shell and row language as panels and dialogs.',
	kind: 'component',
	name: 'Form drawer',
	pressure: ['product'],
	props: [
		prop('open', 'boolean', 'Controls whether the drawer renders.', 'true'),
		prop(
			'presentation',
			"'inline' | 'fixed'",
			'Inline documentation stage or fixed viewport overlay.',
			'inline'
		),
		prop('side', "'left' | 'right'", 'Drawer edge for fixed or inline stages.', 'right'),
		prop('onOpenChange', '(open: boolean) => void', 'Close affordance callback.'),
		prop('title', 'ReactNode', 'Primary form title rendered in the shell header.', undefined, true),
		prop('description', 'ReactNode', 'Supporting copy below the title.'),
		prop('footer', 'ReactNode', 'Footer action slot, usually cancel and submit buttons.'),
		prop('status', "'default' | 'error' | 'success'", 'Outer status border treatment.', 'default'),
		prop('children', 'ReactNode', 'Drawer form content.')
	],
	renderExample: renderFormDrawerExample,
	schema: formDrawerComponentSchema,
	slug: 'form-drawer',
	states: states([
		['default', 'Right-side drawer with settings rows.'],
		['review', 'Drawer with validation and review actions.'],
		['left', 'Left-side drawer variant for navigation-adjacent forms.']
	])
})

function renderFormDrawerExample(state = 'default'): ReactNode {
	return (
		<FormWideStage>
			<FormDrawer
				description="Contextual edit surface for dense product screens."
				footer={
					<>
						<Button size="small" variant="secondary">
							Discard
						</Button>
						<Button size="small">Apply</Button>
					</>
				}
				side={state === 'left' ? 'left' : 'right'}
				status={state === 'review' ? 'error' : 'default'}
				title="Workspace policy"
			>
				{state === 'review' ? (
					<ValidationSummary
						description="Review the owner and budget rules before applying."
						items={[
							{ id: 'owner', label: 'Owner', message: 'Assign a person or agent team.' },
							{ id: 'budget', label: 'Budget', message: 'A run budget is required.' }
						]}
					/>
				) : null}
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
						control={<NumberStepper defaultValue={state === 'review' ? 0 : 25} max={100} min={0} />}
						description="Daily command executions for this workspace."
						label="Run budget"
						meta="daily"
						status={state === 'review' ? 'error' : 'default'}
					/>
					<FormRow
						control={<DatePicker defaultValue="2026-05-01" label="" />}
						description="Policy review date."
						label="Review"
					/>
				</FormSection>
			</FormDrawer>
		</FormWideStage>
	)
}

function FormWideStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 760, width: '100%' }}>{children}</div>
}
