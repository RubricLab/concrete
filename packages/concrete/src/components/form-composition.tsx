import type { FormHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../icons'
import { Button } from '../primitives'
import { cn } from '../primitives/utils'
import type { FieldStatus } from '../schemas'
import classes from './components.module.css'

export type FormShellVariant = 'panel' | 'modal' | 'drawer'
export type FormGridColumns = 1 | 2 | 3
export type FormRowAlign = 'center' | 'start'

export type FormShellProps = Omit<FormHTMLAttributes<HTMLFormElement>, 'title'> & {
	actions?: ReactNode | undefined
	children: ReactNode
	compact?: boolean | undefined
	description?: ReactNode | undefined
	eyebrow?: ReactNode | undefined
	footer?: ReactNode | undefined
	meta?: ReactNode | undefined
	status?: FieldStatus | undefined
	title: ReactNode
	variant?: FormShellVariant | undefined
}

export function FormShell({
	actions,
	children,
	className,
	compact = false,
	description,
	eyebrow,
	footer,
	meta,
	status = 'default',
	title,
	variant = 'panel',
	...props
}: FormShellProps) {
	return (
		<form
			className={cn(classes.formShell, className)}
			data-compact={compact ? true : undefined}
			data-status={status}
			data-variant={variant}
			{...props}
		>
			<header className={classes.formShellHeader}>
				<div className={classes.formShellIntro}>
					{eyebrow ? <span className={classes.formEyebrow}>{eyebrow}</span> : null}
					<div className={classes.formShellTitleRow}>
						<h2>{title}</h2>
						{meta ? <span className={classes.formShellMeta}>{meta}</span> : null}
					</div>
					{description ? <p>{description}</p> : null}
				</div>
				{actions ? <div className={classes.formShellActions}>{actions}</div> : null}
			</header>
			<div className={classes.formShellBody}>{children}</div>
			{footer ? <footer className={classes.formShellFooter}>{footer}</footer> : null}
		</form>
	)
}

export type FormSectionProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
	action?: ReactNode | undefined
	children: ReactNode
	description?: ReactNode | undefined
	divided?: boolean | undefined
	eyebrow?: ReactNode | undefined
	title?: ReactNode | undefined
}

export function FormSection({
	action,
	children,
	className,
	description,
	divided = true,
	eyebrow,
	title,
	...props
}: FormSectionProps) {
	return (
		<section
			className={cn(classes.formSection, className)}
			data-divided={divided ? true : undefined}
			{...props}
		>
			{title || description || eyebrow || action ? (
				<header className={classes.formSectionHeader}>
					<div>
						{eyebrow ? <span className={classes.formEyebrow}>{eyebrow}</span> : null}
						{title ? <h3>{title}</h3> : null}
						{description ? <p>{description}</p> : null}
					</div>
					{action ? <div className={classes.formSectionAction}>{action}</div> : null}
				</header>
			) : null}
			<div className={classes.formSectionBody}>{children}</div>
		</section>
	)
}

export type FormGridProps = HTMLAttributes<HTMLDivElement> & {
	columns?: FormGridColumns | undefined
	compact?: boolean | undefined
}

export function FormGrid({
	children,
	className,
	columns = 2,
	compact = false,
	...props
}: FormGridProps) {
	return (
		<div
			className={cn(classes.formGrid, className)}
			data-columns={columns}
			data-compact={compact ? true : undefined}
			{...props}
		>
			{children}
		</div>
	)
}

export type FormRowProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	align?: FormRowAlign | undefined
	children?: ReactNode | undefined
	control?: ReactNode | undefined
	description?: ReactNode | undefined
	interactive?: boolean | undefined
	label: ReactNode
	meta?: ReactNode | undefined
	status?: FieldStatus | undefined
}

