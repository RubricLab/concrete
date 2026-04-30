import { z } from 'zod/v4'
import { multiSelectOptionSchema } from '../../schemas'

const multiSelectDefaultOptions = [
	{
		description: 'Foundations and primitives',
		disabled: false,
		label: 'Design system',
		meta: 'core',
		value: 'design'
	},
	{
		description: 'Agentic interaction layer',
		disabled: false,
		label: 'AI native',
		meta: 'lab',
		value: 'ai'
	},
	{
		description: 'Dashboards and data flows',
		disabled: false,
		label: 'Product',
		meta: 'dense',
		value: 'product'
	},
	{ disabled: true, label: 'Archived', meta: 'locked', value: 'archived' }
]

export const multiSelectComponentSchema = z
	.object({
		defaultOpen: z.boolean().default(false),
		defaultValue: z.array(z.string()).default(['design', 'ai']),
		label: z.string().default('Project tags'),
		maxSelected: z.number().int().positive().optional(),
		options: z.array(multiSelectOptionSchema).default(multiSelectDefaultOptions)
	})
	.strict()

export type MultiSelectInput = z.input<typeof multiSelectComponentSchema>
export type MultiSelectValue = z.output<typeof multiSelectComponentSchema>
