import { Button } from '../../primitives'
import { FormLayoutShell, type FormLayoutShellProps } from '../../primitives/form-layout'
import { FormOverlayDrawer, FormOverlayRoot } from '../../primitives/form-overlay'

export type FormDrawerSide = 'left' | 'right'
export type FormDrawerPresentation = 'fixed' | 'inline'

export type FormDrawerProps = Omit<FormLayoutShellProps, 'variant'> & {
	onOpenChange?: ((open: boolean) => void) | undefined
	open?: boolean | undefined
	presentation?: FormDrawerPresentation | undefined
	side?: FormDrawerSide | undefined
}

export function FormDrawer({
	actions,
	children,
	className,
	onOpenChange,
	open = true,
	presentation = 'inline',
	side = 'right',
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
		<FormOverlayRoot presentation={presentation} side={side} type="drawer">
			<FormOverlayDrawer modal={presentation === 'fixed'}>
				<FormLayoutShell actions={chromeActions} className={className} variant="drawer" {...props}>
					{children}
				</FormLayoutShell>
			</FormOverlayDrawer>
		</FormOverlayRoot>
	)
}
