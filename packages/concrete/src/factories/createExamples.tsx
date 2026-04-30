import type { ReactNode } from 'react'
import { states } from '../registry/props'
import type { PrimitiveState } from '../registry/types'

export type ItemExample = {
	description: string
	render: () => ReactNode
}

export function defineExamples<const Examples extends Record<string, ItemExample>>(
	examples: Examples
): Examples {
	return examples
}

export function exampleStates(
	examples: Record<string, ItemExample>,
	order?: readonly string[]
): readonly PrimitiveState[] {
	const orderedEntries = order
		? order.flatMap(query => {
				const example = examples[query]
				return example ? [[query, example] as const] : []
			})
		: Object.entries(examples)

	return states(orderedEntries.map(([query, example]) => [query, example.description]))
}

export function renderExample(examples: Record<string, ItemExample>, state = 'default'): ReactNode {
	return (examples[state] ?? examples.default)?.render()
}
