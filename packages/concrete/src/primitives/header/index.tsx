import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Header } from './component'
import { headerExamples } from './examples'
import { headerMeta } from './meta'
import { type HeaderValue, headerSchema } from './schema'

export type { HeaderProps } from './component'
export { Header } from './component'
export type { HeaderInput, HeaderValue } from './schema'
export { headerPropsSchema, headerSchema } from './schema'

export const headerPrimitiveDefinition = createPrimitive({
	...headerMeta,
	component: Header,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(headerExamples, state),
	renderInput: input => renderHeaderInput(headerSchema.parse(input)),
	schema: headerSchema,
	slug: 'header',
	states: exampleStates(headerExamples, ['default', 'actions', 'meta'])
})

function renderHeaderInput({ density, description, eyebrow, level, meta, title }: HeaderValue) {
	return (
		<Header
			density={density}
			description={description}
			eyebrow={eyebrow}
			level={level}
			meta={meta}
			title={title}
		/>
	)
}
