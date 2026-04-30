'use client'

import { FileUpload, type FileUploadProps } from '../../primitives/internal/file-upload'

export type ImageUploadProps = Omit<
	FileUploadProps,
	'accept' | 'previewImages' | 'uploadListLayout' | 'variant'
> & {
	variant?: 'avatar' | 'grid' | 'single' | undefined
}

export function ImageUpload({ variant = 'single', ...props }: ImageUploadProps) {
	return (
		<FileUpload
			accept="image/*"
			descriptionText="Drop images here or choose from disk."
			previewImages
			title="Upload images"
			uploadListLayout={getImageUploadListLayout(variant)}
			variant={variant}
			{...props}
		/>
	)
}

function getImageUploadListLayout(variant: ImageUploadProps['variant']): 'grid' | undefined {
	switch (variant) {
		case 'grid':
			return 'grid'
		case 'avatar':
		case 'single':
		case undefined:
			return undefined
	}
}
