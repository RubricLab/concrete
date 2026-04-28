import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../icons'
import type { FieldStatus, UploadItemStatus } from '../schemas'
import classes from './primitives.module.css'
import { clampPercent, cn } from './utils'

type UploadProgressStyle = CSSProperties & {
	'--concrete-upload-progress'?: string
}

export type FieldProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
	count?: number | undefined
	description?: ReactNode | undefined
	error?: ReactNode | undefined
	help?: ReactNode | undefined
	htmlFor?: string | undefined
	label?: ReactNode | undefined
	limit?: number | undefined
	optional?: boolean | undefined
	required?: boolean | undefined
	status?: FieldStatus | undefined
	success?: ReactNode | undefined
}

export function Field({
	children,
	className,
	count,
	description,
	error,
	help,
	htmlFor,
	label,
	limit,
	optional = false,
	required = false,
	status = 'default',
	success,
	...props
}: FieldProps) {
	const resolvedStatus = error ? 'error' : success ? 'success' : status
	const message = error ?? success ?? help
	const countText =
		count === undefined ? undefined : limit === undefined ? String(count) : `${count} / ${limit}`

	return (
		<div className={cn(classes.formField, className)} data-status={resolvedStatus} {...props}>
			{label || description || optional || required ? (
				<div className={classes.formFieldHead}>
					{label ? (
						<label className={classes.formFieldLabel} htmlFor={htmlFor}>
							{label}
							{required ? <span aria-hidden> *</span> : null}
						</label>
					) : null}
					{optional ? <span className={classes.formFieldMeta}>Optional</span> : null}
				</div>
			) : null}
			{description ? <div className={classes.formFieldDescription}>{description}</div> : null}
			{children}
			{message || countText ? (
				<div className={classes.formFieldFoot}>
					{message ? (
						<span className={classes.formFieldMessage} data-status={resolvedStatus}>
							{message}
						</span>
					) : (
						<span />
					)}
					{countText ? <span className={classes.formFieldCount}>{countText}</span> : null}
				</div>
			) : null}
		</div>
	)
}

export type DropzoneProps = HTMLAttributes<HTMLDivElement> & {
	active?: boolean | undefined
	description?: ReactNode | undefined
	disabled?: boolean | undefined
	icon?: IconName | undefined
	title?: ReactNode | undefined
}

export function Dropzone({
	active = false,
	children,
	className,
	description = 'Drag and drop files here',
	disabled = false,
	icon = 'upload',
	title = 'Upload files',
	...props
}: DropzoneProps) {
	return (
		<div
			className={cn(classes.dropzone, className)}
			data-active={active ? true : undefined}
			data-disabled={disabled ? true : undefined}
			{...props}
		>
			<span className={classes.dropzoneIcon}>
				<ConcreteIcon name={icon} />
			</span>
			<span className={classes.dropzoneTitle}>{title}</span>
			<span className={classes.dropzoneDescription}>{description}</span>
			{children}
		</div>
	)
}

export type UploadItemProps = HTMLAttributes<HTMLDivElement> & {
	error?: ReactNode | undefined
	icon?: IconName | undefined
	meta?: ReactNode | undefined
	name: ReactNode
	onRemove?: (() => void) | undefined
	previewUrl?: string | undefined
	progress?: number | undefined
	status?: UploadItemStatus | undefined
}

export function UploadItem({
	className,
	error,
	icon = 'file',
	meta,
	name,
	onRemove,
	previewUrl,
	progress,
	status = 'idle',
	...props
}: UploadItemProps) {
	const percent = progress === undefined ? undefined : clampPercent(progress)
	const progressStyle: UploadProgressStyle | undefined =
		percent === undefined ? undefined : { '--concrete-upload-progress': `${percent}%` }

	return (
		<div className={cn(classes.uploadItem, className)} data-status={status} {...props}>
			<span className={classes.uploadThumb}>
				{previewUrl ? <img alt="" src={previewUrl} /> : <ConcreteIcon name={icon} />}
			</span>
			<span className={classes.uploadCopy}>
				<b>{name}</b>
				{error ? <small data-status="error">{error}</small> : meta ? <small>{meta}</small> : null}
				{percent !== undefined ? (
					<span className={classes.uploadProgress} style={progressStyle}>
						<span />
					</span>
				) : null}
			</span>
			{onRemove ? (
				<button
					aria-label="Remove upload"
					className={classes.uploadRemove}
					onClick={onRemove}
					type="button"
				>
					<ConcreteIcon name="x" />
				</button>
			) : null}
		</div>
	)
}
