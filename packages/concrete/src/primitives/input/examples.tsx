import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../stack'
import { Input, InputControl } from './component'

export const inputExamples = defineExamples({
	default: {
		description: 'Dense field states with label, icon, and help text.',
		render: () => (
			<Stack density="compact">
				<Input
					help="Used for review notifications."
					label="Reviewer email"
					leadingIcon="at-sign"
					placeholder="you@rubric.bot"
				/>
				<Input defaultValue="Nightly rubric eval" label="Run label" leadingIcon="file-text" />
			</Stack>
		)
	},
	disabled: {
		description: 'Locked field.',
		render: () => (
			<Stack density="compact">
				<Input disabled label="Reviewer email" leadingIcon="at-sign" placeholder="you@rubric.bot" />
				<Input disabled defaultValue="prod" label="Environment" leadingIcon="lock" />
			</Stack>
		)
	},
	error: {
		description: 'Validation failure.',
		render: () => (
			<Stack density="compact">
				<Input
					error="Enter a valid email address."
					label="Reviewer email"
					leadingIcon="at-sign"
					placeholder="you@rubric.bot"
				/>
				<Input
					error="Use at least 3 characters."
					label="Run label"
					leadingIcon="file-text"
					value="AI"
					readOnly
				/>
			</Stack>
		)
	},
	filled: {
		description: 'Value present.',
		render: () => (
			<Stack density="compact">
				<Input defaultValue="arihan@rubric.bot" label="Reviewer email" leadingIcon="at-sign" />
				<Input defaultValue="R-1048" label="Run id" leadingIcon="hash" />
			</Stack>
		)
	},
	inlineControl: {
		description: 'Bare form-control anatomy for component-owned field layouts.',
		render: () => (
			<Stack density="compact">
				<InputControl defaultValue="agent traces" />
				<InputControl invalid placeholder="Invalid token" />
			</Stack>
		)
	}
})
