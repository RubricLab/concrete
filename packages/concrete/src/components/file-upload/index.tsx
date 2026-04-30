import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import type { UploadItemValue } from '../../schemas'
import { FileUpload } from './component'
import { fileUploadExamples } from './examples'
import { fileUploadMeta } from './meta'
import { type FileUploadValue, fileUploadComponentSchema } from './schema'

export type { FileUploadProps } from './component'
export { FileUpload } from './component'
export type { FileUploadInput, FileUploadValue } from './schema'
export { fileUploadComponentSchema } from './schema'

const fileUploadItemsByQueue = {
	empty: [],
	error: [
		{
			error: 'File type is not accepted.',
			id: 'archive',
			name: 'archive.zip',
			size: 9240000,
			status: 'error',
			type: 'application/zip'
		}
	],
	success: [
		{
			id: 'q2-report',
			name: 'Q2_report.pdf',
			progress: 100,
			size: 2400000,
			status: 'success',
			type: 'application/pdf'
		}
	],
	uploading: [
		{
			id: 'q2-report',
			name: 'Q2_report.pdf',
			progress: 72,
			size: 2400000,
			status: 'uploading',
			type: 'application/pdf'
		}
	]
} as const satisfies Record<FileUploadValue['queue'], readonly UploadItemValue[]>

export const fileUploadComponentDefinition = createComponent({
	...fileUploadMeta,
	component: FileUpload,
	kind: 'component',
	renderExample: (state?: string) => renderExample(fileUploadExamples, state),
	renderInput: input => renderFileUploadInput(fileUploadComponentSchema.parse(input)),
	schema: fileUploadComponentSchema,
	seed: fileUploadComponentSchema.parse({ defaultValue: fileUploadItemsByQueue.uploading }),
	slug: 'file-upload',
	states: exampleStates(fileUploadExamples, ['default', 'empty', 'error'])
})

function renderFileUploadInput(input: FileUploadValue) {
	const { accept, defaultValue, maxSize, queue, ...props } = input
	const uploadValue = defaultValue.length > 0 ? defaultValue : fileUploadItemsByQueue[queue]

	return (
		<FileUpload
			{...props}
			{...(accept ? { accept } : {})}
			defaultValue={uploadValue}
			{...(maxSize === undefined ? {} : { maxSize })}
		/>
	)
}
