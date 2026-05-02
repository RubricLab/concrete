import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import type { UploadItemValue } from '../../schemas'
import { ImageUpload } from './component'

const uploadPreview =
	'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"%3E%3Crect width="80" height="80" fill="%23eef3fb"/%3E%3Cpath d="M18 56 34 36l10 12 8-10 10 18H18Z" fill="%231f6fd4"/%3E%3Ccircle cx="55" cy="25" r="6" fill="%23a9c6ef"/%3E%3C/svg%3E'

const imageUploadExamplesByQueue = {
	empty: [],
	error: [
		{
			error: 'Image type is not accepted.',
			id: 'reference-error',
			name: 'reference.psd',
			size: 2840000,
			status: 'error',
			type: 'application/octet-stream'
		}
	],
	mixed: [
		{
			id: 'reference',
			name: 'interface-reference.png',
			previewUrl: uploadPreview,
			progress: 100,
			size: 840000,
			status: 'success',
			type: 'image/png'
		},
		{
			id: 'flow-detail',
			name: 'flow-detail.png',
			progress: 64,
			size: 620000,
			status: 'uploading',
			type: 'image/png'
		}
	],
	success: [
		{
			id: 'reference',
			name: 'interface-reference.png',
			previewUrl: uploadPreview,
			progress: 100,
			size: 840000,
			status: 'success',
			type: 'image/png'
		}
	],
	uploading: [
		{
			id: 'flow-detail',
			name: 'flow-detail.png',
			progress: 64,
			size: 620000,
			status: 'uploading',
			type: 'image/png'
		}
	]
} as const satisfies Record<string, readonly UploadItemValue[]>

export const imageUploadExamples = defineExamples({
	avatar: {
		description: 'Compact avatar-oriented image picker.',
		render: () => renderImageUploadExample('avatar', 'success')
	},
	default: {
		description: 'Single media upload with completed and active rows.',
		render: () => renderImageUploadExample('single', 'mixed')
	},
	empty: {
		description: 'Empty image drop target.',
		render: () => renderImageUploadExample('single', 'empty')
	},
	error: {
		description: 'Rejected image upload row.',
		render: () => renderImageUploadExample('single', 'error')
	},
	grid: {
		description: 'Multi-image grid treatment.',
		render: () => renderImageUploadExample('grid', 'mixed')
	},
	single: {
		description: 'Single preview image upload.',
		render: () => renderImageUploadExample('single', 'success')
	},
	uploading: {
		description: 'Active media upload progress row.',
		render: () => renderImageUploadExample('single', 'uploading')
	}
})

function renderImageUploadExample(
	kind: 'avatar' | 'grid' | 'single',
	queue: keyof typeof imageUploadExamplesByQueue
): ReactNode {
	return (
		<ImageUpload
			defaultValue={imageUploadExamplesByQueue[queue]}
			kind={kind}
			label={kind === 'avatar' ? 'Avatar' : 'Reference image'}
		/>
	)
}
