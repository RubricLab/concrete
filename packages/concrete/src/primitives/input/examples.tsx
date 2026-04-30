import { defineExamples } from '../../factories/createExamples'
import { Input } from './component'

export const inputExamples = defineExamples({
	default: {
		description: 'Empty field state.',
		render: () => (
			<>
				<Input label="Reviewer email" leadingIcon="at-sign" placeholder="you@rubric.bot" />
			</>
		)
	},
	disabled: {
		description: 'Locked field.',
		render: () => (
			<>
				<Input disabled label="Reviewer email" leadingIcon="at-sign" placeholder="you@rubric.bot" />
			</>
		)
	},
	error: {
		description: 'Validation failure.',
		render: () => (
			<>
				<Input
					error="Enter a valid email address."
					label="Reviewer email"
					leadingIcon="at-sign"
					placeholder="you@rubric.bot"
				/>
			</>
		)
	},
	filled: {
		description: 'Value present.',
		render: () => (
			<>
				<Input defaultValue="arihan@rubric.bot" label="Reviewer email" leadingIcon="at-sign" />
			</>
		)
	}
})
