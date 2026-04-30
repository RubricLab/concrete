import { z } from 'zod/v4'

export const typographyTokenSchema = z
	.object({
		family: z.string().min(1),
		name: z.string().min(1),
		size: z.string().min(1)
	})
	.strict()

export const typographyFoundationSchema = z
	.object({
		tokens: z.array(typographyTokenSchema).default([])
	})
	.strict()

export const typographyTokens = [
	{ family: 'display', name: 'display', size: '120px' },
	{ family: 'display', name: 'hero', size: '72px' },
	{ family: 'sans', name: 'h1', size: '48px' },
	{ family: 'sans', name: 'h2', size: '32px' },
	{ family: 'sans', name: 'h3', size: '20px' },
	{ family: 'sans', name: 'article', size: '17px' },
	{ family: 'sans', name: 'body', size: '15px' },
	{ family: 'sans', name: 'label', size: '13px' },
	{ family: 'sans', name: 'caps', size: '11px' },
	{ family: 'mono', name: 'mono', size: '13px' }
] as const

export type TypographyFoundationInput = z.input<typeof typographyFoundationSchema>
export type TypographyFoundationValue = z.output<typeof typographyFoundationSchema>
export type TypographyToken = z.output<typeof typographyTokenSchema>
