import type { ReactNode, SelectHTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

export type SelectOption = {
	disabled?: boolean
	label: string
	value: string
}

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
	error?: ReactNode
	help?: ReactNode
	label?: ReactNode
	options: readonly SelectOption[]
}

export function Select({ className, error, help, id, label, options, ...props }: SelectProps) {
	return (
		<div className={cn(concreteClassNames.field, className)}>
			{label ? (
				<label className={concreteClassNames.label} htmlFor={id}>
					{label}
				</label>
			) : null}
			<span className={cn(concreteClassNames.inputWrap, concreteClassNames.selectWrap)}>
				<select
					aria-invalid={Boolean(error)}
					className={cn(
						concreteClassNames.input,
						concreteClassNames.select,
						Boolean(error) && concreteClassNames.inputError
					)}
					id={id}
					{...props}
				>
					{options.map(option => (
						<option disabled={option.disabled} key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</span>
			{error ? (
				<span className={cn(concreteClassNames.help, concreteClassNames.helpError)}>{error}</span>
			) : null}
			{!error && help ? <span className={concreteClassNames.help}>{help}</span> : null}
		</div>
	)
}

export const selectOptionSchema = z
	.object({
		disabled: z.boolean().optional(),
		label: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const selectPropsSchema = z
	.object({
		help: z.string().optional(),
		label: z.string().optional(),
		options: z.array(selectOptionSchema).default([]),
		value: z.string().optional()
	})
	.strict()

const workspaceOptions = [
	{ label: 'Rubric Labs', value: 'rubric' },
	{ label: 'Concrete', value: 'concrete' },
	{ label: 'Research', value: 'research' }
] as const

export const selectPrimitiveDefinition = defineConcretePrimitive({
	category: 'form',
	component: Select,
	controls: [
		textControl('label', 'Label', 'Workspace'),
		selectControl('value', 'Value', 'rubric', ['rubric', 'concrete', 'research']),
		textControl('help', 'Help', '')
	],
	description: 'Native option picker styled to the Concrete field rhythm.',
	guidance:
		'Select keeps choice semantics native. Use components only when search or multiple selection is required.',
	kind: 'primitive',
	name: 'Select',
	pressure: ['product'],
	props: [
		prop(
			'options',
			'readonly { label: string; value: string; disabled?: boolean }[]',
			'Native select options.',
			'',
			true
		),
		prop('label', 'ReactNode', 'Optional field label.'),
		prop('help', 'ReactNode', 'Muted helper text.'),
		prop('error', 'ReactNode', 'Error copy and invalid treatment.')
	],
	renderExample: renderSelectExample,
	schema: selectPropsSchema,
	slug: 'select',
	states: states([
		['default', 'Empty field state.'],
		['filled', 'Value present.'],
		['error', 'Validation failure.'],
		['disabled', 'Locked field.']
	])
})

function renderSelectExample(state = 'default') {
	return (
		<Frame>
			<Select
				defaultValue={state === 'filled' ? 'concrete' : 'rubric'}
				error={state === 'error' ? 'Choose an active workspace.' : undefined}
				help={state === 'default' ? 'Choose a workspace.' : undefined}
				label="Workspace"
				options={workspaceOptions}
			/>
		</Frame>
	)
}
