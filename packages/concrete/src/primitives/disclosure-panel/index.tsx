import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DisclosurePanel } from './component'
import { disclosurePanelExamples } from './examples'
import { disclosurePanelMeta } from './meta'
import { type DisclosurePanelValue, disclosurePanelSchema } from './schema'

export type { DisclosurePanelProps } from './component'
export { DisclosurePanel } from './component'
export type { DisclosurePanelInput, DisclosurePanelTone, DisclosurePanelValue } from './schema'
export {
	disclosurePanelPropsSchema,
	disclosurePanelSchema,
	disclosurePanelToneSchema
} from './schema'

export const disclosurePanelPrimitiveDefinition = createPrimitive({
	...disclosurePanelMeta,
	component: DisclosurePanel,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(disclosurePanelExamples, state),
	renderInput: input => renderDisclosurePanelInput(disclosurePanelSchema.parse(input)),
	schema: disclosurePanelSchema,
	slug: 'disclosure-panel',
	states: exampleStates(disclosurePanelExamples, ['default', 'closed', 'terminal'])
})

function renderDisclosurePanelInput({ content, open, summary, tone }: DisclosurePanelValue) {
	return (
		<DisclosurePanel open={open} summary={summary} tone={tone}>
			{content}
		</DisclosurePanel>
	)
}
