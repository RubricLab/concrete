import { defineExamples } from '../../factories/createExamples'
import { ValidationList } from './component'

export const validationListExamples = defineExamples({
	default: {
		description: 'Validation issue list with error and success rows.',
		render: () => (
			<ValidationList
				items={[
					{ id: 'email', label: 'Email', message: 'Enter a work email.' },
					{ id: 'role', label: 'Role', message: 'Choose at least one role.' },
					{ id: 'schema', label: 'Schema', message: 'Boundary parsed.', status: 'success' }
				]}
			/>
		)
	},
	linked: {
		description: 'Validation list with linked issue labels.',
		render: () => (
			<ValidationList
				items={[{ href: '#workspace', id: 'workspace', label: 'Workspace', message: 'Required.' }]}
			/>
		)
	},
	success: {
		description: 'Success issue list state.',
		render: () => (
			<ValidationList
				items={[{ id: 'saved', label: 'Settings', message: 'Ready to save.', status: 'success' }]}
				status="success"
			/>
		)
	}
})
