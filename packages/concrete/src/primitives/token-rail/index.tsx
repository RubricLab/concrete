import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { TokenRail } from './component'
import { tokenRailExamples } from './examples'
import { tokenRailMeta } from './meta'
import { type TokenRailValue, tokenRailSchema } from './schema'

export type {
	TokenRailItemData,
	TokenRailItemKind,
	TokenRailItemProps,
	TokenRailProps
} from './component'
export { TokenRail, TokenRailItem } from './component'
export type { TokenRailInput, TokenRailValue } from './schema'
export {
	tokenRailItemIconValues,
	tokenRailItemKindValues,
	tokenRailItemSchema,
	tokenRailPropsSchema,
	tokenRailSchema
} from './schema'

export const tokenRailPrimitiveDefinition = createPrimitive({
	...tokenRailMeta,
	component: TokenRail,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(tokenRailExamples, state),
	renderInput: input => renderTokenRailInput(tokenRailSchema.parse(input)),
	schema: tokenRailSchema,
	slug: 'token-rail',
	states: exampleStates(tokenRailExamples, ['default', 'tokens', 'attachments'])
})

function renderTokenRailInput({ items }: TokenRailValue) {
	return <TokenRail items={items} />
}
