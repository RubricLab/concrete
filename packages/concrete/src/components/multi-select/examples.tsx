import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { MultiSelect } from './component'
import { multiSelectComponentSchema } from './schema'

const multiSelectOptions = multiSelectComponentSchema.parse({}).options

export const multiSelectExamples = defineExamples({
	default: {
		description: 'Selected values rendered as removable tags.',
		render: () => renderMultiSelectExample('default')
	},
	empty: {
		description: 'Placeholder-only state before selection.',
		render: () => renderMultiSelectExample('empty')
	},
	open: {
		description: 'Filterable option menu with selected row state.',
		render: () => renderMultiSelectExample('open')
	}
})

function renderMultiSelectExample(state: 'default' | 'empty' | 'open'): ReactNode {
	return (
		<FormStage>
			<MultiSelect
				defaultOpen={state === 'open'}
				defaultValue={state === 'empty' ? [] : ['design', 'ai']}
				help="Tags are removable and options stay source-of-truth controlled by value."
				label="Project tags"
				options={multiSelectOptions}
			/>
		</FormStage>
	)
}

function FormStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 420, width: '100%' }}>{children}</div>
}
