import { prop } from '../../registry/props'

export const imageUploadMeta = {
	category: 'media',
	description:
		'Image-specific upload composition with previews, accept filtering, and avatar/grid kinds.',
	guidance:
		'Image upload is a tuned FileUpload preset for media previews. It does not crop, transform, or store assets.',
	name: 'Image upload',
	pressure: ['product'],
	props: [
		prop('kind', "'single' | 'avatar' | 'grid'", 'Image preview layout preset.', 'single'),
		prop('value', 'readonly UploadItemValue[]', 'Controlled image queue.'),
		prop('defaultValue', 'readonly UploadItemValue[]', 'Uncontrolled initial image queue.', '[]'),
		prop('multiple', 'boolean', 'Allows multiple images in the queue.', 'true'),
		prop('onValueChange', '(value: readonly UploadItemValue[]) => void', 'Receives queue values.'),
		prop('label', 'ReactNode', 'Field label.')
	]
} as const
