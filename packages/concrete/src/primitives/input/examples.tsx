import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Input } from './component'

export const inputExamples = defineExamples({
	default: {
		description: 'Empty field state.',
		render: () => (
			<Frame>
				<Input label="Email" leadingIcon="at-sign" placeholder="you@rubric.bot" />
			</Frame>
		)
	},
	disabled: {
		description: 'Locked field.',
		render: () => (
			<Frame>
				<Input disabled label="Email" leadingIcon="at-sign" placeholder="you@rubric.bot" />
			</Frame>
		)
	},
	error: {
		description: 'Validation failure.',
		render: () => (
			<Frame>
				<Input
					error="Enter a valid email address."
					label="Email"
					leadingIcon="at-sign"
					placeholder="you@rubric.bot"
				/>
			</Frame>
		)
	},
	filled: {
		description: 'Value present.',
		render: () => (
			<Frame>
				<Input defaultValue="arihan@rubric.bot" label="Email" leadingIcon="at-sign" />
			</Frame>
		)
	}
})
