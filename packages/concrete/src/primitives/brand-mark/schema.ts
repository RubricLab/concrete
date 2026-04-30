import { z } from 'zod/v4'

export const brandMarkSchema = z
	.object({
		inverse: z.boolean().default(false)
	})
	.strict()

export { brandMarkSchema as brandMarkPropsSchema }
export type BrandMarkInput = z.input<typeof brandMarkSchema>
export type BrandMarkValue = z.output<typeof brandMarkSchema>
