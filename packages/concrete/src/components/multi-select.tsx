import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { booleanControl, numberControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { multiSelectOptionSchema } from '../schemas'
import { MultiSelect } from './multi-select-view'

export * from './multi-select-view'

const multiSelectOptions = [
	{
		description: 'Foundations and primitives',
		disabled: false,
		label: 'Design system',
		meta: 'core',
		value: 'design'
	},
	{
		description: 'Agentic interaction layer',
		disabled: false,
		label: 'AI native',
		meta: 'lab',
		value: 'ai'
	},
	{
		description: 'Dashboards and data flows',
		disabled: false,
		label: 'Product',
		meta: 'dense',
		value: 'product'
	},
	{ disabled: true, label: 'Archived', meta: 'locked', value: 'archived' }
]

export const multiSelectComponentSchema = z
	.object({
		defaultOpen: z.boolean().default(false),
		defaultValue: z.array(z.string()).default(['design', 'ai']),
		label: z.string().default('Project tags'),
		maxSelected: z.number().int().positive().optional(),
		options: z.array(multiSelectOptionSchema).default(multiSelectOptions)
	})
	.strict()

export const multiSelectComponentDefinition = defineConcreteComponent({
	category: 'form',
	component: MultiSelect,
	controls: [
		textControl('label', 'Label', 'Project tags'),
		selectControl('selection', 'Selection', 'default', ['default', 'single', 'empty']),
		booleanControl('open', 'Open', 'false'),
		numberControl('maxSelected', 'Max', '3')
	],
	description:
		'Tag-backed option picker with local filtering, disabled options, max selection, and removable values.',
	guidance:
		'Multi select composes Field, Tag, and menu rows. It owns local picker interaction; product code owns option sourcing and persistence.',
	kind: 'component',
	name: 'Multi select',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'options',
			'readonly MultiSelectOption[]',
			'Options validated by multiSelectOptionSchema.',
			'',
			true
		),
		prop('value', 'readonly string[]', 'Controlled selected option values.'),
		prop('defaultValue', 'readonly string[]', 'Uncontrolled initial selected values.', '[]'),
		prop('defaultOpen', 'boolean', 'Initial menu state for demos and screenshots.', 'false'),
		prop('maxSelected', 'number', 'Optional maximum selected item count.'),
		prop('placeholder', 'string', 'Placeholder when no values are selected.', 'Select options...'),
		prop('onValueChange', '(value: readonly string[]) => void', 'Receives the selected value ids.'),
		prop('label', 'ReactNode', 'Field label.')
	],
	renderExample: renderMultiSelectExample,
	schema: multiSelectComponentSchema,
	slug: 'multi-select',
	states: states([
		['default', 'Selected values rendered as removable tags.'],
		['open', 'Filterable option menu with selected row state.'],
		['empty', 'Placeholder-only state before selection.']
	])
})

function renderMultiSelectExample(state = 'default'): ReactNode {
	return (
		<FormStage>
			<MultiSelect
				defaultValue={state === 'empty' ? [] : ['design', 'ai']}
				defaultOpen={state === 'open'}
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
