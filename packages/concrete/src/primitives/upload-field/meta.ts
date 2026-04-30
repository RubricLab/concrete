import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type UploadFieldMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const uploadFieldMeta = {
	category: 'form',
	description: 'Upload stack primitive for drop targets, queued rows, and media width variants.',
	guidance:
		'UploadField owns upload layout and sizing only. Dropzone owns the target, UploadItem owns rows, and higher-level components own file state.',
	name: 'Upload field',
	pressure: ['product', 'generative'],
	props: [
		prop('variant', "'file' | 'single' | 'grid' | 'avatar'", 'Upload layout width contract.', 'file')
	]
} as const satisfies UploadFieldMeta
