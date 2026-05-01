import { z } from 'zod/v4'

export const colorTokenSchema = z
	.object({
		hex: z.string().min(1).optional(),
		name: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const colorFoundationSchema = z
	.object({
		tokens: z.array(colorTokenSchema).default([])
	})
	.strict()

export const colorTokens = [
	{ hex: '#F7F8FA', name: 'canvas', value: 'var(--concrete-canvas)' },
	{ hex: '#FFFFFF', name: 'surface', value: 'var(--concrete-surface)' },
	{ hex: '#FCFCFD', name: 'raised', value: 'var(--concrete-raised)' },
	{ hex: '#F1F2F5', name: 'sunken', value: 'var(--concrete-sunken)' },
	{ hex: '#EAECF0', name: 'mist', value: 'var(--concrete-mist)' },
	{ hex: '#0A0B0F', name: 'ink-9', value: 'var(--concrete-ink-9)' },
	{ hex: '#16171C', name: 'ink-8', value: 'var(--concrete-ink-8)' },
	{ hex: '#22242B', name: 'ink-7', value: 'var(--concrete-ink-7)' },
	{ hex: '#3A3C45', name: 'ink-6', value: 'var(--concrete-ink-6)' },
	{ hex: '#5A5D68', name: 'ink-5', value: 'var(--concrete-ink-5)' },
	{ hex: '#878A95', name: 'ink-4', value: 'var(--concrete-ink-4)' },
	{ hex: '#B4B7C0', name: 'ink-3', value: 'var(--concrete-ink-3)' },
	{ hex: '#D7D9E0', name: 'ink-2', value: 'var(--concrete-ink-2)' },
	{ hex: '#E8EAEE', name: 'ink-1', value: 'var(--concrete-ink-1)' },
	{ name: 'control-background', value: 'var(--concrete-control-background)' },
	{ name: 'control-background-hover', value: 'var(--concrete-control-background-hover)' },
	{ name: 'control-background-active', value: 'var(--concrete-control-background-active)' },
	{ name: 'control-background-disabled', value: 'var(--concrete-control-background-disabled)' },
	{ name: 'control-background-selected', value: 'var(--concrete-control-background-selected)' },
	{
		name: 'control-background-selected-soft',
		value: 'var(--concrete-control-background-selected-soft)'
	},
	{ name: 'control-border', value: 'var(--concrete-control-border)' },
	{ name: 'control-border-hover', value: 'var(--concrete-control-border-hover)' },
	{ name: 'control-border-focus', value: 'var(--concrete-control-border-focus)' },
	{ name: 'control-border-error', value: 'var(--concrete-control-border-error)' },
	{ name: 'control-border-selected', value: 'var(--concrete-control-border-selected)' },
	{ name: 'control-border-selected-soft', value: 'var(--concrete-control-border-selected-soft)' },
	{ name: 'control-foreground', value: 'var(--concrete-control-foreground)' },
	{ name: 'control-foreground-body', value: 'var(--concrete-control-foreground-body)' },
	{ name: 'control-foreground-muted', value: 'var(--concrete-control-foreground-muted)' },
	{ name: 'control-foreground-soft', value: 'var(--concrete-control-foreground-soft)' },
	{ name: 'control-foreground-selected', value: 'var(--concrete-control-foreground-selected)' },
	{
		name: 'control-foreground-selected-soft',
		value: 'var(--concrete-control-foreground-selected-soft)'
	},
	{ name: 'control-placeholder', value: 'var(--concrete-control-placeholder)' },
	{ name: 'control-icon', value: 'var(--concrete-control-icon)' },
	{ name: 'surface-background', value: 'var(--concrete-surface-background)' },
	{
		name: 'surface-background-muted',
		value: 'var(--concrete-surface-background-muted)'
	},
	{
		name: 'surface-background-hover',
		value: 'var(--concrete-surface-background-hover)'
	},
	{
		name: 'surface-background-raised',
		value: 'var(--concrete-surface-background-raised)'
	},
	{
		name: 'surface-background-sunken',
		value: 'var(--concrete-surface-background-sunken)'
	},
	{ name: 'surface-border', value: 'var(--concrete-surface-border)' },
	{ name: 'surface-border-soft', value: 'var(--concrete-surface-border-soft)' },
	{ name: 'surface-border-hover', value: 'var(--concrete-surface-border-hover)' },
	{ name: 'surface-foreground', value: 'var(--concrete-surface-foreground)' },
	{
		name: 'surface-foreground-strong',
		value: 'var(--concrete-surface-foreground-strong)'
	},
	{
		name: 'surface-foreground-muted',
		value: 'var(--concrete-surface-foreground-muted)'
	},
	{
		name: 'surface-foreground-soft',
		value: 'var(--concrete-surface-foreground-soft)'
	},
	{ name: 'feedback-background', value: 'var(--concrete-feedback-background)' },
	{ name: 'feedback-border', value: 'var(--concrete-feedback-border)' },
	{ name: 'feedback-icon-background', value: 'var(--concrete-feedback-icon-background)' },
	{ name: 'feedback-icon-foreground', value: 'var(--concrete-feedback-icon-foreground)' },
	{ name: 'feedback-error-background', value: 'var(--concrete-feedback-error-background)' },
	{ name: 'feedback-error-border', value: 'var(--concrete-feedback-error-border)' },
	{ name: 'feedback-error-foreground', value: 'var(--concrete-feedback-error-foreground)' },
	{ name: 'feedback-success-background', value: 'var(--concrete-feedback-success-background)' },
	{ name: 'feedback-success-border', value: 'var(--concrete-feedback-success-border)' },
	{
		name: 'feedback-success-foreground',
		value: 'var(--concrete-feedback-success-foreground)'
	},
	{ name: 'data-track-background', value: 'var(--concrete-data-track-background)' },
	{ name: 'data-fill', value: 'var(--concrete-data-fill)' },
	{ name: 'data-foreground', value: 'var(--concrete-data-foreground)' },
	{ name: 'data-foreground-muted', value: 'var(--concrete-data-foreground-muted)' },
	{ name: 'data-foreground-soft', value: 'var(--concrete-data-foreground-soft)' },
	{ name: 'data-positive', value: 'var(--concrete-data-positive)' },
	{ name: 'data-negative', value: 'var(--concrete-data-negative)' },
	{ name: 'data-neutral', value: 'var(--concrete-data-neutral)' },
	{ hex: '#EEF3FB', name: 'sky-1', value: 'var(--concrete-sky-1)' },
	{ hex: '#D9E6F8', name: 'sky-2', value: 'var(--concrete-sky-2)' },
	{ hex: '#A9C6EF', name: 'sky-3', value: 'var(--concrete-sky-3)' },
	{ hex: '#4E8BDE', name: 'sky-4', value: 'var(--concrete-sky-4)' },
	{ hex: '#1F6FD4', name: 'sky', value: 'var(--concrete-sky)' },
	{ hex: '#0F4E9E', name: 'sky-strong', value: 'var(--concrete-sky-strong)' },
	{ hex: '#16C46A', name: 'terminal', value: 'var(--concrete-terminal)' },
	{ hex: '#6B5BFF', name: 'ultra', value: 'var(--concrete-ultra)' },
	{ hex: '#F03A3A', name: 'error', value: 'var(--concrete-error)' }
] as const

export type ColorFoundationInput = z.input<typeof colorFoundationSchema>
export type ColorFoundationValue = z.output<typeof colorFoundationSchema>
export type ColorToken = z.output<typeof colorTokenSchema>
