import { z } from 'zod/v4'

export const textureSchema = z
	.object({
		texture: z.enum(['lattice', 'dots', 'lines']).default('lattice')
	})
	.strict()

export { textureSchema as texturePropsSchema }
export type TextureInput = z.input<typeof textureSchema>
export type TextureValue = z.output<typeof textureSchema>
