import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type AvatarMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const avatarMeta = {
	category: 'media',
	description: 'Initials or image identity marker.',
	guidance:
		'Avatar is for compact identity only. Keep names and presence text in the surrounding row or card composition.',
	name: 'Avatar',
	pressure: ['product'],
	props: [
		prop('initials', 'string', 'Initials shown when no image is provided.', 'C'),
		prop('src', 'string', 'Optional image URL.'),
		prop('alt', 'string', 'Accessible image text when src is present.', "''"),
		prop(
			'density',
			"'compact' | 'comfortable' | 'editorial'",
			'Foundation-backed avatar diameter.',
			'comfortable'
		)
	]
} as const satisfies AvatarMeta
