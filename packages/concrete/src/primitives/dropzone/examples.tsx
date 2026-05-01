import { defineExamples } from '../../factories/createExamples'
import { Dropzone } from './component'

export const dropzoneExamples = defineExamples({
	active: {
		description: 'Drag-over state.',
		render: () => (
			<>
				<Dropzone active description="Drag or choose a research artifact." title="Upload files" />
			</>
		)
	},
	default: {
		description: 'Passive upload target.',
		render: () => (
			<>
				<Dropzone
					actionLabel="Choose files"
					description="Drag or choose a research artifact."
					title="Upload files"
				/>
			</>
		)
	},
	disabled: {
		description: 'Locked upload target.',
		render: () => (
			<>
				<Dropzone disabled description="File input is locked." title="Upload files" />
			</>
		)
	},
	image: {
		description: 'Image-specific icon and copy.',
		render: () => (
			<>
				<Dropzone
					actionLabel="Choose images"
					description="Drag or choose a research artifact."
					icon="image"
					title="Upload images"
				/>
			</>
		)
	}
})
