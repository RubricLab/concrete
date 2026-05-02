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
	{ kind: 'control', name: 'control-compact', value: 'var(--concrete-size-control-compact)' },
	{ kind: 'control', name: 'control', value: 'var(--concrete-size-control)' },
	{
		kind: 'control',
		name: 'control-comfortable',
		value: 'var(--concrete-size-control-comfortable)'
	},
	{ kind: 'control', name: 'control-leading', value: 'var(--concrete-size-control-leading)' },
	{ kind: 'control', name: 'control-action', value: 'var(--concrete-size-control-action)' },
	{ kind: 'control', name: 'button-medium', value: 'var(--concrete-size-button-medium)' },
	{
		kind: 'control',
		name: 'control-strip-action',
		value: 'var(--concrete-size-control-strip-action)'
	},
	{
		kind: 'measure',
		name: 'surface-padding-compact',
		value: 'var(--concrete-size-surface-padding-compact)'
	},
	{ kind: 'measure', name: 'surface-padding', value: 'var(--concrete-size-surface-padding)' },
	{
		kind: 'measure',
		name: 'surface-padding-editorial',
		value: 'var(--concrete-size-surface-padding-editorial)'
	},
	{ kind: 'measure', name: 'feedback-padding', value: 'var(--concrete-size-feedback-padding)' },
	{
		kind: 'measure',
		name: 'data-surface-padding',
		value: 'var(--concrete-size-data-surface-padding)'
	},
	{
		kind: 'measure',
		name: 'data-surface-padding-compact',
		value: 'var(--concrete-size-data-surface-padding-compact)'
	},
	{ kind: 'measure', name: 'layout-grid-min', value: 'var(--concrete-size-layout-grid-min)' },
	{ kind: 'measure', name: 'layout-sidebar', value: 'var(--concrete-measure-layout-sidebar)' },
	{ kind: 'measure', name: 'container-content', value: 'var(--concrete-measure-container-content)' },
	{ kind: 'measure', name: 'container-wide', value: 'var(--concrete-measure-container-wide)' },
	{
		kind: 'viewport',
		name: 'scroll-area-medium',
		value: 'var(--concrete-size-scroll-area-medium)'
	},
	{ kind: 'icon', name: 'icon-medium', value: 'var(--concrete-size-icon-medium)' },
	{ kind: 'icon', name: 'spinner-compact', value: 'var(--concrete-size-spinner-compact)' },
	{
		kind: 'icon',
		name: 'spinner-comfortable',
		value: 'var(--concrete-size-spinner-comfortable)'
	},
	{ kind: 'icon', name: 'spinner-editorial', value: 'var(--concrete-size-spinner-editorial)' },
	{ kind: 'avatar', name: 'avatar-medium', value: 'var(--concrete-size-avatar-medium)' },
	{ kind: 'track', name: 'progress-track', value: 'var(--concrete-size-progress-track)' },
	{
		kind: 'track',
		name: 'progress-ring-compact',
		value: 'var(--concrete-size-progress-ring-compact)'
	},
	{ kind: 'track', name: 'progress-ring', value: 'var(--concrete-size-progress-ring)' },
	{
		kind: 'track',
		name: 'progress-ring-editorial',
		value: 'var(--concrete-size-progress-ring-editorial)'
	},
	{ kind: 'track', name: 'slider-hit', value: 'var(--concrete-size-slider-hit)' },
	{ kind: 'measure', name: 'dialog-surface', value: 'var(--concrete-measure-dialog-surface)' },
	{ kind: 'measure', name: 'trace-panel', value: 'var(--concrete-measure-trace-panel)' },
	{ kind: 'viewport', name: 'diagram', value: 'var(--concrete-size-diagram-height)' },
	{ kind: 'data', name: 'chart-height', value: 'var(--concrete-size-chart-height)' },
	{ kind: 'media', name: 'thumbnail', value: 'var(--concrete-size-media-thumb)' },
	{ kind: 'media', name: 'media-field', value: 'var(--concrete-measure-media-field)' }
] as const

export type SizingFoundationInput = z.input<typeof sizingFoundationSchema>
export type SizingFoundationValue = z.output<typeof sizingFoundationSchema>
export type SizingToken = z.output<typeof sizingTokenSchema>
