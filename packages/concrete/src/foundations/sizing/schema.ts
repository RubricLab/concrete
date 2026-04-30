import { z } from 'zod/v4'

export const sizingTokenKindSchema = z.enum([
	'avatar',
	'control',
	'data',
	'diagram',
	'icon',
	'measure',
	'media',
	'track',
	'viewport'
])

export const sizingTokenSchema = z
	.object({
		kind: sizingTokenKindSchema,
		name: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const sizingFoundationSchema = z
	.object({
		tokens: z.array(sizingTokenSchema).default([])
	})
	.strict()

export const sizingTokens = [
	{ kind: 'control', name: 'field-control', value: 'var(--concrete-size-field-control)' },
	{ kind: 'control', name: 'button-medium', value: 'var(--concrete-size-button-medium)' },
	{ kind: 'control', name: 'toolbar-control', value: 'var(--concrete-size-toolbar-control)' },
	{ kind: 'icon', name: 'icon-medium', value: 'var(--concrete-size-icon-medium)' },
	{ kind: 'avatar', name: 'avatar-medium', value: 'var(--concrete-size-avatar-medium)' },
	{ kind: 'track', name: 'progress-track', value: 'var(--concrete-size-progress-track)' },
	{ kind: 'track', name: 'slider-hit', value: 'var(--concrete-size-slider-hit)' },
	{ kind: 'measure', name: 'form-dialog', value: 'var(--concrete-measure-form-dialog)' },
	{ kind: 'measure', name: 'agent-panel', value: 'var(--concrete-measure-agent-panel)' },
	{ kind: 'viewport', name: 'diagram-canvas', value: 'var(--concrete-size-diagram-canvas-height)' },
	{ kind: 'data', name: 'chart-height', value: 'var(--concrete-size-chart-height)' },
	{ kind: 'media', name: 'thumbnail', value: 'var(--concrete-size-upload-thumb)' }
] as const

export type SizingFoundationInput = z.input<typeof sizingFoundationSchema>
export type SizingFoundationValue = z.output<typeof sizingFoundationSchema>
export type SizingToken = z.output<typeof sizingTokenSchema>
