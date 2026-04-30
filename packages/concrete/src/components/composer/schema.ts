import type { z } from 'zod/v4'
import { composerConfigSchema, composerValueSchema } from '../../schemas'

export const composerComponentSchema = composerConfigSchema
	.extend({
		defaultValue: composerValueSchema.optional()
	})
	.strict()

export type ComposerInput = z.input<typeof composerComponentSchema>
export type ComposerComponentValue = z.output<typeof composerComponentSchema>
