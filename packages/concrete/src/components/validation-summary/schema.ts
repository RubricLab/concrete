import { z } from 'zod/v4'
import { formValidationItemSchema } from '../../schemas'

const validationSummaryStatusValues = ['error', 'success'] as const

export const validationSummaryComponentSchema = z
	.object({
		description: z.string().optional(),
		items: z.array(formValidationItemSchema).default([]),
		status: z.enum(validationSummaryStatusValues).default('error'),
		title: z.string().optional()
	})
	.strict()

export type ValidationSummaryInput = z.input<typeof validationSummaryComponentSchema>
export type ValidationSummaryValue = z.output<typeof validationSummaryComponentSchema>
