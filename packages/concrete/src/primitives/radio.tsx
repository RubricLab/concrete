import type { InputHTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { booleanControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	label?: ReactNode
}

export function Radio({ checked, className, label, ...props }: RadioProps) {
	return (
		<label className={cn(concreteClassNames.checkRow, className)}>
			<input checked={checked} className={concreteClassNames.visuallyHidden} type="radio" {...props} />
			<span
				aria-hidden
				className={cn(concreteClassNames.radio, checked && concreteClassNames.radioChecked)}
			>
				{checked ? <span className={concreteClassNames.radioDot} /> : null}
			</span>
			{label}
		</label>
	)
}

export const radioPropsSchema = z
	.object({
		checked: z.boolean().default(false),
		disabled: z.boolean().default(false),
		label: z.string().default('Selected')
	})
	.strict()

export const radioPrimitiveDefinition = defineConcretePrimitive({
	category: 'form',
	component: Radio,
	controls: [
		booleanControl('checked', 'Checked', 'true'),
		booleanControl('disabled', 'Disabled', 'false'),
		textControl('label', 'Label', 'Selected')
	],
	description: 'Exclusive choice primitive with the same row rhythm as checkbox.',
	guidance:
		'Radio is for one-of-many selection where every option remains visible in a compact row.',
	kind: 'primitive',
	name: 'Radio',
	pressure: ['product'],
	props: [
		prop('checked', 'boolean', 'Controlled checked state.'),
		prop('defaultChecked', 'boolean', 'Uncontrolled checked state.'),
		prop('label', 'ReactNode', 'Inline label rendered beside the control.'),
		prop('disabled', 'boolean', 'Native disabled behavior and opacity.')
	],
	renderExample: renderRadioExample,
	schema: radioPropsSchema,
	slug: 'radio',
	states: states([
		['default', 'Selected and unselected options.'],
		['disabled', 'Locked option state.']
	])
})

function renderRadioExample() {
	return (
		<Frame>
			<Radio checked label="Tight" name="rhythm" readOnly />{' '}
			<Radio label="Loose" name="rhythm" readOnly />
		</Frame>
	)
}