export function FormRow({
	align = 'center',
	children,
	className,
	control,
	description,
	interactive = false,
	label,
	meta,
	status = 'default',
	...props
}: FormRowProps) {
	return (
		<div
			className={cn(classes.formRow, className)}
			data-align={align}
			data-interactive={interactive ? true : undefined}
			data-status={status}
			{...props}
		>
			<div className={classes.formRowCopy}>
				<span className={classes.formRowLabel}>{label}</span>
				{description ? <span className={classes.formRowDescription}>{description}</span> : null}
			</div>
			{meta ? <span className={classes.formRowMeta}>{meta}</span> : null}
			<div className={classes.formRowControl}>{control ?? children}</div>
		</div>
	)
}

export type ValidationSummaryItem = {
	href?: string | undefined
	id: string
	label: ReactNode
	message: ReactNode
	status?: FieldStatus | undefined
}

export type ValidationSummaryProps = HTMLAttributes<HTMLDivElement> & {
	action?: ReactNode | undefined
	description?: ReactNode | undefined
	items?: readonly ValidationSummaryItem[] | undefined
	status?: FieldStatus | undefined
	title?: ReactNode | undefined
}

export function ValidationSummary({
	action,
	className,
	description,
	items = [],
	status = 'error',
	title = status === 'success' ? 'Ready to save' : 'Review required',
	...props
}: ValidationSummaryProps) {
	return (
		<div className={cn(classes.validationSummary, className)} data-status={status} {...props}>
			<div className={classes.validationSummaryIcon}>
				<ConcreteIcon name={status === 'success' ? 'check' : 'x'} />
			</div>
			<div className={classes.validationSummaryBody}>
				<div className={classes.validationSummaryHead}>
					<div>
						<b>{title}</b>
						{description ? <p>{description}</p> : null}
					</div>
					{action ? <div className={classes.validationSummaryAction}>{action}</div> : null}
				</div>
				{items.length > 0 ? (
					<ul className={classes.validationList}>
						{items.map(item => (
							<li data-status={item.status ?? status} key={item.id}>
								<ConcreteIcon name={item.status === 'success' ? 'check' : 'x'} />
								<span>
									{item.href ? <a href={item.href}>{item.label}</a> : <b>{item.label}</b>}
									<small>{item.message}</small>
								</span>
							</li>
						))}
					</ul>
				) : null}
			</div>
		</div>
	)
}

export type SettingsPanelRow = {
	control: ReactNode
	description?: ReactNode | undefined
	id: string
	label: ReactNode
	meta?: ReactNode | undefined
	status?: FieldStatus | undefined
}

export type SettingsPanelSection = {
	description?: ReactNode | undefined
	id: string
	rows: readonly SettingsPanelRow[]
	title: ReactNode
}

export type SettingsPanelProps = Omit<FormShellProps, 'children'> & {
	sections: readonly SettingsPanelSection[]
}

export function SettingsPanel({ sections, ...props }: SettingsPanelProps) {
	return (
		<FormShell compact {...props}>
			{sections.map(section => (
				<FormSection description={section.description} key={section.id} title={section.title}>
					{section.rows.map(row => (
						<FormRow
							control={row.control}
							description={row.description}
							key={row.id}
							label={row.label}
							meta={row.meta}
							status={row.status}
						/>
					))}
				</FormSection>
			))}
		</FormShell>
	)
}

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
			className={classes.formOverlay}
			data-presentation={presentation}
			data-size={size}
			data-type="dialog"
		>
			<div
				aria-modal={presentation === 'fixed' ? true : undefined}
				className={classes.formDialog}
				role="dialog"
			>
				<FormShell actions={chromeActions} className={className} variant="modal" {...props}>
					{children}
				</FormShell>
			</div>
		</div>
	)
}

export type FormDrawerSide = 'left' | 'right'

export type FormDrawerProps = Omit<FormShellProps, 'variant'> & {
	onOpenChange?: ((open: boolean) => void) | undefined
	open?: boolean | undefined
	presentation?: FormDialogPresentation | undefined
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
			className={classes.formOverlay}
			data-presentation={presentation}
			data-side={side}
			data-type="drawer"
		>
			<aside
				aria-modal={presentation === 'fixed' ? true : undefined}
				className={classes.formDrawer}
				role="dialog"
			>
				<FormShell actions={chromeActions} className={className} variant="drawer" {...props}>
					{children}
				</FormShell>
			</aside>
		</div>
	)
}
