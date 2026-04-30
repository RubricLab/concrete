import { z } from 'zod/v4'

export const radiusTokenSchema = z
	.object({
		name: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const radiiFoundationSchema = z
	.object({
		tokens: z.array(radiusTokenSchema).default([])
	})
	.strict()

export const radiusTokens = [
	{ name: 'radius-0', value: '0' },
	{ name: 'radius-2', value: '4px' },
	{ name: 'radius-3', value: '6px' },
	{ name: 'radius-4', value: '10px' },
	{ name: 'radius-5', value: '14px' },
	{ name: 'radius-6', value: '20px' },
	{ name: 'radius-pill', value: '9999px' }
] as const

export type RadiiFoundationInput = z.input<typeof radiiFoundationSchema>
export type RadiiFoundationValue = z.output<typeof radiiFoundationSchema>
export type RadiusToken = z.output<typeof radiusTokenSchema>
