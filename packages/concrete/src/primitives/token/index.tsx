import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Token } from './component'
import { tokenExamples } from './examples'
import { tokenMeta } from './meta'
import { type TokenValue, tokenSchema } from './schema'

export type { ConcreteTokenProps } from './component'
export { Token } from './component'
export type { TokenInput, TokenKind, TokenValue } from './schema'
export { tokenKindSchema, tokenPropsSchema, tokenSchema } from './schema'

export const tokenPrimitiveDefinition = createPrimitive({
	...tokenMeta,
	component: Token,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(tokenExamples, state),
	renderInput: input => renderTokenInput(tokenSchema.parse(input)),
	schema: tokenSchema,
	slug: 'token',
	states: exampleStates(tokenExamples, ['default', 'group', 'signal'])
})

function renderTokenInput({ kind, label, leadingIcon, removable, intent }: TokenValue) {
	return (
		<Token
			kind={kind}
			leadingIcon={leadingIcon}
			removable={removable}
			removeLabel={`Remove ${label}`}
			intent={intent}
		>
			{label}
		</Token>
	)
}
