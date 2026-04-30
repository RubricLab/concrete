import type { HTMLAttributes } from 'react'
import { concreteClassNames, getConcreteClassName } from '../../styles/class-names'
import { cn } from '../utils'

const textureVariantValues = ['lattice', 'dots', 'lines', 'depth'] as const

export type TextureVariant = (typeof textureVariantValues)[number]

export type TextureProps = HTMLAttributes<HTMLDivElement> & {
	variant?: TextureVariant
}

const textureClassNames = {
	depth: getConcreteClassName('depth'),
	dots: getConcreteClassName('dots'),
	lattice: getConcreteClassName('lattice'),
	lines: getConcreteClassName('lines')
} satisfies Record<TextureVariant, string>

export function Texture({ className, variant = 'lattice', ...props }: TextureProps) {
	return <div className={cn(getTextureClass(variant), className)} {...props} />
}

export function TexturePreview({ className, variant = 'lattice', ...props }: TextureProps) {
	return (
		<Texture
			className={cn(concreteClassNames.texturePreview, className)}
			variant={variant}
			{...props}
		/>
	)
}

export function getTextureClass(texture: TextureVariant): string {
	return textureClassNames[texture]
}
