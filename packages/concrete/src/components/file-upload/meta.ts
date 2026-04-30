import { prop } from '../../registry/props'

export const fileUploadMeta = {
	category: 'form',
	description:
		'Local upload queue composition with dropzone, file validation, progress rows, and remove actions.',
	guidance:
		'File upload owns local selection and value shape only. Applications own signed URLs, transport, retries, virus scanning, and persistence.',
	name: 'File upload',
	pressure: ['product'],
	props: [
		prop('value', 'readonly UploadItemValue[]', 'Controlled upload queue.'),
		prop('defaultValue', 'readonly UploadItemValue[]', 'Uncontrolled initial upload queue.', '[]'),
		prop('accept', 'string', 'Native accept filter for selected files.'),
		prop('maxSize', 'number', 'Maximum file size in bytes.'),
		prop('multiple', 'boolean', 'Allows multiple files in the queue.', 'true'),
		prop('previewImages', 'boolean', 'Creates local object URLs for image previews.', 'false'),
		prop('onValueChange', '(value: readonly UploadItemValue[]) => void', 'Receives queue values.'),
		prop(
			'onFilesChange',
			'(files: readonly File[]) => void',
			'Receives raw dropped or selected files.'
		),
		prop('label', 'ReactNode', 'Field label.')
	]
} as const
