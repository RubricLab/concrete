import { defineExamples } from '../../factories/createExamples'
import { TimeList } from './component'

const timeListOptions = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM']

export const timeListExamples = defineExamples({
	default: {
		description: 'Time list with selected value.',
		render: () => renderTimeListExample('10:00 AM')
	},
	later: {
		description: 'Later selected value.',
		render: () => renderTimeListExample('11:30 AM')
	}
})

function renderTimeListExample(value: string) {
	return <TimeList options={timeListOptions} placement="inline" value={value} />
}
