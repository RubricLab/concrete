import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Badge } from './component'
import { badgeExamples } from './examples'
import { badgeMeta } from './meta'
import { type BadgeValue, badgeSchema } from './schema'

export type { BadgeHierarchy, BadgeIntent, BadgeProps, BadgePurpose } from './component'
export { Badge } from './component'
export type { BadgeInput, BadgeValue } from './schema'
export {
	badgeHierarchyValues,
	badgeIntentValues,
	badgePropsSchema,
	badgePurposeValues,
	badgeSchema
} from './schema'

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

function renderBadgeInput({ hierarchy, intent, label, purpose }: BadgeValue) {
	return (
		<Badge hierarchy={hierarchy} intent={intent} purpose={purpose}>
			{label}
		</Badge>
	)
}
