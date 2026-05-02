import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type PaginationDirection = 'next' | 'previous'

export type PaginationProps = HTMLAttributes<HTMLElement> & {
	nextDisabled?: boolean | undefined
	onNext?: (() => void) | undefined
	onPrevious?: (() => void) | undefined
	page: ReactNode
	pageCount: ReactNode
	previousDisabled?: boolean | undefined
	selectedCount?: ReactNode
}

export function Pagination({
	className,
	nextDisabled = false,
	onNext,
	onPrevious,
	page,
	pageCount,
	previousDisabled = false,
	selectedCount = 0,
	...props
}: PaginationProps) {
	return (
		<footer className={cn(concreteClassNames.pagination, className)} {...props}>
			<PaginationButton direction="previous" disabled={previousDisabled} onClick={onPrevious} />
			<span>
				Page {page} / {pageCount}
			</span>
			<span>{selectedCount} selected</span>
			<PaginationButton direction="next" disabled={nextDisabled} onClick={onNext} />
		</footer>
	)
}

export type PaginationButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	direction: PaginationDirection
}

export function PaginationButton({
	className,
	direction,
	type = 'button',
	...props
}: PaginationButtonProps) {
	return (
		<button className={className} type={type} {...props}>
			<ConcreteIcon name={direction === 'previous' ? 'chevron-left' : 'chevron-right'} />
		</button>
	)
}
