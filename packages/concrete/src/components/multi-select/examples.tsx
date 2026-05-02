import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../../primitives'
import { MultiSelect } from './component'
import { multiSelectComponentSchema } from './schema'

const multiSelectOptions = multiSelectComponentSchema.parse({}).options

export const multiSelectExamples = defineExamples({
	default: {
		description: 'Dense tag fields inside a product settings flow.',
		render: () => renderMultiSelectExample('default')
	},
	empty: {
		description: 'Placeholder-only state before selection.',
		render: () => renderMultiSelectExample('empty')
	},
	limit: {
		description: 'Selection limit with the maximum reached.',
		render: () => renderMultiSelectExample('limit')
	},
	open: {
		description: 'Filterable option menu with selected row state.',
		render: () => renderMultiSelectExample('open')
	}
})

function renderMultiSelectExample(state: 'default' | 'empty' | 'limit' | 'open'): ReactNode {
	switch (state) {
		case 'default':
			return (
				<Stack density="compact">
					<MultiSelect
						defaultValue={['design', 'ai']}
						help="Tags keep generated UI, product surface, and research coverage explicit."
						label="Workstream tags"
						options={multiSelectOptions}
					/>
					<MultiSelect
						defaultValue={['product']}
						label="Release lanes"
						maxSelected={2}
						options={multiSelectOptions}
						placeholder="Choose lanes..."
					/>
				</Stack>
			)
		case 'empty':
			return (
				<MultiSelect
					defaultValue={[]}
					help="Placeholder state before the first scoped tag is selected."
					label="Project tags"
					options={multiSelectOptions}
					placeholder="Add tags..."
				/>
			)
		case 'limit':
			return (
				<MultiSelect
					defaultValue={['design', 'ai']}
					help="Two active tags max. Additional options remain visible but selection is capped."
					label="Primary capabilities"
					maxSelected={2}
					options={multiSelectOptions}
				/>
			)
		case 'open':
			return (
				<MultiSelect
					defaultOpen
					defaultValue={['design', 'ai']}
					help="Open menu shows active rows, disabled options, metadata, and filtering chrome."
					label="Project tags"
					options={multiSelectOptions}
				/>
			)
	}
}
