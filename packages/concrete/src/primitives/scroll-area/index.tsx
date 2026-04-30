import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ScrollArea } from './component'
import { scrollAreaExamples } from './examples'
import { scrollAreaMeta } from './meta'
import { type ScrollAreaValue, scrollAreaSchema } from './schema'

export type { ScrollAreaProps } from './component'
export { ScrollArea } from './component'
export type { ScrollAreaInput, ScrollAreaSize, ScrollAreaValue } from './schema'
export { scrollAreaPropsSchema, scrollAreaSchema, scrollAreaSizeSchema } from './schema'

export const scrollAreaPrimitiveDefinition = createPrimitive({
	...scrollAreaMeta,
	component: ScrollArea,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(scrollAreaExamples, state),
	renderInput: input => renderScrollAreaInput(scrollAreaSchema.parse(input)),
	schema: scrollAreaSchema,
	slug: 'scroll-area',
	states: exampleStates(scrollAreaExamples, ['default', 'large'])
})

function renderScrollAreaInput({ content, size }: ScrollAreaValue) {
	return <ScrollArea size={size}>{content}</ScrollArea>
}
