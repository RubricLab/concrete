import { Button } from '../../primitives'
import { FormShell, type FormShellProps } from '../../primitives/internal/form-shell'
import { concreteClassNames } from '../../styles/class-names'

export type FormDrawerSide = 'left' | 'right'
export type FormDrawerPresentation = 'fixed' | 'inline'

export type FormDrawerProps = Omit<FormShellProps, 'variant'> & {
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
		<div
			className={concreteClassNames.formOverlay}
			data-presentation={presentation}
			data-side={side}
			data-type="drawer"
		>
			<aside
				aria-modal={presentation === 'fixed' ? true : undefined}
				className={concreteClassNames.formDrawer}
				role="dialog"
			>
				<FormShell actions={chromeActions} className={className} variant="drawer" {...props}>
					{children}
				</FormShell>
			</aside>
		</div>
	)
}
