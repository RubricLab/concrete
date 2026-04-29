import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { uploadItemSchema } from '../schemas'
import { ImageUpload } from './image-upload-view'

export { ImageUpload, type ImageUploadProps } from './image-upload-view'

const imageUploadVariantValues = ['single', 'avatar', 'grid'] as const

const uploadPreview =
	'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"%3E%3Crect width="80" height="80" fill="%23eef3fb"/%3E%3Cpath d="M18 56 34 36l10 12 8-10 10 18H18Z" fill="%231f6fd4"/%3E%3Ccircle cx="55" cy="25" r="6" fill="%23a9c6ef"/%3E%3C/svg%3E'

export const imageUploadComponentSchema = z
	.object({
		defaultValue: z.array(uploadItemSchema).default([]),
		label: z.string().default('Reference image'),
		queue: z.enum(['empty', 'success', 'error']).default('success'),
		variant: z.enum(imageUploadVariantValues).default('single')
	})
	.strict()

export const imageUploadComponentDefinition = defineConcreteComponent({
	category: 'media',
	component: ImageUpload,
	controls: [
		textControl('label', 'Label', 'Reference image'),
		selectControl('variant', 'Variant', 'single', imageUploadVariantValues),
		selectControl('queue', 'Queue', 'success', ['empty', 'success', 'error'])
	],
	description:
		'Image-specific upload composition with previews, accept filtering, and avatar/grid variants.',
	guidance:
		'Image upload is a tuned FileUpload preset for media previews. It does not crop, transform, or store assets.',
	kind: 'component',
	name: 'Image upload',
	pressure: ['product'],
	props: [
		prop('variant', "'single' | 'avatar' | 'grid'", 'Image preview layout preset.', 'single'),
		prop('value', 'readonly UploadItemValue[]', 'Controlled image queue.'),
		prop('defaultValue', 'readonly UploadItemValue[]', 'Uncontrolled initial image queue.', '[]'),
		prop('multiple', 'boolean', 'Allows multiple images in the queue.', 'true'),
		prop('onValueChange', '(value: readonly UploadItemValue[]) => void', 'Receives queue values.'),
		prop('label', 'ReactNode', 'Field label.')
	],
	renderExample: renderImageUploadExample,
	schema: imageUploadComponentSchema,
	slug: 'image-upload',
	states: states([
		['single', 'Single preview image upload.'],
		['avatar', 'Compact avatar-oriented image picker.'],
		['grid', 'Multi-image grid treatment.']
	])
})

function renderImageUploadExample(state = 'single'): ReactNode {
	return (
		<FormStage>
			<ImageUpload
				defaultValue={[
					{
						id: 'reference',
						name: 'interface-reference.png',
						previewUrl: uploadPreview,
						progress: 100,
						size: 840000,
						status: 'success',
						type: 'image/png'
					}
				]}
				label="Reference image"
				variant={state === 'avatar' ? 'avatar' : state === 'grid' ? 'grid' : 'single'}
			/>
		</FormStage>
	)
}

function FormStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 480, width: '100%' }}>{children}</div>
}
