import { defineExamples } from '../../factories/createExamples'
import { Listbox } from '../listbox'
import { OptionRow } from '../option-row'
import { PickerSurface } from './component'

export const pickerSurfaceExamples = defineExamples({
	default: {
		description: 'Relative picker surface wrapper.',
		render: () => (
			<PickerSurface open>
				<Listbox>
					<OptionRow selected>Today</OptionRow>
					<OptionRow>Tomorrow</OptionRow>
				</Listbox>
			</PickerSurface>
		)
	},
	dense: {
		description: 'Dense picker surface content.',
		render: () => (
			<PickerSurface open>
				<Listbox density="compact">
					<OptionRow selected>Research</OptionRow>
					<OptionRow>Agent traces</OptionRow>
				</Listbox>
			</PickerSurface>
		)
	},
	floating: {
		description: 'Floating picker surface.',
		render: () => (
			<PickerSurface open placement="floating">
				<Listbox density="compact">
					<OptionRow selected>14:30</OptionRow>
					<OptionRow>15:00</OptionRow>
				</Listbox>
			</PickerSurface>
		)
	}
})
