import { defineExamples } from '../../factories/createExamples'
import { Avatar } from './component'

export const avatarExamples = defineExamples({
	default: {
		description: 'Initial avatar sizes.',
		render: () => (
			<>
				<Avatar alt="Rubric interface reference" initials="AK" />
				<Avatar density="editorial" initials="RL" />
				<Avatar density="compact" initials="C" />
			</>
		)
	},
	image: {
		description: 'Image-backed avatar surface.',
		render: () => (
			<>
				<Avatar
					alt="Rubric interface reference"
					density="editorial"
					initials="AK"
					src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=128&h=128&fit=crop&crop=face"
				/>
				<Avatar density="editorial" initials="RL" />
				<Avatar density="compact" initials="C" />
			</>
		)
	}
})
