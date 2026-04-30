import type { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

type RowIconSlot = IconName | ReactElement

export type RowProps = HTMLAttributes<HTMLDivElement> & {
	interactive?: boolean
	leadingIcon?: RowIconSlot
	meta?: ReactNode
}

export function Row({
	children,
	className,
	interactive = false,
	leadingIcon,
	meta,
	...props
}: RowProps) {
	return (
		<div
			className={cn(
				concreteClassNames.row,
				interactive && concreteClassNames.rowInteractive,
				className
			)}
			{...props}
		>
			{leadingIcon ? (
				<span className={concreteClassNames.rowIcon}>{renderRowIconSlot(leadingIcon)}</span>
			) : (
				<span />
			)}
			<span className={concreteClassNames.rowLabel}>{children}</span>
			{meta ? <span className={concreteClassNames.rowMeta}>{meta}</span> : null}
		</div>
	)
}

function renderRowIconSlot(icon: RowIconSlot | undefined): ReactNode {
	switch (typeof icon) {
		case 'string':
			return <ConcreteIcon name={icon} />
		default:
			return icon
	}
}
