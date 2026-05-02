import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import type { UploadItemValue } from '../../schemas'
import { FileUpload } from './component'

const fileUploadExamplesByQueue = {
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
	mixed: [
		{
			id: 'q2-report',
			name: 'Q2_report.pdf',
			progress: 100,
			size: 2400000,
			status: 'success',
			type: 'application/pdf'
		},
		{
			id: 'source-packet',
			name: 'source_packet.csv',
			progress: 64,
			size: 920000,
			status: 'uploading',
			type: 'text/csv'
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
} as const satisfies Record<string, readonly UploadItemValue[]>

export const fileUploadExamples = defineExamples({
	default: {
		description: 'Dropzone with mixed completed and active rows.',
		render: () => renderFileUploadExample('mixed')
	},
	empty: {
		description: 'Empty drop target.',
		render: () => renderFileUploadExample('empty')
	},
	error: {
		description: 'Rejected file row with validation copy.',
		render: () => renderFileUploadExample('error')
	},
	grid: {
		description: 'Grid queue layout for dense packet review.',
		render: () => renderFileUploadExample('mixed', 'grid')
	},
	success: {
		description: 'Completed file row with metadata.',
		render: () => renderFileUploadExample('success')
	},
	uploading: {
		description: 'Active upload progress row.',
		render: () => renderFileUploadExample('uploading')
	}
})

function renderFileUploadExample(
	queue: keyof typeof fileUploadExamplesByQueue,
	display: 'grid' | 'stack' = 'stack'
): ReactNode {
	return (
		<FileUpload
			defaultValue={fileUploadExamplesByQueue[queue]}
			descriptionText="Drop PDFs, images, or source packets."
			display={display}
			kind={display === 'grid' ? 'grid' : 'file'}
			label="Artifacts"
		/>
	)
}
