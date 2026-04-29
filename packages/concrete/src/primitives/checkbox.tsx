import type { InputHTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { ConcreteIcon } from '../icons'
import { booleanControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	label?: ReactNode
}

export function Checkbox({ checked, className, label, ...props }: CheckboxProps) {
	return (
		<label className={cn(concreteClassNames.checkRow, className)}>
			<input
				checked={checked}
				className={concreteClassNames.visuallyHidden}
				type="checkbox"
				{...props}
			/>
			<span
				aria-hidden
				className={cn(concreteClassNames.checkbox, checked && concreteClassNames.checkboxChecked)}
			>
				{checked ? <ConcreteIcon name="check" /> : null}
			</span>
			{label}
		</label>
	)
}

export const checkboxPropsSchema = z
	.object({
		checked: z.boolean().default(false),
		disabled: z.boolean().default(false),
		label: z.string().default('Selected')
	})
	.strict()

export const checkboxPrimitiveDefinition = defineConcretePrimitive({
	category: 'form',
	component: Checkbox,
	controls: [
		booleanControl('checked', 'Checked', 'true'),
		booleanControl('disabled', 'Disabled', 'false'),
		textControl('label', 'Label', 'Selected')
	],
	description: 'Binary selection primitive with compact row alignment.',
	guidance: 'Checkbox is the compact binary choice atom for dense forms and list selection.',
	kind: 'primitive',
	name: 'Checkbox',
	pressure: ['product'],
	props: [
		prop('checked', 'boolean', 'Controlled checked state.'),
		prop('defaultChecked', 'boolean', 'Uncontrolled checked state.'),
		prop('label', 'ReactNode', 'Inline label rendered beside the control.'),
		prop('disabled', 'boolean', 'Native disabled behavior and opacity.')
	],
	renderExample: renderCheckboxExample,
	schema: checkboxPropsSchema,
	slug: 'checkbox',
	states: states([
		['default', 'Checked and unchecked choices.'],
		['disabled', 'Locked choice state.']
	])
})

function renderCheckboxExample() {
	return (
		<Frame>
			<Checkbox checked label="Use strict schemas" readOnly />{' '}
			<Checkbox label="Optional path" readOnly />
		</Frame>
	)
}
