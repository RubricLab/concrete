import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import type { UploadItemValue } from '../../schemas'
import { ImageUpload } from './component'
import { imageUploadExamples } from './examples'
import { imageUploadMeta } from './meta'
import { type ImageUploadValue, imageUploadComponentSchema } from './schema'

export type { ImageUploadProps } from './component'
export { ImageUpload } from './component'
export type { ImageUploadInput, ImageUploadValue } from './schema'
export { imageUploadComponentSchema } from './schema'

const uploadPreview =
	'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"%3E%3Crect width="80" height="80" fill="%23eef3fb"/%3E%3Cpath d="M18 56 34 36l10 12 8-10 10 18H18Z" fill="%231f6fd4"/%3E%3Ccircle cx="55" cy="25" r="6" fill="%23a9c6ef"/%3E%3C/svg%3E'

const imageUploadItemsByQueue = {
	empty: [],
	error: [
		{
			error: 'File type is not accepted.',
			id: 'reference-error',
			name: 'reference.psd',
			size: 2840000,
			status: 'error',
			type: 'application/octet-stream'
		}
	],
	mixed: [
		{
			id: 'reference',
			name: 'interface-reference.png',
			previewUrl: uploadPreview,
			progress: 100,
			size: 840000,
			status: 'success',
			type: 'image/png'
		},
		{
			id: 'flow-detail',
			name: 'flow-detail.png',
			progress: 64,
			size: 620000,
			status: 'uploading',
			type: 'image/png'
		}
	],
	success: [
		{
			id: 'reference',
			name: 'interface-reference.png',
			previewUrl: uploadPreview,
			progress: 100,
			size: 840000,
			status: 'success',
			type: 'image/png'
		}
	],
	uploading: [
		{
			id: 'flow-detail',
			name: 'flow-detail.png',
			progress: 64,
			size: 620000,
			status: 'uploading',
			type: 'image/png'
		}
	]
} as const satisfies Record<ImageUploadValue['queue'], readonly UploadItemValue[]>

export const imageUploadComponentDefinition = createComponent({
	...imageUploadMeta,
	component: ImageUpload,
	kind: 'component',
	renderExample: (state?: string) => renderExample(imageUploadExamples, state),
	renderInput: input => renderImageUploadInput(imageUploadComponentSchema.parse(input)),
	schema: imageUploadComponentSchema,
	seed: imageUploadComponentSchema.parse({ defaultValue: imageUploadItemsByQueue.mixed }),
	slug: 'image-upload',
	states: exampleStates(imageUploadExamples, [
		'default',
		'single',
		'avatar',
		'grid',
		'uploading',
		'empty',
		'error'
	])
})

function renderImageUploadInput(input: ImageUploadValue) {
	const { defaultValue, queue, ...props } = input
	const uploadValue = defaultValue.length > 0 ? defaultValue : imageUploadItemsByQueue[queue]

	return <ImageUpload {...props} defaultValue={uploadValue} />
}
