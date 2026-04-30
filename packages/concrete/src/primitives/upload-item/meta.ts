import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type UploadItemMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const uploadItemMeta = {
	category: 'media',
	description: 'Single uploaded-file row with thumbnail, progress, status, and remove affordance.',
	guidance:
		'Use UploadItem inside upload components or queues. Keep the row compact and let progress/status carry the interaction state.',
	name: 'Upload item',
	pressure: ['product'],
	props: [
		prop('name', 'ReactNode', 'Visible file name.', '', true),
		prop('meta', 'ReactNode', 'Size, type, or secondary upload metadata.'),
		prop('error', 'ReactNode', 'Error copy shown instead of metadata.'),
		prop('status', "'idle' | 'uploading' | 'success' | 'error'", 'Upload item status.', 'idle'),
		prop('progress', 'number', 'Optional 0-100 upload progress rail.'),
		prop('previewUrl', 'string', 'Image preview URL.'),
		prop('icon', 'IconName', 'Fallback glyph when no preview is present.', 'file'),
		prop('onRemove', '() => void', 'Shows and handles the remove affordance.')
	]
} as const satisfies UploadItemMeta
