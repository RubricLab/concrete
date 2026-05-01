import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Panel } from './component'
import { panelExamples } from './examples'
import { panelMeta } from './meta'
import { type PanelValue, panelSchema } from './schema'

export type { PanelProps } from './component'
export { Panel } from './component'
export type { PanelInput, PanelValue } from './schema'
export { panelPropsSchema, panelSchema } from './schema'

export const panelPrimitiveDefinition = createPrimitive({
	...panelMeta,
	component: Panel,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(panelExamples, state),
	renderInput: input => renderPanelInput(panelSchema.parse(input)),
	schema: panelSchema,
	slug: 'panel',
	states: exampleStates(panelExamples, ['default', 'footer', 'raised'])
})

function renderPanelInput({
	content,
	density,
	depth,
	description,
	footer,
	title,
	intent
}: PanelValue) {
	return (
		<Panel
			density={density}
			depth={depth}
			description={description}
			footer={footer}
			title={title}
			intent={intent}
		>
			{content}
		</Panel>
	)
}
