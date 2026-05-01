import { z } from 'zod/v4'

export const elevationTokenSchema = z
	.object({
		name: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const elevationFoundationSchema = z
	.object({
		tokens: z.array(elevationTokenSchema).default([])
	})
	.strict()

export const elevationTokens = [
	{ name: 'hairline', value: 'none' },
	{ name: 'shadow-1', value: 'var(--concrete-shadow-1)' },
	{ name: 'shadow-2', value: 'var(--concrete-shadow-2)' },
	{ name: 'shadow-3', value: 'var(--concrete-shadow-3)' },
	{ name: 'shadow-4', value: 'var(--concrete-shadow-4)' },
	{ name: 'control-rest', value: 'var(--concrete-shadow-control-rest)' },
	{ name: 'control-hover', value: 'var(--concrete-shadow-control-hover)' },
	{ name: 'control-focus', value: 'var(--concrete-shadow-control-focus)' },
	{ name: 'control-error', value: 'var(--concrete-shadow-control-error)' },
	{ name: 'control-selected', value: 'var(--concrete-shadow-control-selected)' },
	{ name: 'control-selected-soft', value: 'var(--concrete-shadow-control-selected-soft)' },
	{ name: 'surface-rest', value: 'var(--concrete-shadow-surface-rest)' },
	{ name: 'surface-raised', value: 'var(--concrete-shadow-surface-raised)' },
	{ name: 'surface-hover', value: 'var(--concrete-shadow-surface-hover)' },
	{ name: 'surface-selected', value: 'var(--concrete-shadow-surface-selected)' },
	{ name: 'feedback', value: 'var(--concrete-shadow-feedback)' },
	{ name: 'data', value: 'var(--concrete-shadow-data)' }
] as const

export type ElevationFoundationInput = z.input<typeof elevationFoundationSchema>
export type ElevationFoundationValue = z.output<typeof elevationFoundationSchema>
export type ElevationToken = z.output<typeof elevationTokenSchema>
