import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Card } from './component'
import { cardExamples } from './examples'
import { cardMeta } from './meta'
import { type CardValue, cardSchema } from './schema'

export type { CardProps, CardVariant } from './component'
export { Card } from './component'
export type { CardInput, CardValue } from './schema'
export { cardPropsSchema, cardSchema } from './schema'

export const cardPrimitiveDefinition = createPrimitive({
	...cardMeta,
	component: Card,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(cardExamples, state),
	renderInput: input => renderCardInput(cardSchema.parse(input)),
	schema: cardSchema,
	slug: 'card',
	states: exampleStates(cardExamples, ['default', 'raised', 'sunken'])
})

function renderCardInput(input: CardValue) {
	return <Card {...input} />
}
