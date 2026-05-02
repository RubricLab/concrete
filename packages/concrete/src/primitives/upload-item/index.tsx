import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { UploadItem } from './component'
import { uploadItemExamples } from './examples'
import { uploadItemMeta } from './meta'
import { type UploadItemPrimitiveValue, uploadItemPropsSchema } from './schema'

export type { UploadItemProps } from './component'
export { UploadItem } from './component'
export type { UploadItemInput, UploadItemPrimitiveValue } from './schema'
export { uploadItemPropsSchema } from './schema'

export const uploadItemPrimitiveDefinition = createPrimitive({
	...uploadItemMeta,
	component: UploadItem,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(uploadItemExamples, state),
	renderInput: input => renderUploadItemInput(uploadItemPropsSchema.parse(input)),
	schema: uploadItemPropsSchema,
	slug: 'upload-item',
	states: exampleStates(uploadItemExamples, ['default', 'uploading', 'success', 'image', 'error'])
})

function renderUploadItemInput(input: UploadItemPrimitiveValue) {
	return <UploadItem {...input} />
}
