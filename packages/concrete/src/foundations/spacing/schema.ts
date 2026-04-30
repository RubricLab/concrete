import { z } from 'zod/v4'

export const spacingTokenSchema = z
	.object({
		name: z.string().min(1),
		value: z.number().int().positive()
	})
	.strict()

export const spacingFoundationSchema = z
	.object({
		tokens: z.array(spacingTokenSchema).default([])
	})
	.strict()

export const spacingTokens = [
	{ name: 'space-1', value: 4 },
	{ name: 'space-2', value: 8 },
	{ name: 'space-3', value: 12 },
	{ name: 'space-4', value: 16 },
	{ name: 'space-5', value: 20 },
	{ name: 'space-6', value: 24 },
	{ name: 'space-8', value: 32 },
	{ name: 'space-10', value: 40 },
	{ name: 'space-12', value: 48 },
	{ name: 'space-16', value: 64 },
	{ name: 'space-20', value: 80 },
	{ name: 'space-24', value: 96 },
	{ name: 'space-32', value: 128 },
	{ name: 'space-40', value: 160 },
	{ name: 'space-48', value: 192 }
] as const

export type SpacingFoundationInput = z.input<typeof spacingFoundationSchema>
export type SpacingFoundationValue = z.output<typeof spacingFoundationSchema>
export type SpacingToken = z.output<typeof spacingTokenSchema>
