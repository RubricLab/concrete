import { z } from 'zod/v4'
import {
	commandItemToneSchema,
	messageStatusSchema,
	toolCallStatusSchema
} from '../foundations/state/schema'

export const composerFormatSchema = z.enum(['bold', 'italic', 'underline', 'strikethrough'])
export const composerSuggestionKindSchema = z.enum(['command', 'mention'])
export const messageRoleSchema = z.enum(['assistant', 'system', 'tool', 'user'])
export const messageSurfaceSchema = z.enum(['bubble', 'plain'])

export { commandItemToneSchema, messageStatusSchema, toolCallStatusSchema }

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

export type CommandItem = z.infer<typeof commandItemSchema>
export type CommandItemTone = z.infer<typeof commandItemToneSchema>
export type ComposerAttachment = z.infer<typeof composerAttachmentSchema>
export type ComposerConfig = z.infer<typeof composerConfigSchema>
export type ComposerFormat = z.infer<typeof composerFormatSchema>
export type ComposerSuggestion = z.infer<typeof composerSuggestionSchema>
export type ComposerSuggestionKind = z.infer<typeof composerSuggestionKindSchema>
export type ComposerToken = z.infer<typeof composerTokenSchema>
export type ComposerValue = z.infer<typeof composerValueSchema>
export type MessageShape = z.infer<typeof messageSchema>
export type MessageRole = z.infer<typeof messageRoleSchema>
export type MessageSurface = z.infer<typeof messageSurfaceSchema>
export type MessageStatus = z.infer<typeof messageStatusSchema>
export type ReasoningStep = z.infer<typeof reasoningStepSchema>
export type SearchBarToken = z.infer<typeof searchBarTokenSchema>
export type ToolCall = z.infer<typeof toolCallSchema>
export type ToolCallStatus = z.infer<typeof toolCallStatusSchema>
