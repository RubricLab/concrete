import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Badge } from './component'
import { badgeExamples } from './examples'
import { badgeMeta } from './meta'
import { type BadgeValue, badgeSchema } from './schema'

export type { BadgeProps, BadgeVariant } from './component'
export { Badge } from './component'
export type { BadgeInput, BadgeValue } from './schema'
export { badgePropsSchema, badgeSchema, badgeSignalValues, badgeVariantValues } from './schema'

export const badgePrimitiveDefinition = createPrimitive({
	...badgeMeta,
	component: Badge,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(badgeExamples, state),
	renderInput: input => renderBadgeInput(badgeSchema.parse(input)),
	schema: badgeSchema,
	slug: 'badge',
	states: exampleStates(badgeExamples, ['default', 'solid', 'count'])
})

function renderBadgeInput({ label, ...input }: BadgeValue) {
	return <Badge {...input}>{label}</Badge>
}
