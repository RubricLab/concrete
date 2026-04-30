import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type DataTablePagerDirection = 'next' | 'previous'

export type DataTablePagerProps = HTMLAttributes<HTMLElement> & {
	nextDisabled?: boolean | undefined
	onNext?: (() => void) | undefined
	onPrevious?: (() => void) | undefined
	page: ReactNode
	pageCount: ReactNode
	previousDisabled?: boolean | undefined
	selectedCount?: ReactNode
}

export function DataTablePager({
	className,
	nextDisabled = false,
	onNext,
	onPrevious,
	page,
	pageCount,
	previousDisabled = false,
	selectedCount = 0,
	...props
}: DataTablePagerProps) {
	return (
		<footer className={cn(concreteClassNames.dataTablePagination, className)} {...props}>
			<DataTablePagerButton direction="previous" disabled={previousDisabled} onClick={onPrevious} />
			<span>
				Page {page} / {pageCount}
			</span>
			<span>{selectedCount} selected</span>
			<DataTablePagerButton direction="next" disabled={nextDisabled} onClick={onNext} />
		</footer>
	)
}

export type DataTablePagerButtonProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'children'
> & {
	direction: DataTablePagerDirection
}

export function DataTablePagerButton({
	className,
	direction,
	type = 'button',
	...props
}: DataTablePagerButtonProps) {
	return (
		<button className={className} type={type} {...props}>
			<ConcreteIcon name={direction === 'previous' ? 'chevron-left' : 'chevron-right'} />
		</button>
	)
}
