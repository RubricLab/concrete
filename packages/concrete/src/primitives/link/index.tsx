import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { TextLink } from './component'
import { linkExamples } from './examples'
import { linkMeta } from './meta'
import { type LinkValue, linkSchema } from './schema'

export type { TextLinkIntent, TextLinkProps, TextLinkPurpose } from './component'
export { TextLink } from './component'
export type { LinkInput, LinkValue } from './schema'
export { linkPropsSchema, linkSchema } from './schema'

export const linkPrimitiveDefinition = createPrimitive({
	...linkMeta,
	component: TextLink,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(linkExamples, state),
	renderInput: input => renderLinkInput(linkSchema.parse(input)),
	schema: linkSchema,
	slug: 'link',
	states: exampleStates(linkExamples, ['default', 'tones', 'nav'])
})

function renderLinkInput({ label, ...props }: LinkValue) {
	return <TextLink {...props}>{label}</TextLink>
}
