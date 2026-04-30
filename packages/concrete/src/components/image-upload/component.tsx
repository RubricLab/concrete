'use client'

import { FileUpload, type FileUploadProps } from '../../primitives/internal/file-upload'
import { cn } from '../../primitives/utils'
import { concreteClassNames } from '../../styles/class-names'

export type ImageUploadProps = Omit<FileUploadProps, 'accept' | 'previewImages'> & {
	variant?: 'avatar' | 'grid' | 'single' | undefined
}

export function ImageUpload({ className, variant = 'single', ...props }: ImageUploadProps) {
	return (
		<div className={cn(concreteClassNames.imageUpload, className)} data-variant={variant}>
			<FileUpload
				accept="image/*"
				descriptionText="Drop images here or choose from disk."
				previewImages
				title="Upload images"
				{...props}
			/>
		</div>
	)
}
