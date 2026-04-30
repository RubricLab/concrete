import { z } from 'zod/v4'

export const selectOptionSchema = z
	.object({
		disabled: z.boolean().optional(),
		label: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const workspaceOptions = [
	{ label: 'Rubric Labs', value: 'rubric' },
	{ label: 'Concrete', value: 'concrete' },
	{ label: 'Research', value: 'research' }
]

export const selectSchema = z
	.object({
		help: z.string().optional(),
		label: z.string().optional(),
		options: z.array(selectOptionSchema).default(() => [...workspaceOptions]),
		value: z.string().optional()
	})
	.strict()

export { selectSchema as selectPropsSchema }
export type SelectInput = z.input<typeof selectSchema>
export type SelectValue = z.output<typeof selectSchema>
