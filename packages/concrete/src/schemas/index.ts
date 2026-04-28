import { z } from 'zod/v4'

export const concretePressureSchema = z.enum(['product', 'editorial', 'generative', 'educational'])
export const concreteSignalSchema = z.enum(['terminal', 'ultra', 'error'])
export const concreteViewportSchema = z.enum(['desktop', 'tablet', 'mobile'])
export const concreteRenderKindSchema = z.enum(['primitive', 'component'])
export const composerFormatSchema = z.enum(['bold', 'italic', 'underline', 'strikethrough'])
export const composerSuggestionKindSchema = z.enum(['command', 'mention'])
export const commandItemToneSchema = z.enum(['default', 'error', 'sky', 'terminal', 'ultra'])
export const messageRoleSchema = z.enum(['assistant', 'system', 'tool', 'user'])
export const messageSurfaceSchema = z.enum(['bubble', 'plain'])
export const messageStatusSchema = z.enum(['complete', 'error', 'pending', 'streaming'])
export const toolCallStatusSchema = z.enum(['error', 'queued', 'running', 'success'])
export const fieldStatusSchema = z.enum(['default', 'error', 'success'])
export const dateValueSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
export const timeValueSchema = z.string().regex(/^\d{2}:\d{2}$/)
export const uploadItemStatusSchema = z.enum(['error', 'idle', 'success', 'uploading'])
export const formShellVariantSchema = z.enum(['panel', 'modal', 'drawer'])
export const formGridColumnsSchema = z.union([z.literal(1), z.literal(2), z.literal(3)])
export const formOverlayPresentationSchema = z.enum(['fixed', 'inline'])

export const renderQuerySchema = z
	.object({
		pressure: concretePressureSchema.default('product'),
		quality: z.coerce.number().int().min(1).max(100).default(92),
		state: z.string().min(1).default('default'),
		viewport: concreteViewportSchema.default('desktop')
	})
	.catchall(z.union([z.boolean(), z.number(), z.string()]))

export const primitiveCategorySchema = z.enum([
	'brand',
	'control',
	'data',
	'feedback',
	'form',
	'foundation',
	'layout',
	'media',
	'navigation',
	'status',
	'surface',
	'typography'
])

export const primitivePropSchema = z
	.object({
		defaultValue: z.string().optional(),
		description: z.string().min(1),
		name: z.string().min(1),
		required: z.boolean().optional(),
		type: z.string().min(1)
	})
	.strict()

export const primitiveStateSchema = z
	.object({
		description: z.string().min(1),
		name: z.string().min(1),
		query: z.string().min(1)
	})
	.strict()

export const registryEntrySchema = z
	.object({
		category: primitiveCategorySchema,
		description: z.string().min(1),
		guidance: z.string().min(1),
		name: z.string().min(1),
		pressure: z.array(concretePressureSchema).min(1),
		props: z.array(primitivePropSchema),
		slug: z.string().min(1),
		states: z.array(primitiveStateSchema).min(1)
	})
	.strict()

export const composerAttachmentSchema = z
	.object({
		id: z.string().min(1),
		meta: z.string().min(1).optional(),
		name: z.string().min(1),
		type: z.string().min(1).default('file')
	})
	.strict()

export const composerSuggestionSchema = z
	.object({
		avatar: z.string().min(1).optional(),
		description: z.string().min(1).optional(),
		disabled: z.boolean().default(false),
		id: z.string().min(1),
		insertLabel: z.string().min(1).optional(),
		kind: composerSuggestionKindSchema,
		label: z.string().min(1),
		meta: z.string().min(1).optional()
	})
	.strict()

export const composerTokenSchema = z
	.object({
		id: z.string().min(1),
		kind: composerSuggestionKindSchema,
		label: z.string().min(1)
	})
	.strict()

export const composerValueSchema = z
	.object({
		attachments: z.array(composerAttachmentSchema).default([]),
		commands: z.array(composerTokenSchema).default([]),
		html: z.string().default(''),
		mentions: z.array(composerTokenSchema).default([]),
		text: z.string().default('')
	})
	.strict()

export const composerConfigSchema = z
	.object({
		commandOptions: z.array(composerSuggestionSchema).default([]),
		defaultMenuKind: composerSuggestionKindSchema.optional(),
		defaultMenuQuery: z.string().default(''),
		disabled: z.boolean().default(false),
		mentionOptions: z.array(composerSuggestionSchema).default([]),
		placeholder: z.string().default('Write a message...'),
		submitLabel: z.string().default('Send'),
		submitOnEnter: z.boolean().default(true),
		value: composerValueSchema.optional()
	})
	.strict()

