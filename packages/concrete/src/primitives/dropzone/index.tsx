import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Dropzone } from './component'
import { dropzoneExamples } from './examples'
import { dropzoneMeta } from './meta'
import { type DropzoneValue, dropzoneSchema } from './schema'

export type { DropzoneProps } from './component'
export { Dropzone } from './component'
export type { DropzoneInput, DropzoneValue } from './schema'
export { dropzonePropsSchema, dropzoneSchema } from './schema'

export const dropzonePrimitiveDefinition = createPrimitive({
	...dropzoneMeta,
	component: Dropzone,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(dropzoneExamples, state),
	renderInput: input => renderDropzoneInput(dropzoneSchema.parse(input)),
	schema: dropzoneSchema,
	slug: 'dropzone',
	states: exampleStates(dropzoneExamples, ['default', 'active', 'image', 'disabled'])
})

function renderDropzoneInput(input: DropzoneValue) {
	return <Dropzone {...input} />
}
