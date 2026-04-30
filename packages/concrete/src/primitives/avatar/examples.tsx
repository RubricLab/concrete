import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Avatar } from './component'

export const avatarExamples = defineExamples({
	default: {
		description: 'Initial avatar sizes.',
		render: () => (
			<Frame>
				<Avatar alt="Rubric interface reference" initials="AK" />
				<Avatar initials="RL" size="large" />
				<Avatar initials="C" size="small" />
			</Frame>
		)
	},
	image: {
		description: 'Image-backed avatar surface.',
		render: () => (
			<Frame>
				<Avatar
					alt="Rubric interface reference"
					initials="AK"
					size="large"
					src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=128&h=128&fit=crop&crop=face"
				/>
				<Avatar initials="RL" size="large" />
				<Avatar initials="C" size="small" />
			</Frame>
		)
	}
})
