import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type UploadFieldVariant = 'avatar' | 'file' | 'grid' | 'single'

export type UploadFieldProps = HTMLAttributes<HTMLDivElement> & {
	children?: ReactNode | undefined
	variant?: UploadFieldVariant | undefined
}

export function UploadField({ children, className, variant = 'file', ...props }: UploadFieldProps) {
	const isImageUpload = variant !== 'file'

	return (
		<div
			className={cn(
				concreteClassNames.fileUpload,
				isImageUpload ? concreteClassNames.imageUpload : undefined,
				className
			)}
			data-variant={isImageUpload ? variant : undefined}
			{...props}
		>
			{children}
		</div>
	)
}
