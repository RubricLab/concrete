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
		description: 'Dropzone with a completed file row.',
		render: () => renderFileUploadExample('uploading')
	},
	empty: {
		description: 'Empty drop target.',
		render: () => renderFileUploadExample('empty')
	},
	error: {
		description: 'Rejected file row with validation copy.',
		render: () => renderFileUploadExample('error')
	}
})

function renderFileUploadExample(queue: keyof typeof fileUploadExamplesByQueue): ReactNode {
	return (
		<FormStage>
			<FileUpload
				defaultValue={fileUploadExamplesByQueue[queue]}
				descriptionText="Drop PDFs, images, or source packets."
				label="Artifacts"
			/>
		</FormStage>
	)
}

function FormStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 480, width: '100%' }}>{children}</div>
}
