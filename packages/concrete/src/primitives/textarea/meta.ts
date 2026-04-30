import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type TextareaMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const textareaMeta = {
	category: 'form',
	description: 'Multi-line prompt and prose input with validation support.',
	guidance:
		'Textarea is for prompt and prose entry. Keep surrounding composition responsible for actions.',
	name: 'Textarea',
	pressure: ['product', 'generative', 'editorial'],
	props: [
		prop('label', 'ReactNode', 'Optional field label.'),
		prop('help', 'ReactNode', 'Muted helper text.'),
		prop('error', 'ReactNode', 'Error copy and invalid treatment.'),
		prop('placeholder', 'string', 'Native placeholder text.')
	]
} as const satisfies TextareaMeta
