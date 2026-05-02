import type { HTMLAttributes, ReactNode } from 'react'
import { Button, DialogSurface, Overlay, Panel } from '../../primitives'
import type { FieldStatus } from '../../schemas'

export type FormDialogPresentation = 'fixed' | 'inline'
export type FormDialogMeasure = 'compact' | 'default' | 'wide'

export type FormDialogProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	actions?: ReactNode | undefined
	children: ReactNode
	compact?: boolean | undefined
	description?: ReactNode | undefined
	footer?: ReactNode | undefined
	meta?: ReactNode | undefined
	onOpenChange?: ((open: boolean) => void) | undefined
	open?: boolean | undefined
	presentation?: FormDialogPresentation | undefined
	measure?: FormDialogMeasure | undefined
	status?: FieldStatus | undefined
	title: ReactNode
}

export function FormDialog({
	actions,
	children,
	className,
	compact = false,
	description,
	footer,
	meta,
	onOpenChange,
	open = true,
	presentation = 'inline',
	measure = 'default',
	status = 'default',
	title,
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
						density="small"
						hierarchy="ghost"
						leadingIcon="x"
						onClick={() => onOpenChange(false)}
						type="button"
					/>
				) : null}
			</>
		) : undefined

	return (
		<Overlay
			placement="center"
			presentation={presentation}
			scrim={presentation === 'fixed'}
			{...props}
		>
			<DialogSurface modal={presentation === 'fixed'} measure={measure}>
				<Panel
					actions={chromeActions}
					className={className}
					density={compact ? 'compact' : 'comfortable'}
					description={description}
					footer={footer}
					meta={meta}
					title={title}
					intent={status === 'error' ? 'error' : 'default'}
				>
					{children}
				</Panel>
			</DialogSurface>
		</Overlay>
	)
}
