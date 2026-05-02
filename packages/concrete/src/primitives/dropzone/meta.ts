import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DropzoneMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const dropzoneMeta = {
	category: 'form',
	description: 'Dashed upload target primitive with active, disabled, icon, and descriptive states.',
	guidance:
		'Dropzone is a visual target and label surface. Product code or a higher-level upload component owns file transport and storage.',
	name: 'Dropzone',
	pressure: ['product'],
	props: [
		prop('title', 'ReactNode', 'Primary drop target label.', 'Upload files'),
		prop('description', 'ReactNode', 'Secondary drop target copy.'),
		prop('actionLabel', 'ReactNode', 'Optional visible browse action label.'),
		prop('icon', 'IconName', 'Glyph shown in the circular affordance.', 'upload'),
		prop('active', 'boolean', 'Highlights drag-over state.', 'false'),
		prop('disabled', 'boolean', 'Locks the target visually and functionally.', 'false')
	]
} as const satisfies DropzoneMeta
