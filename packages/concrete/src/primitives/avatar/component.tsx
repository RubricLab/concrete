import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type AvatarSize = 'large' | 'medium' | 'small'

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
	alt?: string
	initials?: string
	size?: AvatarSize
	src?: string
}

export function Avatar({
	alt = '',
	className,
	initials = 'C',
	size = 'medium',
	src,
	...props
}: AvatarProps) {
	return (
		<span className={cn(concreteClassNames.avatar, getAvatarSizeClass(size), className)} {...props}>
			{src ? <img alt={alt} height="100%" src={src} width="100%" /> : initials}
		</span>
	)
}

function getAvatarSizeClass(size: AvatarSize): string | undefined {
	switch (size) {
		case 'large':
			return concreteClassNames.avatarLarge
		case 'medium':
			return undefined
		case 'small':
			return concreteClassNames.avatarSmall
	}
}
