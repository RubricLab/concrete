import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Dropzone } from './component'

export const dropzoneExamples = defineExamples({
	active: {
		description: 'Drag-over state.',
		render: () => (
			<Frame>
				<Dropzone active description="Drag or choose a research artifact." title="Upload files" />
			</Frame>
		)
	},
	default: {
		description: 'Passive upload target.',
		render: () => (
			<Frame>
				<Dropzone description="Drag or choose a research artifact." title="Upload files" />
			</Frame>
		)
	},
	disabled: {
		description: 'Locked upload target.',
		render: () => (
			<Frame>
				<Dropzone disabled description="File input is locked." title="Upload files" />
			</Frame>
		)
	},
	image: {
		description: 'Image-specific icon and copy.',
		render: () => (
			<Frame>
				<Dropzone
					description="Drag or choose a research artifact."
					icon="image"
					title="Upload images"
				/>
			</Frame>
		)
	}
})
