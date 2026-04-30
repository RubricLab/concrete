import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type InputMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const inputMeta = {
	category: 'form',
	description: 'Single-line field with label, help, leading icon, disabled, and error states.',
	guidance:
		'Input is the canonical single-line text field. Compose Field around it for richer form chrome.',
	name: 'Input',
	pressure: ['product', 'generative'],
	props: [
		prop('label', 'ReactNode', 'Optional field label.'),
		prop('help', 'ReactNode', 'Muted helper text.'),
		prop('error', 'ReactNode', 'Error copy and invalid treatment.'),
		prop('leadingIcon', 'IconName | ReactElement', 'Glyph inside the left field slot.'),
		prop('placeholder', 'string', 'Native placeholder text.'),
		prop('disabled', 'boolean', 'Native disabled behavior.')
	]
} as const satisfies InputMeta
