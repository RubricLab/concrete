import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const navItemSchema = z
	.object({
		current: z.boolean().default(false),
		external: z.boolean().default(false),
		href: z.string().default('#'),
		id: z.string().min(1),
		label: z.string().min(1)
	})
	.strict()

export const navComponentSchema = z
	.object({
		actions: z.array(navItemSchema).default([]),
		activeId: z.string().optional(),
		brandHref: z.string().default('/'),
		brandLabel: z.string().default('Concrete'),
		density: densitySchema.default('compact'),
		items: z.array(navItemSchema).default([
			{
				current: false,
				external: false,
				href: '/foundations',
				id: 'foundations',
				label: 'Foundations'
			},
			{
				current: false,
				external: false,
				href: '/primitives',
				id: 'primitives',
				label: 'Primitives'
			},
			{
				current: false,
				external: false,
				href: '/components',
				id: 'components',
				label: 'Components'
			}
		]),
		label: z.string().default('Primary')
	})
	.strict()

export type NavComponentInput = z.input<typeof navComponentSchema>
export type NavComponentValue = z.output<typeof navComponentSchema>
export type NavItemValue = z.output<typeof navItemSchema>
