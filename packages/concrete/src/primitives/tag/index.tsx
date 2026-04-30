import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Tag } from './component'
import { tagExamples } from './examples'
import { tagMeta } from './meta'
import { type TagValue, tagSchema } from './schema'

export type { TagProps, TagSize, TagTone, TagVariant } from './component'
export { Tag } from './component'
export type { TagInput, TagValue } from './schema'
export { tagPropsSchema, tagSchema, tagSizeValues, tagToneValues, tagVariantValues } from './schema'

export const tagPrimitiveDefinition = createPrimitive({
	...tagMeta,
	component: Tag,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(tagExamples, state),
	renderInput: input => renderTagInput(tagSchema.parse(input)),
	schema: tagSchema,
	slug: 'tag',
	states: exampleStates(tagExamples, ['default', 'variants', 'sizes'])
})

function renderTagInput({ label, leadingIcon, ...input }: TagValue) {
	return (
		<Tag {...input} {...(leadingIcon ? { leadingIcon } : {})}>
			{label}
		</Tag>
	)
}
