import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DisclosurePanelMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const disclosurePanelMeta = {
	category: 'surface',
	description: 'Generic details/summary disclosure panel for trace and inspection content.',
	guidance:
		'Use DisclosurePanel before creating reasoning- or tool-specific disclosure wrappers. Workflow mapping stays in components.',
	name: 'DisclosurePanel',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('summary', 'ReactNode', 'Summary trigger content.'),
		prop('open', 'boolean', 'Native details open state.'),
		prop('tone', "'default' | 'terminal' | 'error'", 'Semantic disclosure tone.'),
		prop('children', 'ReactNode', 'Disclosure body.')
	]
} as const satisfies DisclosurePanelMeta
