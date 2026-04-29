import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { uploadItemSchema } from '../schemas'
import { FileUpload } from './file-upload-view'

export { FileUpload, type FileUploadProps } from './file-upload-view'

const uploadQueueValues = ['empty', 'uploading', 'success', 'error'] as const

export const fileUploadComponentSchema = z
	.object({
		defaultValue: z.array(uploadItemSchema).default([]),
		label: z.string().default('Artifacts'),
		multiple: z.boolean().default(true),
		queue: z.enum(uploadQueueValues).default('uploading'),
		title: z.string().default('Upload files')
	})
	.strict()

export const fileUploadComponentDefinition = defineConcreteComponent({
	category: 'form',
	component: FileUpload,
	controls: [
		textControl('label', 'Label', 'Artifacts'),
		textControl('title', 'Title', 'Upload files'),
		selectControl('queue', 'Queue', 'uploading', uploadQueueValues),
		booleanControl('multiple', 'Multiple', 'true')
	],
	description:
		'Local upload queue composition with dropzone, file validation, progress rows, and remove actions.',
	guidance:
		'File upload owns local selection and value shape only. Applications own signed URLs, transport, retries, virus scanning, and persistence.',
	kind: 'component',
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
	],
	renderExample: renderFileUploadExample,
	schema: fileUploadComponentSchema,
	slug: 'file-upload',
	states: states([
		['default', 'Dropzone with a completed file row.'],
		['empty', 'Empty drop target.'],
		['error', 'Rejected file row with validation copy.']
	])
})

function renderFileUploadExample(state = 'default'): ReactNode {
	return (
		<FormStage>
			<FileUpload
				defaultValue={
					state === 'empty'
						? []
						: [
								{
									...(state === 'error' ? { error: 'File type is not accepted.' } : {}),
									id: 'q2-report',
									name: state === 'error' ? 'archive.zip' : 'Q2_report.pdf',
									...(state === 'error' ? {} : { progress: 72 }),
									size: state === 'error' ? 9240000 : 2400000,
									status: state === 'error' ? 'error' : 'uploading',
									type: state === 'error' ? 'application/zip' : 'application/pdf'
								}
							]
				}
				descriptionText="Drop PDFs, images, or source packets."
				label="Artifacts"
			/>
		</FormStage>
	)
}

function FormStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 480, width: '100%' }}>{children}</div>
}
