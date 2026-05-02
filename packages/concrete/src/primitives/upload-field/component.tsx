import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type UploadFieldKind = 'avatar' | 'file' | 'grid' | 'single'
export type UploadFieldDisplay = 'grid' | 'stack'

export type UploadFieldProps = HTMLAttributes<HTMLDivElement> & {
	children?: ReactNode | undefined
	display?: UploadFieldDisplay | undefined
	kind?: UploadFieldKind | undefined
	list?: ReactNode | undefined
}

export function UploadField({
	children,
	className,
	display = 'stack',
	kind = 'file',
	list,
	...props
}: UploadFieldProps) {
	const isImageUpload = kind !== 'file'

	return (
		<div
			className={cn(
				concreteClassNames.fileUpload,
				isImageUpload ? concreteClassNames.imageUpload : undefined,
				className
			)}
			data-kind={isImageUpload ? kind : undefined}
			{...props}
		>
			{children}
			{list ? (
				<div
					className={concreteClassNames.uploadList}
					data-layout={display === 'grid' ? 'grid' : undefined}
				>
					{list}
				</div>
			) : null}
		</div>
	)
}
