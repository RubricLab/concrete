import { z } from 'zod/v4'
import { settingsPanelSectionSchema } from '../../schemas'

const settingsPanelStatusValues = ['default', 'error', 'success'] as const

export const settingsPanelComponentSchema = z
	.object({
		compact: z.boolean().default(false),
		description: z.string().optional(),
		sections: z.array(settingsPanelSectionSchema).default([]),
		status: z.enum(settingsPanelStatusValues).default('default'),
		title: z.string().default('Agent workspace')
	})
	.strict()

export type SettingsPanelInput = z.input<typeof settingsPanelComponentSchema>
export type SettingsPanelValue = z.output<typeof settingsPanelComponentSchema>
