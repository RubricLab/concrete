import { defineExamples } from '../../factories/createExamples'
import { Radio } from './component'

export const radioExamples = defineExamples({
	default: {
		description: 'Selected and unselected options.',
		render: () => (
			<>
				<Radio checked label="Product density" name="rhythm" readOnly />
				<Radio label="Editorial rhythm" name="rhythm" readOnly />
			</>
		)
	},
	disabled: {
		description: 'Locked option state.',
		render: () => (
			<>
				<Radio checked disabled label="Product density" name="rhythm-disabled" readOnly />
				<Radio disabled label="Editorial rhythm" name="rhythm-disabled" readOnly />
			</>
		)
	}
})
