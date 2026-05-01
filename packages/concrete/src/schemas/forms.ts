import { z } from 'zod/v4'
import { fieldStatusSchema, uploadItemStatusSchema } from '../foundations/state/schema'

export const dateValueSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
export const timeValueSchema = z.string().regex(/^\d{2}:\d{2}$/)
export const formGridColumnsSchema = z.union([z.literal(1), z.literal(2), z.literal(3)])
export const formOverlayPresentationSchema = z.enum(['fixed', 'inline'])

export { fieldStatusSchema, uploadItemStatusSchema }

export const dateRangeValueSchema = z
	.object({
		end: dateValueSchema.optional(),
		start: dateValueSchema.optional()
	})
	.strict()

export const multiSelectOptionSchema = z
	.object({
		description: z.string().min(1).optional(),
		disabled: z.boolean().default(false),
		label: z.string().min(1),
		meta: z.string().min(1).optional(),
		value: z.string().min(1)
	})
	.strict()

export const uploadItemSchema = z
	.object({
		error: z.string().min(1).optional(),
		id: z.string().min(1),
		name: z.string().min(1),
		previewUrl: z.string().min(1).optional(),
		progress: z.number().min(0).max(100).optional(),
		size: z.number().int().nonnegative(),
		status: uploadItemStatusSchema.default('idle'),
		type: z.string().default('application/octet-stream')
	})
	.strict()

export const formShellConfigSchema = z
	.object({
		compact: z.boolean().default(false),
		description: z.string().min(1).optional(),
		status: fieldStatusSchema.default('default'),
		title: z.string().min(1)
	})
	.strict()

export const formSectionConfigSchema = z
	.object({
		description: z.string().min(1).optional(),
		divided: z.boolean().default(true),
		id: z.string().min(1),
		title: z.string().min(1)
	})
	.strict()

export const formValidationItemSchema = z
	.object({
		href: z.string().min(1).optional(),
		id: z.string().min(1),
		label: z.string().min(1),
		message: z.string().min(1),
		status: fieldStatusSchema.default('error')
	})
	.strict()

export const settingsPanelRowSchema = z
	.object({
		description: z.string().min(1).optional(),
		id: z.string().min(1),
		label: z.string().min(1),
		meta: z.string().min(1).optional(),
		status: fieldStatusSchema.default('default')
	})
	.strict()

export const settingsPanelSectionSchema = z
	.object({
		description: z.string().min(1).optional(),
		id: z.string().min(1),
		rows: z.array(settingsPanelRowSchema).min(1),
		title: z.string().min(1)
	})
	.strict()

export type DateRangeValue = z.infer<typeof dateRangeValueSchema>
export type DateValue = z.infer<typeof dateValueSchema>
export type FieldStatus = z.infer<typeof fieldStatusSchema>
export type FormGridColumnCount = z.infer<typeof formGridColumnsSchema>
export type FormOverlayPresentation = z.infer<typeof formOverlayPresentationSchema>
export type FormSectionConfig = z.infer<typeof formSectionConfigSchema>
export type FormShellConfig = z.infer<typeof formShellConfigSchema>
export type FormValidationItem = z.infer<typeof formValidationItemSchema>
export type MultiSelectOption = z.input<typeof multiSelectOptionSchema>
export type SettingsPanelRowShape = z.infer<typeof settingsPanelRowSchema>
export type SettingsPanelSectionShape = z.infer<typeof settingsPanelSectionSchema>
export type TimeValue = z.infer<typeof timeValueSchema>
export type UploadItemValue = z.infer<typeof uploadItemSchema>
export type UploadItemStatus = z.infer<typeof uploadItemStatusSchema>
