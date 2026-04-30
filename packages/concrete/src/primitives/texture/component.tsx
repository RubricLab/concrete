import type { HTMLAttributes } from 'react'
import { getConcreteClassName } from '../../styles/class-names'
import { cn } from '../utils'

const textureVariantValues = ['lattice', 'dots', 'lines'] as const

export type TextureVariant = (typeof textureVariantValues)[number]

export type TextureProps = HTMLAttributes<HTMLDivElement> & {
	variant?: TextureVariant
}

const textureClassNames = {
	dots: getConcreteClassName('dots'),
	lattice: getConcreteClassName('lattice'),
	lines: getConcreteClassName('lines')
} satisfies Record<TextureVariant, string>

export function Texture({ className, variant = 'lattice', ...props }: TextureProps) {
	return <div className={cn(getTextureClass(variant), className)} {...props} />
}

export function getTextureClass(texture: TextureVariant): string {
	return textureClassNames[texture]
}
