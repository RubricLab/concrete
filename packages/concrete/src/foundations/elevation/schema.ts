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
	{ name: 'shadow-4', value: 'var(--concrete-shadow-4)' }
] as const

export type ElevationFoundationInput = z.input<typeof elevationFoundationSchema>
export type ElevationFoundationValue = z.output<typeof elevationFoundationSchema>
export type ElevationToken = z.output<typeof elevationTokenSchema>
