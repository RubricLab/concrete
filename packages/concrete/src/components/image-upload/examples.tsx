import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import type { UploadItemValue } from '../../schemas'
import { ImageUpload } from './component'

const uploadPreview =
	'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"%3E%3Crect width="80" height="80" fill="%23eef3fb"/%3E%3Cpath d="M18 56 34 36l10 12 8-10 10 18H18Z" fill="%231f6fd4"/%3E%3Ccircle cx="55" cy="25" r="6" fill="%23a9c6ef"/%3E%3C/svg%3E'

const imageUploadItems = [
	{
		id: 'reference',
		name: 'interface-reference.png',
		previewUrl: uploadPreview,
		progress: 100,
		size: 840000,
		status: 'success',
		type: 'image/png'
	}
] as const satisfies readonly UploadItemValue[]

export const imageUploadExamples = defineExamples({
	avatar: {
		description: 'Compact avatar-oriented image picker.',
		render: () => renderImageUploadExample('avatar')
	},
	default: {
		description: 'Single preview image upload.',
		render: () => renderImageUploadExample('single')
	},
	empty: {
		description: 'Empty image drop target.',
		render: () => (
			<>
				<ImageUpload defaultValue={[]} label="Reference image" />
			</>
		)
	},
	error: {
		description: 'Rejected image upload row.',
		render: () => (
			<>
				<ImageUpload
					defaultValue={[
						{
							error: 'Image type is not accepted.',
							id: 'reference-error',
							name: 'reference.psd',
							size: 2840000,
							status: 'error',
							type: 'application/octet-stream'
						}
					]}
					label="Reference image"
				/>
			</>
		)
	},
	grid: {
		description: 'Multi-image grid treatment.',
		render: () => renderImageUploadExample('grid')
	},
	single: {
		description: 'Single preview image upload.',
		render: () => renderImageUploadExample('single')
	}
})

function renderImageUploadExample(variant: 'avatar' | 'grid' | 'single'): ReactNode {
	return <ImageUpload defaultValue={imageUploadItems} label="Reference image" variant={variant} />
}