export const commandItemSchema = z
	.object({
		description: z.string().min(1).optional(),
		disabled: z.boolean().default(false),
		group: z.string().min(1).default('Actions'),
		id: z.string().min(1),
		label: z.string().min(1),
		meta: z.string().min(1).optional(),
		shortcut: z.array(z.string().min(1)).default([]),
		tone: commandItemToneSchema.default('default')
	})
	.strict()

export const searchBarTokenSchema = z
	.object({
		id: z.string().min(1),
		label: z.string().min(1),
		tone: commandItemToneSchema.default('default')
	})
	.strict()

export const messageSchema = z
	.object({
		author: z.string().min(1).optional(),
		id: z.string().min(1),
		meta: z.string().min(1).optional(),
		role: messageRoleSchema.default('assistant'),
		status: messageStatusSchema.default('complete'),
		surface: messageSurfaceSchema.default('bubble')
	})
	.strict()

export const reasoningStepSchema = z
	.object({
		detail: z.string().min(1).optional(),
		id: z.string().min(1),
		label: z.string().min(1),
		status: messageStatusSchema.default('complete')
	})
	.strict()

export const toolCallSchema = z
	.object({
		duration: z.string().min(1).optional(),
		id: z.string().min(1),
		name: z.string().min(1),
		status: toolCallStatusSchema.default('queued')
	})
	.strict()

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
		title: z.string().min(1),
		variant: formShellVariantSchema.default('panel')
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

export type CommandItem = z.infer<typeof commandItemSchema>
export type CommandItemTone = z.infer<typeof commandItemToneSchema>
export type ComposerAttachment = z.infer<typeof composerAttachmentSchema>
export type ComposerConfig = z.infer<typeof composerConfigSchema>
export type ComposerFormat = z.infer<typeof composerFormatSchema>
export type ComposerSuggestion = z.infer<typeof composerSuggestionSchema>
export type ComposerSuggestionKind = z.infer<typeof composerSuggestionKindSchema>
export type ComposerToken = z.infer<typeof composerTokenSchema>
export type ComposerValue = z.infer<typeof composerValueSchema>
export type ConcretePressure = z.infer<typeof concretePressureSchema>
export type ConcreteRenderKind = z.infer<typeof concreteRenderKindSchema>
export type ConcreteSignal = z.infer<typeof concreteSignalSchema>
export type ConcreteViewport = z.infer<typeof concreteViewportSchema>
export type DateRangeValue = z.infer<typeof dateRangeValueSchema>
export type DateValue = z.infer<typeof dateValueSchema>
export type FieldStatus = z.infer<typeof fieldStatusSchema>
export type FormGridColumnCount = z.infer<typeof formGridColumnsSchema>
export type FormOverlayPresentation = z.infer<typeof formOverlayPresentationSchema>
export type FormSectionConfig = z.infer<typeof formSectionConfigSchema>
export type FormShellConfig = z.infer<typeof formShellConfigSchema>
export type FormShellVariantValue = z.infer<typeof formShellVariantSchema>
export type FormValidationItem = z.infer<typeof formValidationItemSchema>
export type MessageShape = z.infer<typeof messageSchema>
export type MessageRole = z.infer<typeof messageRoleSchema>
export type MessageSurface = z.infer<typeof messageSurfaceSchema>
export type MessageStatus = z.infer<typeof messageStatusSchema>
export type MultiSelectOption = z.input<typeof multiSelectOptionSchema>
export type PrimitiveCategory = z.infer<typeof primitiveCategorySchema>
export type PrimitivePropShape = z.infer<typeof primitivePropSchema>
export type PrimitiveStateShape = z.infer<typeof primitiveStateSchema>
export type ReasoningStep = z.infer<typeof reasoningStepSchema>
export type RegistryEntryShape = z.infer<typeof registryEntrySchema>
export type RenderQuery = z.infer<typeof renderQuerySchema>
export type SearchBarToken = z.infer<typeof searchBarTokenSchema>
export type SettingsPanelRowShape = z.infer<typeof settingsPanelRowSchema>
export type SettingsPanelSectionShape = z.infer<typeof settingsPanelSectionSchema>
export type TimeValue = z.infer<typeof timeValueSchema>
export type ToolCall = z.infer<typeof toolCallSchema>
export type ToolCallStatus = z.infer<typeof toolCallStatusSchema>
export type UploadItemValue = z.infer<typeof uploadItemSchema>
export type UploadItemStatus = z.infer<typeof uploadItemStatusSchema>
