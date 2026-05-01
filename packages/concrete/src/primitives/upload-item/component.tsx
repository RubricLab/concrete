import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import type { UploadItemStatus } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { clampPercent, cn } from '../utils'

type UploadProgressStyle = CSSProperties & {
	'--concrete-media-progress-value'?: string
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
		percent === undefined ? undefined : { '--concrete-media-progress-value': `${percent}%` }

	return (
		<div className={cn(concreteClassNames.uploadItem, className)} data-status={status} {...props}>
			<span className={concreteClassNames.uploadThumb}>
				{previewUrl ? <img alt="" src={previewUrl} /> : <ConcreteIcon name={icon} />}
			</span>
			<span className={concreteClassNames.uploadCopy}>
				<b>{name}</b>
				{error ? <small data-status="error">{error}</small> : meta ? <small>{meta}</small> : null}
				{percent !== undefined ? (
					<span className={concreteClassNames.uploadProgress} style={progressStyle}>
						<span />
					</span>
				) : null}
			</span>
			{onRemove ? (
				<button
					aria-label="Remove upload"
					className={concreteClassNames.uploadRemove}
					onClick={onRemove}
					type="button"
				>
					<ConcreteIcon name="x" />
				</button>
			) : null}
		</div>
	)
}
