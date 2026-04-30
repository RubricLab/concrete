import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { Button, type ButtonProps } from '../button'
import { ToolbarControl, type ToolbarControlProps } from '../toolbar-control'
import { cn } from '../utils'

export type ComposerShellProps = HTMLAttributes<HTMLDivElement> & {
	disabled?: boolean | undefined
}

export function ComposerShell({
	children,
	className,
	disabled = false,
	...props
}: ComposerShellProps) {
	return (
		<div
			className={cn(concreteClassNames.composer, className)}
			data-disabled={disabled ? true : undefined}
			{...props}
		>
			{children}
		</div>
	)
}

export type ComposerEditorProps = HTMLAttributes<HTMLDivElement> & {
	disabled?: boolean | undefined
	placeholder?: string | undefined
}

export const ComposerEditor = forwardRef<HTMLDivElement, ComposerEditorProps>(
	function ComposerEditor({ className, disabled = false, placeholder, tabIndex, ...props }, ref) {
		return (
			<div
				{...props}
				className={cn(concreteClassNames.editor, className)}
				contentEditable={!disabled}
				data-placeholder={placeholder}
				ref={ref}
				suppressContentEditableWarning
				tabIndex={disabled ? -1 : (tabIndex ?? 0)}
			/>
		)
	}
)

export type ComposerFooterProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
}

export function ComposerFooter({ children, className, ...props }: ComposerFooterProps) {
	return (
		<div className={cn(concreteClassNames.footer, className)} {...props}>
			{children}
		</div>
	)
}

export type ComposerToolbarProps = ToolbarControlProps

export function ComposerToolbar({
	className,
	compact = true,
	label = 'Composer tools',
	...props
}: ComposerToolbarProps) {
	return (
		<ToolbarControl
			className={cn(concreteClassNames.composerToolbar, className)}
			compact={compact}
			label={label}
			{...props}
		/>
	)
}

export type ComposerSubmitDockProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
}

export function ComposerSubmitDock({ children, className, ...props }: ComposerSubmitDockProps) {
	return (
		<div className={cn(concreteClassNames.submitDock, className)} {...props}>
			{children}
		</div>
	)
}

export type ComposerSendButtonProps = ButtonProps

export function ComposerSendButton({ className, ...props }: ComposerSendButtonProps) {
	return <Button className={cn(concreteClassNames.sendButton, className)} {...props} />
}
