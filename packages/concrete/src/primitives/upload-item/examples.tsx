import { defineExamples } from '../../factories/createExamples'
import { UploadItem } from './component'

const uploadPreview =
	'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"%3E%3Crect width="80" height="80" fill="%23eef3fb"/%3E%3Cpath d="M18 56 34 36l10 12 8-10 10 18H18Z" fill="%231f6fd4"/%3E%3Ccircle cx="55" cy="25" r="6" fill="%23a9c6ef"/%3E%3C/svg%3E'

export const uploadItemExamples = defineExamples({
	default: {
		description: 'Queued file row.',
		render: () => <UploadItem meta="Queued - 2.4 MB PDF" name="Q2_report.pdf" status="idle" />
	},
	error: {
		description: 'Rejected file row.',
		render: () => (
			<UploadItem
				error="File type is not accepted."
				meta="2.4 MB ZIP"
				name="archive.zip"
				status="error"
			/>
		)
	},
	image: {
		description: 'Image row with preview affordance.',
		render: () => (
			<UploadItem
				icon="image"
				meta="840 KB PNG"
				name="interface-reference.png"
				previewUrl={uploadPreview}
				progress={100}
				status="success"
			/>
		)
	},
	success: {
		description: 'Completed file row.',
		render: () => (
			<UploadItem meta="2.4 MB PDF" name="Q2_report.pdf" progress={100} status="success" />
		)
	},
	uploading: {
		description: 'Progress row.',
		render: () => (
			<UploadItem meta="64% - 2.4 MB PDF" name="Q2_report.pdf" progress={64} status="uploading" />
		)
	}
})
