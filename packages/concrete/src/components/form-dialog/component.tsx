import { Button } from '../../primitives'
import { FormLayoutShell, type FormLayoutShellProps } from '../../primitives/form-layout'
import { FormOverlayDialog, FormOverlayRoot } from '../../primitives/form-overlay'

export type FormDialogPresentation = 'fixed' | 'inline'
export type FormDialogSize = 'compact' | 'default' | 'wide'

export type FormDialogProps = Omit<FormLayoutShellProps, 'variant'> & {
	onOpenChange?: ((open: boolean) => void) | undefined
	open?: boolean | undefined
	presentation?: FormDialogPresentation | undefined
	size?: FormDialogSize | undefined
}

export function FormDialog({
	actions,
	children,
	className,
	onOpenChange,
	open = true,
	presentation = 'inline',
	size = 'default',
	...props
}: FormDialogProps) {
	if (!open) {
		return null
	}

	const chromeActions =
		actions || onOpenChange ? (
			<>
				{actions}
				{onOpenChange ? (
					<Button
						aria-label="Close dialog"
						leadingIcon="x"
						onClick={() => onOpenChange(false)}
						size="small"
						type="button"
						variant="ghost"
					/>
				) : null}
			</>
		) : undefined

	return (
		<FormOverlayRoot presentation={presentation} size={size} type="dialog">
			<FormOverlayDialog modal={presentation === 'fixed'}>
				<FormLayoutShell actions={chromeActions} className={className} variant="modal" {...props}>
					{children}
				</FormLayoutShell>
			</FormOverlayDialog>
		</FormOverlayRoot>
	)
}
