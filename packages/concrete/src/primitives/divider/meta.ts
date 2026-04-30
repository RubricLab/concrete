import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DividerMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const dividerMeta = {
	category: 'layout',
	description: 'Hairline separator with optional mono label.',
	guidance:
		'Dividers separate dense groups without adding surface weight. Prefer labels only when the section name materially helps scanning.',
	name: 'Divider',
	pressure: ['product', 'editorial'],
	props: [prop('label', 'ReactNode', 'Optional mono caps label centered in the rule.')]
} as const satisfies DividerMeta
