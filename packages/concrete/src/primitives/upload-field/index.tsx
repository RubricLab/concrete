import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { UploadField } from './component'
import { uploadFieldExamples } from './examples'
import { uploadFieldMeta } from './meta'
import { type UploadFieldValue, uploadFieldSchema } from './schema'

export type { UploadFieldProps, UploadFieldVariant } from './component'
export { UploadField } from './component'
export type { UploadFieldInput, UploadFieldValue } from './schema'
export { uploadFieldPropsSchema, uploadFieldSchema, uploadFieldVariantValues } from './schema'

export const uploadFieldPrimitiveDefinition = createPrimitive({
	...uploadFieldMeta,
	component: UploadField,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(uploadFieldExamples, state),
	renderInput: input => renderUploadFieldInput(uploadFieldSchema.parse(input)),
	schema: uploadFieldSchema,
	slug: 'upload-field',
	states: exampleStates(uploadFieldExamples, ['default', 'file', 'avatar', 'grid'])
})

function renderUploadFieldInput(input: UploadFieldValue) {
	return <UploadField {...input} />
}
