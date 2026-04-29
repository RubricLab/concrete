import type { HTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

const avatarSizeValues = ['small', 'medium', 'large'] as const

export type AvatarSize = (typeof avatarSizeValues)[number]

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

export const avatarPropsSchema = z
	.object({
		alt: z.string().default(''),
		initials: z.string().default('AK'),
		size: z.enum(avatarSizeValues).default('medium'),
		src: z.string().optional()
	})
	.strict()

export const avatarPrimitiveDefinition = defineConcretePrimitive({
	category: 'media',
	component: Avatar,
	controls: [
		selectControl('size', 'Size', 'medium', avatarSizeValues),
		textControl('initials', 'Initials', 'AK')
	],
	description: 'Initials or image identity marker.',
	guidance:
		'Avatar is for compact identity only. Keep names and presence text in the surrounding row or card composition.',
	kind: 'primitive',
	name: 'Avatar',
	pressure: ['product'],
	props: [
		prop('initials', 'string', 'Initials shown when no image is provided.', 'C'),
		prop('src', 'string', 'Optional image URL.'),
		prop('alt', 'string', 'Accessible image text when src is present.', "''"),
		prop('size', "'small' | 'medium' | 'large'", 'Avatar diameter.', 'medium')
	],
	renderExample: renderAvatarExample,
	schema: avatarPropsSchema,
	slug: 'avatar',
	states: states([
		['default', 'Initial avatar sizes.'],
		['image', 'Image-backed avatar surface.']
	])
})

function renderAvatarExample(state = 'default') {
	return (
		<Frame>
			<Avatar
				alt="Rubric interface reference"
				initials="AK"
				size={state === 'image' ? 'large' : 'medium'}
				{...(state === 'image'
					? {
							src: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=128&h=128&fit=crop&crop=face'
						}
					: {})}
			/>
			<Avatar initials="RL" size="large" />
			<Avatar initials="C" size="small" />
		</Frame>
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
