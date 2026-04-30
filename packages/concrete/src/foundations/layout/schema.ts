import { z } from 'zod/v4'

export const layoutTokenKindSchema = z.enum([
	'grid',
	'layer',
	'offset',
	'responsive',
	'template',
	'utility'
])

export const layoutTokenSchema = z
	.object({
		kind: layoutTokenKindSchema,
		name: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const layoutFoundationSchema = z
	.object({
		tokens: z.array(layoutTokenSchema).default([])
	})
	.strict()

export const layoutTokens = [
	{ kind: 'template', name: 'form-row', value: 'var(--concrete-template-form-row)' },
	{ kind: 'template', name: 'picker-control', value: 'var(--concrete-template-picker-control)' },
	{ kind: 'template', name: 'calendar-grid', value: 'var(--concrete-template-calendar-grid)' },
	{ kind: 'template', name: 'distribution-row', value: 'var(--concrete-template-distribution-row)' },
	{ kind: 'template', name: 'heatmap-grid', value: 'var(--concrete-template-heatmap-grid)' },
	{ kind: 'grid', name: 'track-fill', value: 'var(--concrete-grid-track-fill)' },
	{ kind: 'grid', name: 'column-full', value: 'var(--concrete-grid-column-full)' },
	{ kind: 'layer', name: 'tooltip', value: 'var(--concrete-z-tooltip)' },
	{ kind: 'layer', name: 'form-overlay', value: 'var(--concrete-z-form-overlay)' },
	{ kind: 'offset', name: 'tooltip-gap', value: 'var(--concrete-offset-tooltip-gap)' },
	{ kind: 'responsive', name: 'search-wrap', value: 'var(--concrete-search-bar-flex-wrap)' },
	{ kind: 'utility', name: 'flex-fill', value: 'var(--concrete-flex-fill)' }
] as const

export type LayoutFoundationInput = z.input<typeof layoutFoundationSchema>
export type LayoutFoundationValue = z.output<typeof layoutFoundationSchema>
export type LayoutToken = z.output<typeof layoutTokenSchema>
