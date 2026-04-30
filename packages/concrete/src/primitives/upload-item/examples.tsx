import { defineExamples } from '../../factories/createExamples'
import { UploadItem } from './component'

export const uploadItemExamples = defineExamples({
	default: {
		description: 'Completed file row.',
		render: () => (
			<>
				<UploadItem meta="2.4 MB" name="Q2_report.pdf" progress={100} status="success" />
			</>
		)
	},
	error: {
		description: 'Rejected file row.',
		render: () => (
			<>
				<UploadItem
					error="File type is not accepted."
					meta="2.4 MB"
					name="Q2_report.pdf"
					status="error"
				/>
			</>
		)
	},
	image: {
		description: 'Image row with preview affordance.',
		render: () => (
			<>
				<UploadItem icon="image" meta="2.4 MB" name="interface-reference.png" status="success" />
			</>
		)
	},
	uploading: {
		description: 'Progress row.',
		render: () => (
			<>
				<UploadItem meta="2.4 MB - 64%" name="Q2_report.pdf" progress={64} status="uploading" />
			</>
		)
	}
})
