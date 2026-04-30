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
