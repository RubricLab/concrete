import type { ReactNode, TextareaHTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	error?: ReactNode
	help?: ReactNode
	label?: ReactNode
}

export function Textarea({ className, error, help, id, label, ...props }: TextareaProps) {
	return (
		<div className={cn(concreteClassNames.field, className)}>
			{label ? (
				<label className={concreteClassNames.label} htmlFor={id}>
					{label}
				</label>
			) : null}
			<textarea
				aria-invalid={Boolean(error)}
				className={cn(
					concreteClassNames.input,
					concreteClassNames.textarea,
					Boolean(error) && concreteClassNames.inputError
				)}
				id={id}
				{...props}
			/>
			{error ? (
				<span className={cn(concreteClassNames.help, concreteClassNames.helpError)}>{error}</span>
			) : null}
			{!error && help ? <span className={concreteClassNames.help}>{help}</span> : null}
		</div>
	)
}

export const textareaPropsSchema = z
	.object({
		error: z.string().optional(),
		label: z.string().optional(),
		placeholder: z.string().optional(),
		value: z.string().default('')
	})
	.strict()

export const textareaPrimitiveDefinition = defineConcretePrimitive({
	category: 'form',
	component: Textarea,
	controls: [
		textControl('label', 'Label', 'Prompt'),
		textControl('placeholder', 'Placeholder', 'Describe the experiment...'),
		textControl('value', 'Value', ''),
		textControl('error', 'Error', '')
	],
	description: 'Multi-line prompt and prose input with validation support.',
	guidance:
		'Textarea is for prompt and prose entry. Keep surrounding composition responsible for actions.',
	kind: 'primitive',
	name: 'Textarea',
	pressure: ['product', 'generative', 'editorial'],
	props: [
		prop('label', 'ReactNode', 'Optional field label.'),
		prop('help', 'ReactNode', 'Muted helper text.'),
		prop('error', 'ReactNode', 'Error copy and invalid treatment.'),
		prop('placeholder', 'string', 'Native placeholder text.')
	],
	renderExample: renderTextareaExample,
	schema: textareaPropsSchema,
	slug: 'textarea',
	states: states([
		['default', 'Empty field state.'],
		['filled', 'Value present.'],
		['error', 'Validation failure.'],
		['disabled', 'Locked field.']
	])
})

function renderTextareaExample(state = 'default') {
	return (
		<Frame>
			<Textarea
				defaultValue={state === 'filled' ? 'Summarize the architecture review.' : undefined}
				error={state === 'error' ? 'Prompt is too short.' : undefined}
				label="Prompt"
				placeholder="Describe the experiment..."
			/>
		</Frame>
	)
}
