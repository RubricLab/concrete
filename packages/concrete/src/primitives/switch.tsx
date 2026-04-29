import type { InputHTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { booleanControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	label?: ReactNode
}

export function Switch({ checked, className, label, ...props }: SwitchProps) {
	return (
		<label className={cn(concreteClassNames.switch, className)}>
			<input
				checked={checked}
				className={concreteClassNames.visuallyHidden}
				type="checkbox"
				{...props}
			/>
			<span
				aria-hidden
				className={cn(concreteClassNames.switchTrack, checked && concreteClassNames.switchChecked)}
			/>
			{label}
		</label>
	)
}

export const switchPropsSchema = z
	.object({
		checked: z.boolean().default(false),
		disabled: z.boolean().default(false),
		label: z.string().default('Selected')
	})
	.strict()

export const switchPrimitiveDefinition = defineConcretePrimitive({
	category: 'form',
	component: Switch,
	controls: [
		booleanControl('checked', 'Checked', 'true'),
		booleanControl('disabled', 'Disabled', 'false'),
		textControl('label', 'Label', 'Selected')
	],
	description: 'Binary setting control for product preferences and modes.',
	guidance: 'Switches are for durable on/off settings, not one-shot commands.',
	kind: 'primitive',
	name: 'Switch',
	pressure: ['product'],
	props: [
		prop('checked', 'boolean', 'Controlled checked state.'),
		prop('defaultChecked', 'boolean', 'Uncontrolled checked state.'),
		prop('label', 'ReactNode', 'Inline label rendered beside the control.'),
		prop('disabled', 'boolean', 'Native disabled behavior and opacity.')
	],
	renderExample: renderSwitchExample,
	schema: switchPropsSchema,
	slug: 'switch',
	states: states([
		['default', 'Enabled and disabled settings.'],
		['disabled', 'Locked setting state.']
	])
})

function renderSwitchExample() {
	return (
		<Frame>
			<Switch checked label="Agent memory" readOnly /> <Switch label="Draft mode" readOnly />
		</Frame>
	)
}
