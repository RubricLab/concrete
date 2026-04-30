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
	{ kind: 'template', name: 'field-row', value: 'var(--concrete-template-field-row)' },
	{ kind: 'template', name: 'layout-split', value: 'var(--concrete-template-layout-split)' },
	{
		kind: 'template',
		name: 'layout-split-even',
		value: 'var(--concrete-template-layout-split-even)'
	},
	{
		kind: 'template',
		name: 'layout-split-sidebar',
		value: 'var(--concrete-template-layout-split-sidebar)'
	},
	{ kind: 'template', name: 'picker-button', value: 'var(--concrete-template-picker-button)' },
	{ kind: 'template', name: 'calendar-grid', value: 'var(--concrete-template-calendar-days)' },
	{ kind: 'template', name: 'distribution-row', value: 'var(--concrete-template-distribution-row)' },
	{ kind: 'template', name: 'heatmap-grid', value: 'var(--concrete-template-heatmap-grid)' },
	{ kind: 'grid', name: 'track-fill', value: 'var(--concrete-grid-track-fill)' },
	{ kind: 'grid', name: 'track-sidebar', value: 'var(--concrete-grid-track-sidebar)' },
	{ kind: 'grid', name: 'column-full', value: 'var(--concrete-grid-column-full)' },
	{ kind: 'layer', name: 'tooltip', value: 'var(--concrete-z-tooltip)' },
	{ kind: 'layer', name: 'overlay', value: 'var(--concrete-z-overlay)' },
	{ kind: 'offset', name: 'tooltip-gap', value: 'var(--concrete-offset-tooltip-gap)' },
	{ kind: 'responsive', name: 'search-input-wrap', value: 'var(--concrete-search-input-flex-wrap)' },
	{ kind: 'utility', name: 'flex-fill', value: 'var(--concrete-flex-fill)' }
] as const

export type LayoutFoundationInput = z.input<typeof layoutFoundationSchema>
export type LayoutFoundationValue = z.output<typeof layoutFoundationSchema>
export type LayoutToken = z.output<typeof layoutTokenSchema>
