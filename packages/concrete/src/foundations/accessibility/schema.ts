import { z } from 'zod/v4'

export const accessibilityTokenKindSchema = z.enum([
	'focus',
	'forced-colors',
	'hit-target',
	'reduced-motion',
	'visually-hidden'
])

export const accessibilityTokenSchema = z
	.object({
		description: z.string().min(1),
		kind: accessibilityTokenKindSchema,
		name: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const accessibilityFoundationSchema = z
	.object({
		tokens: z.array(accessibilityTokenSchema).default([])
	})
	.strict()

export const accessibilityTokens = [
	{
		description: 'Utility class for content that should stay available to assistive technology.',
		kind: 'visually-hidden',
		name: 'visually-hidden',
		value: '.concrete-visually-hidden'
	},
	{
		description: 'Shared focus target geometry and ring language consumed by primitives.',
		kind: 'focus',
		name: 'focus-target',
		value: '.concrete-focus-target'
	},
	{
		description: 'Interactive controls must preserve a scannable touch/click target.',
		kind: 'hit-target',
		name: 'hit-target',
		value: 'foundation sizing tokens'
	},
	{
		description: 'Motion tokens and primitives must respect reduced-motion behavior.',
		kind: 'reduced-motion',
		name: 'reduced-motion',
		value: 'prefers-reduced-motion'
	},
	{
		description: 'Color and border choices should remain visible in forced-colors environments.',
		kind: 'forced-colors',
		name: 'forced-colors',
		value: 'system color compatible'
	}
] as const

export type AccessibilityFoundationInput = z.input<typeof accessibilityFoundationSchema>
export type AccessibilityFoundationValue = z.output<typeof accessibilityFoundationSchema>
export type AccessibilityToken = z.output<typeof accessibilityTokenSchema>
