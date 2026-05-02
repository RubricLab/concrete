import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const footerLinkSchema = z
	.object({
		external: z.boolean().default(false),
		href: z.string().default('#'),
		id: z.string().min(1),
		label: z.string().min(1)
	})
	.strict()

export const footerColumnSchema = z
	.object({
		id: z.string().min(1),
		links: z.array(footerLinkSchema).default([]),
		title: z.string().min(1)
	})
	.strict()

export const footerComponentSchema = z
	.object({
		actions: z.array(footerLinkSchema).default([]),
		asideCode: z.string().optional(),
		brandLabel: z.string().default('Concrete'),
		columns: z.array(footerColumnSchema).default([]),
		density: densitySchema.default('compact'),
		description: z.string().default('Dense primitives, compact components, calm docs.'),
		meta: z.string().optional(),
		title: z.string().default('Concrete for AI-native software.')
	})
	.strict()

export type FooterColumnValue = z.output<typeof footerColumnSchema>
export type FooterComponentInput = z.input<typeof footerComponentSchema>
export type FooterComponentValue = z.output<typeof footerComponentSchema>
export type FooterLinkValue = z.output<typeof footerLinkSchema>
