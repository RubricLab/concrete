import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { UploadItem } from './component'

export const uploadItemExamples = defineExamples({
	default: {
		description: 'Completed file row.',
		render: () => (
			<Frame>
				<UploadItem meta="2.4 MB" name="Q2_report.pdf" progress={100} status="success" />
			</Frame>
		)
	},
	error: {
		description: 'Rejected file row.',
		render: () => (
			<Frame>
				<UploadItem
					error="File type is not accepted."
					meta="2.4 MB"
					name="Q2_report.pdf"
					status="error"
				/>
			</Frame>
		)
	},
	image: {
		description: 'Image row with preview affordance.',
		render: () => (
			<Frame>
				<UploadItem icon="image" meta="2.4 MB" name="interface-reference.png" status="success" />
			</Frame>
		)
	},
	uploading: {
		description: 'Progress row.',
		render: () => (
			<Frame>
				<UploadItem meta="2.4 MB - 64%" name="Q2_report.pdf" progress={64} status="uploading" />
			</Frame>
		)
	}
})
