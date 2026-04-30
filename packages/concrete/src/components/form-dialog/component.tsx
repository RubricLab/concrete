import { Button } from '../../primitives'
import { FormShell, type FormShellProps } from '../../primitives/internal/form-shell'
import { concreteClassNames } from '../../styles/class-names'

export type FormDialogPresentation = 'fixed' | 'inline'
export type FormDialogSize = 'compact' | 'default' | 'wide'

export type FormDialogProps = Omit<FormShellProps, 'variant'> & {
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
		<div
			className={concreteClassNames.formOverlay}
			data-presentation={presentation}
			data-size={size}
			data-type="dialog"
		>
			<div
				aria-modal={presentation === 'fixed' ? true : undefined}
				className={concreteClassNames.formDialog}
				role="dialog"
			>
				<FormShell actions={chromeActions} className={className} variant="modal" {...props}>
					{children}
				</FormShell>
			</div>
		</div>
	)
}
