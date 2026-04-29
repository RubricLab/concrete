import type { HTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import type { FieldStatus } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { Input } from './input'
import { cn } from './utils'

export type FieldProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
	count?: number | undefined
	description?: ReactNode | undefined
	error?: ReactNode | undefined
	help?: ReactNode | undefined
	htmlFor?: string | undefined
	label?: ReactNode | undefined
	limit?: number | undefined
	optional?: boolean | undefined
	required?: boolean | undefined
	status?: FieldStatus | undefined
	success?: ReactNode | undefined
}

export function Field({
	children,
	className,
	count,
	description,
	error,
	help,
	htmlFor,
	label,
	limit,
	optional = false,
	required = false,
	status = 'default',
	success,
	...props
}: FieldProps) {
	const resolvedStatus = error ? 'error' : success ? 'success' : status
	const message = error ?? success ?? help
	const countText =
		count === undefined ? undefined : limit === undefined ? String(count) : `${count} / ${limit}`

	return (
		<div
			className={cn(concreteClassNames.formField, className)}
			data-status={resolvedStatus}
			{...props}
		>
			{label || description || optional || required ? (
				<div className={concreteClassNames.formFieldHead}>
					{label ? (
						<label className={concreteClassNames.formFieldLabel} htmlFor={htmlFor}>
							{label}
							{required ? <span aria-hidden> *</span> : null}
						</label>
					) : null}
					{optional ? <span className={concreteClassNames.formFieldMeta}>Optional</span> : null}
				</div>
			) : null}
			{description ? (
				<div className={concreteClassNames.formFieldDescription}>{description}</div>
			) : null}
			{children}
			{message || countText ? (
				<div className={concreteClassNames.formFieldFoot}>
					{message ? (
						<span className={concreteClassNames.formFieldMessage} data-status={resolvedStatus}>
							{message}
						</span>
					) : (
						<span />
					)}
					{countText ? <span className={concreteClassNames.formFieldCount}>{countText}</span> : null}
				</div>
			) : null}
		</div>
	)
}

export const fieldPropsSchema = z
	.object({
		description: z.string().optional(),
		error: z.string().optional(),
		help: z.string().optional(),
		label: z.string().default('Workspace handle'),
		optional: z.boolean().default(false),
		required: z.boolean().default(false),
		status: z.enum(['default', 'error', 'success']).default('default'),
		success: z.string().optional()
	})
	.strict()

export const fieldPrimitiveDefinition = defineConcretePrimitive({
	category: 'form',
	component: Field,
	controls: [
		textControl('label', 'Label', 'Workspace handle'),
		textControl('description', 'Description', 'Canonical field hierarchy for dense product forms.'),
		selectControl('status', 'Status', 'default', ['default', 'error', 'success']),
		booleanControl('required', 'Required', 'false'),
		booleanControl('optional', 'Optional', 'false')
	],
	description: 'Form chrome primitive for label, description, helper, validation, and counts.',
	guidance:
		'Field owns field-level hierarchy only. It does not own input state or validation logic; compose it around the primitive or component that owns the control.',
	kind: 'primitive',
	name: 'Field',
	pressure: ['product', 'generative'],
	props: [
		prop('label', 'ReactNode', 'Primary field label.'),
		prop('description', 'ReactNode', 'Supporting copy below the label.'),
		prop('help', 'ReactNode', 'Neutral helper message.'),
		prop('error', 'ReactNode', 'Error message and error status source.'),
		prop('success', 'ReactNode', 'Success message and success status source.'),
		prop('required', 'boolean', 'Marks the label as required.', 'false'),
		prop('optional', 'boolean', 'Shows optional label metadata.', 'false'),
		prop('count', 'number', 'Current character or item count.'),
		prop('limit', 'number', 'Maximum character or item count.')
	],
	renderExample: renderFieldExample,
	schema: fieldPropsSchema,
	slug: 'field',
	states: states([
		['default', 'Label, description, helper, and composed control.'],
		['error', 'Error message and status treatment.'],
		['success', 'Positive validation message.'],
		['count', 'Count and limit metadata.']
	])
})

function renderFieldExample(state = 'default') {
	return (
		<Frame>
			<Field
				count={state === 'count' ? 42 : undefined}
				description="Canonical field hierarchy for dense product forms."
				error={state === 'error' ? 'The workspace handle is already taken.' : undefined}
				help={state === 'default' ? 'Use lowercase letters and hyphens.' : undefined}
				label="Workspace handle"
				limit={state === 'count' ? 64 : undefined}
				success={state === 'success' ? 'Looks available.' : undefined}
			>
				<Input placeholder="rubric-labs" />
			</Field>
		</Frame>
	)
}
