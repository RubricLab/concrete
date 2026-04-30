import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type FormOverlayRootPresentation = 'fixed' | 'inline'
export type FormOverlayRootSide = 'left' | 'right'
export type FormOverlayRootSize = 'compact' | 'default' | 'wide'
export type FormOverlayRootType = 'dialog' | 'drawer'

export type FormOverlayRootProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
	presentation?: FormOverlayRootPresentation | undefined
	side?: FormOverlayRootSide | undefined
	size?: FormOverlayRootSize | undefined
	type?: FormOverlayRootType | undefined
}

export function FormOverlayRoot({
	children,
	className,
	presentation = 'inline',
	side,
	size = 'default',
	type = 'dialog',
	...props
}: FormOverlayRootProps) {
	return (
		<div
			className={cn(concreteClassNames.formOverlay, className)}
			data-presentation={presentation}
			data-side={side}
			data-size={size}
			data-type={type}
			{...props}
		>
			{children}
		</div>
	)
}

export type FormOverlayDialogProps = Omit<HTMLAttributes<HTMLDivElement>, 'role'> & {
	modal?: boolean | undefined
}

export function FormOverlayDialog({ className, modal = false, ...props }: FormOverlayDialogProps) {
	return (
		<div
			aria-modal={modal ? true : undefined}
			className={cn(concreteClassNames.formDialog, className)}
			role="dialog"
			{...props}
		/>
	)
}

export type FormOverlayDrawerProps = Omit<HTMLAttributes<HTMLElement>, 'role'> & {
	modal?: boolean | undefined
}

export function FormOverlayDrawer({ className, modal = false, ...props }: FormOverlayDrawerProps) {
	return (
		<aside
			aria-modal={modal ? true : undefined}
			className={cn(concreteClassNames.formDrawer, className)}
			role="dialog"
			{...props}
		/>
	)
}
