import type { HTMLAttributes, ReactNode } from 'react'
import { Button, DrawerSurface, Overlay, Panel } from '../../primitives'
import type { FieldStatus } from '../../schemas'

export type FormDrawerSide = 'left' | 'right'
export type FormDrawerPresentation = 'fixed' | 'inline'

export type FormDrawerProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	actions?: ReactNode | undefined
	children: ReactNode
	compact?: boolean | undefined
	description?: ReactNode | undefined
	footer?: ReactNode | undefined
	meta?: ReactNode | undefined
	onOpenChange?: ((open: boolean) => void) | undefined
	open?: boolean | undefined
	presentation?: FormDrawerPresentation | undefined
	side?: FormDrawerSide | undefined
	status?: FieldStatus | undefined
	title: ReactNode
}

export function FormDrawer({
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
	side = 'right',
	status = 'default',
	title,
	...props
}: FormDrawerProps) {
	if (!open) {
		return null
	}

	const chromeActions =
		actions || onOpenChange ? (
			<>
				{actions}
				{onOpenChange ? (
					<Button
						aria-label="Close drawer"
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
			placement={side === 'left' ? 'start' : 'end'}
			presentation={presentation}
			scrim={presentation === 'fixed'}
			{...props}
		>
			<DrawerSurface modal={presentation === 'fixed'} side={side}>
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
			</DrawerSurface>
		</Overlay>
	)
}
