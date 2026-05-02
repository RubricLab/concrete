import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ChartFrame, ChartMessage } from './component'
import { chartFrameExamples } from './examples'
import { chartFrameMeta } from './meta'
import { type ChartFrameValue, chartFrameSchema } from './schema'

export type {
	ChartFrameKind,
	ChartFrameProps,
	ChartFrameSurface,
	ChartMessageProps
} from './component'
export { ChartFrame, ChartMessage } from './component'
export type { ChartFrameInput, ChartFrameValue } from './schema'
export {
	chartFrameKindValues,
	chartFramePropsSchema,
	chartFrameSchema,
	chartFrameStateValues,
	chartFrameSurfaceValues
} from './schema'

export const chartFramePrimitiveDefinition = createPrimitive({
	...chartFrameMeta,
	component: ChartFrame,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(chartFrameExamples, state),
	renderInput: input => renderChartFrameInput(chartFrameSchema.parse(input)),
	schema: chartFrameSchema,
	slug: 'chart-frame',
	states: exampleStates(chartFrameExamples, ['default', 'message'])
})

function renderChartFrameInput({ kind, message, state, surface }: ChartFrameValue) {
	switch (state) {
		case 'message':
			return (
				<ChartFrame kind={kind} surface={surface}>
					<ChartMessage>{message}</ChartMessage>
				</ChartFrame>
			)
		case 'surface':
			return <ChartFrame kind={kind} surface={surface} />
	}
}
