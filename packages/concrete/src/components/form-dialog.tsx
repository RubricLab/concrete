import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { Button, Input } from '../primitives'
import { selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { DateRangePicker } from './date-range-picker-view'
import { FileUpload } from './file-upload-view'
import { FormGrid, FormShell, type FormShellProps } from './form-shell'
import { MultiSelect } from './multi-select-view'
import { ValidationSummary } from './validation-summary'

const formDialogSizeValues = ['compact', 'default', 'wide'] as const
const formDialogStatusValues = ['default', 'error', 'success'] as const
const overlayPresentationValues = ['inline', 'fixed'] as const

export type FormDialogPresentation = (typeof overlayPresentationValues)[number]
export type FormDialogSize = (typeof formDialogSizeValues)[number]

export type FormDialogProps = Omit<FormShellProps, 'variant'> & {
	onOpenChange?: ((open: boolean) => void) | undefined
	open?: boolean | undefined
	presentation?: FormDialogPresentation | undefined
	size?: FormDialogSize | undefined
}

export function FormDialog({
	actions,
	children,
	className,
	onOpenChange,
	open = true,
	presentation = 'inline',
	size = 'default',
	...props
}: FormDialogProps) {
	if (!open) {
		return null
	}

	const chromeActions =
		actions || onOpenChange ? (
			<>
				{actions}
				{onOpenChange ? (
					<Button
						aria-label="Close dialog"
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
			data-size={size}
			data-type="dialog"
		>
			<div
				aria-modal={presentation === 'fixed' ? true : undefined}
				className={concreteClassNames.formDialog}
				role="dialog"
			>
				<FormShell actions={chromeActions} className={className} variant="modal" {...props}>
					{children}
				</FormShell>
			</div>
		</div>
	)
}

const multiSelectOptions = [
	{
		description: 'Foundations and primitives',
		label: 'Design system',
		meta: 'core',
		value: 'design'
	},
	{ description: 'Agentic interaction layer', label: 'AI native', meta: 'lab', value: 'ai' },
	{ description: 'Dashboards and data flows', label: 'Product', meta: 'dense', value: 'product' },
	{ disabled: true, label: 'Archived', meta: 'locked', value: 'archived' }
] as const

export const formDialogComponentSchema = z
	.object({
		description: z.string().optional(),
		open: z.boolean().default(true),
		presentation: z.enum(overlayPresentationValues).default('inline'),
		size: z.enum(formDialogSizeValues).default('default'),
		status: z.enum(formDialogStatusValues).default('default'),
		title: z.string().default('New experiment')
	})
	.strict()

export const formDialogComponentDefinition = defineConcreteComponent({
	category: 'layout',
	component: FormDialog,
	controls: [
		textControl('title', 'Title', 'New experiment'),
		textControl('description', 'Description', 'Create a bounded experiment.'),
		selectControl('status', 'Status', 'default', formDialogStatusValues),
		selectControl('size', 'Size', 'default', formDialogSizeValues)
	],
	description: 'Inline or fixed modal form surface using FormShell inside a dimmed stage.',
	guidance:
		'Form dialog provides the constrained form surface. Product code owns focus trapping and portal strategy when using fixed presentation.',
	kind: 'component',
	name: 'Form dialog',
	pressure: ['product'],
	props: [
		prop('open', 'boolean', 'Controls whether the dialog renders.', 'true'),
		prop(
			'presentation',
			"'inline' | 'fixed'",
			'Inline documentation stage or fixed viewport overlay.',
			'inline'
		),
		prop('size', "'compact' | 'default' | 'wide'", 'Dialog max-width preset.', 'default'),
		prop('onOpenChange', '(open: boolean) => void', 'Close affordance callback.'),
		prop('title', 'ReactNode', 'Primary form title rendered in the shell header.', undefined, true),
		prop('description', 'ReactNode', 'Supporting copy below the title.'),
		prop('footer', 'ReactNode', 'Footer action slot, usually cancel and submit buttons.'),
		prop('status', "'default' | 'error' | 'success'", 'Outer status border treatment.', 'default'),
		prop('children', 'ReactNode', 'Dialog form content.')
	],
	renderExample: renderFormDialogExample,
	schema: formDialogComponentSchema,
	slug: 'form-dialog',
	states: states([
		['default', 'Centered modal form with text, choice, and footer actions.'],
		['wide', 'Wider modal for picker and upload compositions.'],
		['error', 'Dialog with validation feedback.']
	])
})

function renderFormDialogExample(state = 'default'): ReactNode {
	return (
		<FormWideStage>
			<FormDialog
				description="Create a bounded experiment without leaving the current workspace."
				footer={
					<>
						<Button size="small" variant="secondary">
							Cancel
						</Button>
						<Button size="small">Create run</Button>
					</>
				}
				size={state === 'wide' ? 'wide' : 'default'}
				status={state === 'error' ? 'error' : 'default'}
				title="New experiment"
			>
				{state === 'error' ? (
					<ValidationSummary
						description="A run name and date window are required."
						items={[
							{ id: 'run-name', label: 'Run name', message: 'Add a short descriptive name.' },
							{ id: 'window', label: 'Date window', message: 'Choose a start and end date.' }
						]}
					/>
				) : null}
				<FormGrid columns={state === 'wide' ? 2 : 1}>
					<Input
						error={state === 'error' ? 'Add a short descriptive name.' : undefined}
						id="run-name"
						label="Run name"
						placeholder="Router contract check"
					/>
					<DateRangePicker
						defaultOpen={state === 'wide'}
						defaultValue={{ end: '2026-05-07', start: '2026-04-28' }}
						id="window"
						label="Window"
					/>
					<MultiSelect defaultValue={['design']} label="Tags" options={multiSelectOptions} />
					<FileUpload defaultValue={[]} label="Artifacts" title="Attach packet" />
				</FormGrid>
			</FormDialog>
		</FormWideStage>
	)
}

function FormWideStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 760, width: '100%' }}>{children}</div>
}
