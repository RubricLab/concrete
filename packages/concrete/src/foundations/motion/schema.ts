import { z } from 'zod/v4'

export const motionTokenSchema = z
	.object({
		name: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const motionFoundationSchema = z
	.object({
		tokens: z.array(motionTokenSchema).default([])
	})
	.strict()

export const motionTokens = [
	{ name: 'duration-fast', value: '120ms' },
	{ name: 'duration', value: '180ms' },
	{ name: 'ease', value: 'cubic-bezier(0.2, 0, 0, 1)' }
] as const

export type MotionFoundationInput = z.input<typeof motionFoundationSchema>
export type MotionFoundationValue = z.output<typeof motionFoundationSchema>
export type MotionToken = z.output<typeof motionTokenSchema>
