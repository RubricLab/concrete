import type { HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type DropzoneProps = HTMLAttributes<HTMLDivElement> & {
	active?: boolean | undefined
	description?: ReactNode | undefined
	disabled?: boolean | undefined
	icon?: IconName | undefined
	title?: ReactNode | undefined
}

export function Dropzone({
	active = false,
	children,
	className,
	description = 'Drag and drop files here',
	disabled = false,
	icon = 'upload',
	title = 'Upload files',
	...props
}: DropzoneProps) {
	return (
		<div
			className={cn(concreteClassNames.dropzone, className)}
			data-active={active ? true : undefined}
			data-disabled={disabled ? true : undefined}
			{...props}
		>
			<span className={concreteClassNames.dropzoneIcon}>
				<ConcreteIcon name={icon} />
			</span>
			<span className={concreteClassNames.dropzoneTitle}>{title}</span>
			<span className={concreteClassNames.dropzoneDescription}>{description}</span>
			{children}
		</div>
	)
}
