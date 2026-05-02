import { z } from 'zod/v4'

export const stateSignalValues = ['terminal', 'ultra', 'error'] as const
export const dataToneValues = ['ink', 'muted', 'sky', 'terminal', 'ultra', 'error'] as const
export const commandItemIntentValues = ['default', 'error', 'sky', 'terminal', 'ultra'] as const
export const fieldStatusValues = ['default', 'error', 'success'] as const
export const uploadItemStatusValues = ['error', 'idle', 'success', 'uploading'] as const
export const dataComponentStateValues = ['ready', 'loading', 'empty', 'error'] as const
export const dataDeltaIntentValues = ['negative', 'neutral', 'positive'] as const
export const messageStatusValues = ['complete', 'error', 'pending', 'streaming'] as const
export const toolCallStatusValues = ['error', 'queued', 'running', 'success'] as const
export const hierarchyValues = ['primary', 'secondary', 'tertiary', 'ghost'] as const
export const densityValues = ['compact', 'comfortable', 'editorial'] as const

export const stateSignalSchema = z.enum(stateSignalValues)
export const dataToneSchema = z.enum(dataToneValues)
export const commandItemIntentSchema = z.enum(commandItemIntentValues)
export const fieldStatusSchema = z.enum(fieldStatusValues)
export const uploadItemStatusSchema = z.enum(uploadItemStatusValues)
export const dataComponentStateSchema = z.enum(dataComponentStateValues)
export const dataDeltaIntentSchema = z.enum(dataDeltaIntentValues)
export const messageStatusSchema = z.enum(messageStatusValues)
export const toolCallStatusSchema = z.enum(toolCallStatusValues)
export const hierarchySchema = z.enum(hierarchyValues)
export const densitySchema = z.enum(densityValues)

export const stateTokenKindSchema = z.enum(['density', 'hierarchy', 'intent', 'status', 'tone'])

export const stateTokenSchema = z
	.object({
		description: z.string().min(1),
		kind: stateTokenKindSchema,
		name: z.string().min(1),
		values: z.array(z.string().min(1)).min(1)
	})
	.strict()

export const stateFoundationSchema = z
	.object({
		tokens: z.array(stateTokenSchema).default([])
	})
	.strict()

export const stateTokens = [
	{
		description: 'The three high-signal Concrete channels used for status and intent.',
		kind: 'tone',
		name: 'signals',
		values: stateSignalValues
	},
	{
		description: 'Shared data and diagram tone language for generated output and dense tables.',
		kind: 'tone',
		name: 'data-tones',
		values: dataToneValues
	},
	{
		description: 'Command and token intent language for compact interactive lists.',
		kind: 'intent',
		name: 'command-intents',
		values: commandItemIntentValues
	},
	{
		description: 'Field-level validation state used by forms, settings rows, and summaries.',
		kind: 'status',
		name: 'field-status',
		values: fieldStatusValues
	},
	{
		description: 'Lifecycle state for uploaded file and media rows.',
		kind: 'status',
		name: 'upload-status',
		values: uploadItemStatusValues
	},
	{
		description: 'Data-rendering state shared by tables, charts, metrics, and generated panels.',
		kind: 'status',
		name: 'data-component-state',
		values: dataComponentStateValues
	},
	{
		description:
			'Agent message stream state shared by transcript, reasoning, and tool-call surfaces.',
		kind: 'status',
		name: 'message-status',
		values: messageStatusValues
	},
	{
		description: 'Tool execution lifecycle state used by tool-call displays.',
		kind: 'status',
		name: 'tool-call-status',
		values: toolCallStatusValues
	},
	{
		description: 'Interface hierarchy language for command priority without visual override props.',
		kind: 'hierarchy',
		name: 'hierarchy',
		values: hierarchyValues
	},
	{
		description: 'Composition density language for compact product and lower-density reading modes.',
		kind: 'density',
		name: 'density',
		values: densityValues
	}
] as const

export type CommandItemIntent = z.infer<typeof commandItemIntentSchema>
export type DataComponentState = z.infer<typeof dataComponentStateSchema>
export type DataDeltaIntent = z.infer<typeof dataDeltaIntentSchema>
export type DataTone = z.infer<typeof dataToneSchema>
export type Density = z.infer<typeof densitySchema>
export type FieldStatus = z.infer<typeof fieldStatusSchema>
export type Hierarchy = z.infer<typeof hierarchySchema>
export type MessageStatus = z.infer<typeof messageStatusSchema>
export type StateFoundationInput = z.input<typeof stateFoundationSchema>
export type StateFoundationValue = z.output<typeof stateFoundationSchema>
export type StateSignal = z.infer<typeof stateSignalSchema>
export type StateToken = z.output<typeof stateTokenSchema>
export type ToolCallStatus = z.infer<typeof toolCallStatusSchema>
export type UploadItemStatus = z.infer<typeof uploadItemStatusSchema>
