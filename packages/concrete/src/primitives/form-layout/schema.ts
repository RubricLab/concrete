import { z } from 'zod/v4'

export const formLayoutShellVariantValues = ['panel', 'modal', 'drawer'] as const
export const formLayoutStatusValues = ['default', 'error', 'success'] as const

export const formLayoutSchema = z
	.object({
		columns: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(2),
		compact: z.boolean().default(false),
		status: z.enum(formLayoutStatusValues).default('default'),
		variant: z.enum(formLayoutShellVariantValues).default('panel')
	})
	.strict()

export { formLayoutSchema as formLayoutPropsSchema }
export type FormLayoutInput = z.input<typeof formLayoutSchema>
export type FormLayoutValue = z.output<typeof formLayoutSchema>
