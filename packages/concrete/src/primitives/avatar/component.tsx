import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type AvatarDensity = 'compact' | 'comfortable' | 'editorial'

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
	alt?: string
	density?: AvatarDensity
	initials?: string
	src?: string
}

export function Avatar({
	alt = '',
	className,
	density = 'comfortable',
	initials = 'C',
	src,
	...props
}: AvatarProps) {
	return (
		<span
			className={cn(concreteClassNames.avatar, getAvatarDensityClass(density), className)}
			data-density={density}
			{...props}
		>
			{src ? <img alt={alt} src={src} /> : initials}
		</span>
	)
}

function getAvatarDensityClass(density: AvatarDensity): string | undefined {
	switch (density) {
		case 'editorial':
			return concreteClassNames.avatarLarge
		case 'comfortable':
			return undefined
		case 'compact':
			return concreteClassNames.avatarSmall
	}
}
