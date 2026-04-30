import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Avatar } from './component'
import { avatarExamples } from './examples'
import { avatarMeta } from './meta'
import { type AvatarValue, avatarSchema } from './schema'

export type { AvatarProps, AvatarSize } from './component'
export { Avatar } from './component'
export type { AvatarInput, AvatarValue } from './schema'
export { avatarPropsSchema, avatarSchema, avatarSizeValues } from './schema'

export const avatarPrimitiveDefinition = createPrimitive({
	...avatarMeta,
	component: Avatar,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(avatarExamples, state),
	renderInput: input => renderAvatarInput(avatarSchema.parse(input)),
	schema: avatarSchema,
	slug: 'avatar',
	states: exampleStates(avatarExamples, ['default', 'image'])
})

function renderAvatarInput({ src, ...input }: AvatarValue) {
	return <Avatar {...input} {...(src ? { src } : {})} />
}
