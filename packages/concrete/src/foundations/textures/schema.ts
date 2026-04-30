import { z } from 'zod/v4'

export const textureFoundationSchema = z
	.object({
		variant: z.enum(['dots', 'lattice', 'lines', 'depth']).default('lattice')
	})
	.strict()

export const textureTokens = ['lattice', 'dots', 'lines', 'depth'] as const

export type TextureFoundationInput = z.input<typeof textureFoundationSchema>
export type TextureFoundationValue = z.output<typeof textureFoundationSchema>
export type TextureToken = (typeof textureTokens)[number]
