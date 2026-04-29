import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react'
import { z } from 'zod/v4'
import { ConcreteIcon, type IconName } from '../icons'
import {
	booleanControl,
	iconOptions,
	selectOptionsControl,
	textControl
} from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

type IconSlot = IconName | ReactElement

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
	error?: ReactNode
	help?: ReactNode
	label?: ReactNode
	leadingIcon?: IconSlot
}

export function Input({ className, error, help, id, label, leadingIcon, ...props }: InputProps) {
	return (
		<div className={cn(concreteClassNames.field, className)}>
			{label ? (
				<label className={concreteClassNames.label} htmlFor={id}>
					{label}
				</label>
			) : null}
			<span className={concreteClassNames.inputWrap}>
				{leadingIcon ? (
					<span className={concreteClassNames.inputIcon}>{renderIconSlot(leadingIcon)}</span>
				) : null}
				<input
					aria-invalid={Boolean(error)}
					className={cn(
						concreteClassNames.input,
						Boolean(leadingIcon) && concreteClassNames.inputHasIcon,
						Boolean(error) && concreteClassNames.inputError
					)}
					id={id}
					{...props}
				/>
			</span>
			{error ? (
				<span className={cn(concreteClassNames.help, concreteClassNames.helpError)}>{error}</span>
			) : null}
			{!error && help ? <span className={concreteClassNames.help}>{help}</span> : null}
		</div>
	)
}

export const inputPropsSchema = z
	.object({
		disabled: z.boolean().default(false),
		error: z.string().optional(),
		label: z.string().optional(),
		leadingIcon: z.string().optional(),
		placeholder: z.string().optional(),
		value: z.string().default('')
	})
	.strict()

export const inputPrimitiveDefinition = defineConcretePrimitive({
	category: 'form',
	component: Input,
	controls: [
		textControl('label', 'Label', 'Email'),
		textControl('placeholder', 'Placeholder', 'you@rubric.bot'),
		textControl('value', 'Value', ''),
		selectOptionsControl('leadingIcon', 'Leading icon', '', iconOptions),
		textControl('error', 'Error', ''),
		booleanControl('disabled', 'Disabled', 'false')
	],
	description: 'Single-line field with label, help, leading icon, disabled, and error states.',
	guidance:
		'Input is the canonical single-line text field. Compose Field around it for richer form chrome.',
	kind: 'primitive',
	name: 'Input',
	pressure: ['product', 'generative'],
	props: [
		prop('label', 'ReactNode', 'Optional field label.'),
		prop('help', 'ReactNode', 'Muted helper text.'),
		prop('error', 'ReactNode', 'Error copy and invalid treatment.'),
		prop('leadingIcon', 'IconName | ReactElement', 'Glyph inside the left field slot.'),
		prop('placeholder', 'string', 'Native placeholder text.'),
		prop('disabled', 'boolean', 'Native disabled behavior.')
	],
	renderExample: renderInputExample,
	schema: inputPropsSchema,
	slug: 'input',
	states: states([
		['default', 'Empty field state.'],
		['filled', 'Value present.'],
		['error', 'Validation failure.'],
		['disabled', 'Locked field.']
	])
})

function renderInputExample(state = 'default') {
	return (
		<Frame>
			<Input
				defaultValue={state === 'filled' ? 'arihan@rubric.bot' : undefined}
				disabled={state === 'disabled'}
				error={state === 'error' ? 'Enter a valid email address.' : undefined}
				label="Email"
				leadingIcon="at-sign"
				placeholder="you@rubric.bot"
			/>
		</Frame>
	)
}

function renderIconSlot(icon: IconSlot | undefined): ReactNode {
	switch (typeof icon) {
		case 'string':
			return <ConcreteIcon name={icon} />
		default:
			return icon
	}
}
