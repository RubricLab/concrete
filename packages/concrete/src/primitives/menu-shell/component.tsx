import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { Kbd } from '../kbd/component'
import { cn } from '../utils'

export type MenuShellProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
}

export type MenuShellSearchProps = Omit<HTMLAttributes<HTMLLabelElement>, 'children'> & {
	inputProps?: InputHTMLAttributes<HTMLInputElement> | undefined
	shortcut?: ReactNode
}

export type MenuShellBodyProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
}

export type MenuShellGroupProps = HTMLAttributes<HTMLElement> & {
	children: ReactNode
	title: ReactNode
}

export type MenuShellFooterProps = HTMLAttributes<HTMLDivElement> & {
	children?: ReactNode
	end?: ReactNode
	start?: ReactNode
}

export type MenuShellEmptyProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
}

export function MenuShell({ children, className, ...props }: MenuShellProps) {
	return (
		<div className={cn(concreteClassNames.commandMenu, className)} {...props}>
			{children}
		</div>
	)
}

export function MenuShellSearch({
	className,
	inputProps,
	shortcut = 'Esc',
	...props
}: MenuShellSearchProps) {
	return (
		<label className={cn(concreteClassNames.commandSearch, className)} {...props}>
			<ConcreteIcon name="search" />
			<input {...inputProps} />
			{shortcut ? <Kbd>{shortcut}</Kbd> : null}
		</label>
	)
}

export function MenuShellBody({ children, className, ...props }: MenuShellBodyProps) {
	return (
		<div className={cn(concreteClassNames.commandBody, className)} {...props}>
			{children}
		</div>
	)
}

export function MenuShellGroup({ children, className, title, ...props }: MenuShellGroupProps) {
	return (
		<section className={cn(concreteClassNames.commandGroup, className)} {...props}>
			<div className={concreteClassNames.commandGroupTitle}>{title}</div>
			{children}
		</section>
	)
}

export function MenuShellFooter({
	children,
	className,
	end,
	start,
	...props
}: MenuShellFooterProps) {
	return (
		<div className={cn(concreteClassNames.commandFooter, className)} {...props}>
			{children ?? (
				<>
					<span>{start}</span>
					<span>{end}</span>
				</>
			)}
		</div>
	)
}

export function MenuShellEmpty({ children, className, ...props }: MenuShellEmptyProps) {
	return (
		<div className={cn(concreteClassNames.commandEmpty, className)} {...props}>
			{children}
		</div>
	)
}
