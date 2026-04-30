import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Container } from './component'
import { containerExamples } from './examples'
import { containerMeta } from './meta'
import { type ContainerValue, containerSchema } from './schema'

export type { ContainerProps } from './component'
export { Container } from './component'
export type {
	ContainerElement,
	ContainerInput,
	ContainerMeasure,
	ContainerValue
} from './schema'
export {
	containerElementSchema,
	containerMeasureSchema,
	containerPropsSchema,
	containerSchema
} from './schema'

export const containerPrimitiveDefinition = createPrimitive({
	...containerMeta,
	component: Container,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(containerExamples, state),
	renderInput: input => renderContainerInput(containerSchema.parse(input)),
	schema: containerSchema,
	slug: 'container',
	states: exampleStates(containerExamples, ['default', 'content', 'full'])
})

function renderContainerInput({ as, content, density, measure }: ContainerValue) {
	return (
		<Container as={as} density={density} measure={measure}>
			{content}
		</Container>
	)
}
