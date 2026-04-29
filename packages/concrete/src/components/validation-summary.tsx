import type { HTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { ConcreteIcon } from '../icons'
import { Button } from '../primitives'
import { cn } from '../primitives/utils'
import { selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { type FieldStatus, formValidationItemSchema } from '../schemas'
import { concreteClassNames } from '../styles/class-names'

const validationSummaryStatusValues = ['error', 'success'] as const

export type ValidationSummaryItem = {
	href?: string | undefined
	id: string
	label: ReactNode
	message: ReactNode
	status?: FieldStatus | undefined
}

export type ValidationSummaryProps = HTMLAttributes<HTMLDivElement> & {
	action?: ReactNode | undefined
	description?: ReactNode | undefined
	items?: readonly ValidationSummaryItem[] | undefined
	status?: FieldStatus | undefined
	title?: ReactNode | undefined
}

export function ValidationSummary({
	action,
	className,
	description,
	items = [],
	status = 'error',
	title = status === 'success' ? 'Ready to save' : 'Review required',
	...props
}: ValidationSummaryProps) {
	return (
		<div
			className={cn(concreteClassNames.validationSummary, className)}
			data-status={status}
			{...props}
		>
			<div className={concreteClassNames.validationSummaryIcon}>
				<ConcreteIcon name={status === 'success' ? 'check' : 'x'} />
			</div>
			<div className={concreteClassNames.validationSummaryBody}>
				<div className={concreteClassNames.validationSummaryHead}>
					<div>
						<b>{title}</b>
						{description ? <p>{description}</p> : null}
					</div>
					{action ? <div className={concreteClassNames.validationSummaryAction}>{action}</div> : null}
				</div>
				{items.length > 0 ? (
					<ul className={concreteClassNames.validationList}>
						{items.map(item => (
							<li data-status={item.status ?? status} key={item.id}>
								<ConcreteIcon name={item.status === 'success' ? 'check' : 'x'} />
								<span>
									{item.href ? <a href={item.href}>{item.label}</a> : <b>{item.label}</b>}
									<small>{item.message}</small>
								</span>
							</li>
						))}
					</ul>
				) : null}
			</div>
		</div>
	)
}

export const validationSummaryComponentSchema = z
	.object({
		description: z.string().optional(),
		items: z.array(formValidationItemSchema).default([]),
		status: z.enum(validationSummaryStatusValues).default('error'),
		title: z.string().optional()
	})
	.strict()

export const validationSummaryComponentDefinition = defineConcreteComponent({
	category: 'feedback',
	component: ValidationSummary,
	controls: [
		selectControl('status', 'Status', 'error', validationSummaryStatusValues),
		textControl('title', 'Title', 'Review required'),
		textControl('description', 'Description', 'Resolve the listed fields before saving.')
	],
	description:
		'Top-level form feedback with status icon, field-linked items, compact copy, and optional action slot.',
	guidance:
		'Validation summary is for cross-field feedback and submit blocking. Field-level messages still live on Field, Input, and composed controls.',
	kind: 'component',
	name: 'Validation summary',
	pressure: ['product'],
	props: [
		prop('title', 'ReactNode', 'Summary title.', 'Review required'),
		prop('description', 'ReactNode', 'Short explanation below the title.'),
		prop(
			'items',
			'readonly ValidationSummaryItem[]',
			'Field-linked validation rows. Serializable item shape is validated by formValidationItemSchema.',
			'[]'
		),
		prop('status', "'default' | 'error' | 'success'", 'Summary status tone.', 'error'),
		prop('action', 'ReactNode', 'Optional right-side action slot.')
	],
	renderExample: renderValidationSummaryExample,
	schema: validationSummaryComponentSchema,
	slug: 'validation-summary',
	states: states([
		['error', 'Submit-blocking errors with field links.'],
		['success', 'Positive ready state.'],
		['mixed', 'Multiple rows with mixed statuses.']
	])
})

function renderValidationSummaryExample(state = 'error'): ReactNode {
	return (
		<FormStage>
			<ValidationSummary
				action={
					state === 'success' ? (
						<Button size="small" variant="secondary">
							Review
						</Button>
					) : undefined
				}
				description={
					state === 'success'
						? 'All required fields are complete and ready to submit.'
						: 'Resolve the listed fields before saving the workflow.'
				}
				items={
					state === 'success'
						? [
								{
									id: 'ready',
									label: 'Configuration',
									message: 'No blocking validation remains.',
									status: 'success'
								}
							]
						: [
								{
									href: '#owner',
									id: 'owner',
									label: 'Owner',
									message: 'Assign a responsible operator.'
								},
								{
									href: '#budget',
									id: 'budget',
									label: 'Budget limit',
									message: 'Enter a value between 1 and 100.'
								},
								...(state === 'mixed'
									? [
											{
												id: 'uploads',
												label: 'Reference packet',
												message: 'Two files are attached.',
												status: 'success' as const
											}
										]
									: [])
							]
				}
				status={state === 'success' ? 'success' : 'error'}
			/>
		</FormStage>
	)
}

function FormStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 620, width: '100%' }}>{children}</div>
}
