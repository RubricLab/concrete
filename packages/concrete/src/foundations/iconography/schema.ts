import { z } from 'zod/v4'

export const iconographyRoleSchema = z.enum([
	'action',
	'brand',
	'data',
	'editorial',
	'navigation',
	'status'
])

export const iconographyTokenSchema = z
	.object({
		description: z.string().min(1),
		name: z.string().min(1),
		role: iconographyRoleSchema
	})
	.strict()

export const iconographyFoundationSchema = z
	.object({
		tokens: z.array(iconographyTokenSchema).default([])
	})
	.strict()

export const iconographyTokens = [
	{ description: 'Command and toolbar actions.', name: 'command', role: 'action' },
	{
		description: 'Open, close, and directional navigation.',
		name: 'navigation',
		role: 'navigation'
	},
	{
		description: 'Validation, completion, and lifecycle punctuation.',
		name: 'status',
		role: 'status'
	},
	{
		description: 'Data legends, trend marks, and generated-output glyphs.',
		name: 'data',
		role: 'data'
	},
	{ description: 'Rubric and Concrete identity marks.', name: 'brand', role: 'brand' },
	{ description: 'Educational and editorial concept glyphs.', name: 'concept', role: 'editorial' }
] as const

export const iconographyStrokePolicy = {
	cap: 'round',
	join: 'round',
	width: '1.75'
} as const

export type IconographyFoundationInput = z.input<typeof iconographyFoundationSchema>
export type IconographyFoundationValue = z.output<typeof iconographyFoundationSchema>
export type IconographyRole = z.infer<typeof iconographyRoleSchema>
export type IconographyToken = z.output<typeof iconographyTokenSchema>
