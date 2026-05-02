import { defineExamples } from '../../factories/createExamples'
import { Dropzone } from './component'

export const dropzoneExamples = defineExamples({
	active: {
		description: 'Drag-over state.',
		render: () => (
			<Dropzone
				active
				actionLabel="Drop to attach"
				description="Release to add this packet to the queue."
				title="Ready for files"
			/>
		)
	},
	default: {
		description: 'Passive upload target.',
		render: () => (
			<Dropzone
				actionLabel="Choose files"
				description="Drag or choose a research artifact."
				title="Upload files"
			/>
		)
	},
	disabled: {
		description: 'Locked upload target.',
		render: () => (
			<Dropzone
				disabled
				actionLabel="Uploads locked"
				description="File input is locked for this review."
				title="Upload files"
			/>
		)
	},
	image: {
		description: 'Image-specific icon and copy.',
		render: () => (
			<Dropzone
				actionLabel="Choose images"
				description="Drop interface references or choose from disk."
				icon="image"
				title="Upload images"
			/>
		)
	}
})
