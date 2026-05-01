import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DisclosurePanel } from './component'
import { disclosurePanelExamples } from './examples'
import { disclosurePanelMeta } from './meta'
import { type DisclosurePanelValue, disclosurePanelSchema } from './schema'

export type { DisclosurePanelProps } from './component'
export { DisclosurePanel } from './component'
export type { DisclosurePanelInput, DisclosurePanelIntent, DisclosurePanelValue } from './schema'
export {
	disclosurePanelIntentSchema,
	disclosurePanelPropsSchema,
	disclosurePanelSchema
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

function renderDisclosurePanelInput({ content, open, summary, intent }: DisclosurePanelValue) {
	return (
		<DisclosurePanel open={open} summary={summary} intent={intent}>
			{content}
		</DisclosurePanel>
	)
}
