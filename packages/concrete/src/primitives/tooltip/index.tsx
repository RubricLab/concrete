import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Button } from '../button'
import { Tooltip } from './component'
import { tooltipExamples } from './examples'
import { tooltipMeta } from './meta'
import { type TooltipValue, tooltipSchema } from './schema'

export type { TooltipPlacement, TooltipProps } from './component'
export { Tooltip } from './component'
export type { TooltipInput, TooltipValue } from './schema'
export { tooltipPropsSchema, tooltipSchema } from './schema'

export const tooltipPrimitiveDefinition = createPrimitive({
	...tooltipMeta,
	component: Tooltip,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(tooltipExamples, state),
	renderInput: input => renderTooltipInput(tooltipSchema.parse(input)),
	schema: tooltipSchema,
	slug: 'tooltip',
	states: exampleStates(tooltipExamples, ['default', 'rich'])
})

function renderTooltipInput({ content, forceOpen, placement, title }: TooltipValue) {
	return (
		<Tooltip
			content={content}
			forceOpen={forceOpen}
			placement={placement}
			{...(title ? { title } : {})}
		>
			<Button hierarchy="secondary">Anchor</Button>
		</Tooltip>
	)
}
