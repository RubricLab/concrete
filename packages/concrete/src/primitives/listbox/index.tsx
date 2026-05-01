import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { OptionRow } from '../option-row'
import { Listbox } from './component'
import { listboxExamples } from './examples'
import { listboxMeta } from './meta'
import { type ListboxValue, listboxSchema } from './schema'

export type { ListboxProps } from './component'
export { Listbox } from './component'
export type { ListboxDensity, ListboxInput, ListboxValue } from './schema'
export { listboxDensitySchema, listboxPropsSchema, listboxSchema } from './schema'

export const listboxPrimitiveDefinition = createPrimitive({
	...listboxMeta,
	component: Listbox,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(listboxExamples, state),
	renderInput: input => renderListboxInput(listboxSchema.parse(input)),
	schema: listboxSchema,
	slug: 'listbox',
	states: exampleStates(listboxExamples, ['default', 'compact', 'empty'])
})

function renderListboxInput({ empty, emptyLabel, optionCount, density }: ListboxValue) {
	const options = ['Research', 'Design systems', 'Agent traces', 'Generated UI'].slice(
		0,
		optionCount
	)

	return (
		<Listbox emptyLabel={emptyLabel} density={density}>
			{empty
				? null
				: options.map((option, index) => (
						<OptionRow key={option} selected={index === 0}>
							{option}
						</OptionRow>
					))}
		</Listbox>
	)
}
