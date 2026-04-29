import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { ConcreteIcon, type IconName } from '../icons'
import {
	iconOptions,
	numberControl,
	selectControl,
	selectOptionsControl,
	textControl
} from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import type { UploadItemStatus } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { clampPercent, cn } from './utils'

type UploadProgressStyle = CSSProperties & {
	'--concrete-upload-progress'?: string
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

export const uploadItemPropsSchema = z
	.object({
		error: z.string().optional(),
		icon: z.string().default('file'),
		meta: z.string().optional(),
		name: z.string().min(1),
		progress: z.number().min(0).max(100).optional(),
		status: z.enum(['error', 'idle', 'success', 'uploading']).default('idle')
	})
	.strict()

export const uploadItemPrimitiveDefinition = defineConcretePrimitive({
	category: 'media',
	component: UploadItem,
	controls: [
		textControl('name', 'Name', 'Q2_report.pdf'),
		textControl('meta', 'Meta', '2.4 MB'),
		selectControl('status', 'Status', 'success', ['idle', 'uploading', 'success', 'error']),
		numberControl('progress', 'Progress', '100'),
		selectOptionsControl('icon', 'Icon', 'file', iconOptions),
		textControl('error', 'Error', '')
	],
	description: 'Single uploaded-file row with thumbnail, progress, status, and remove affordance.',
	guidance:
		'Use UploadItem inside upload components or queues. Keep the row compact and let progress/status carry the interaction state.',
	kind: 'primitive',
	name: 'Upload item',
	pressure: ['product'],
	props: [
		prop('name', 'ReactNode', 'Visible file name.', '', true),
		prop('meta', 'ReactNode', 'Size, type, or secondary upload metadata.'),
		prop('error', 'ReactNode', 'Error copy shown instead of metadata.'),
		prop('status', "'idle' | 'uploading' | 'success' | 'error'", 'Upload item status.', 'idle'),
		prop('progress', 'number', 'Optional 0-100 upload progress rail.'),
		prop('previewUrl', 'string', 'Image preview URL.'),
		prop('icon', 'IconName', 'Fallback glyph when no preview is present.', 'file'),
		prop('onRemove', '() => void', 'Shows and handles the remove affordance.')
	],
	renderExample: renderUploadItemExample,
	schema: uploadItemPropsSchema,
	slug: 'upload-item',
	states: states([
		['default', 'Completed file row.'],
		['uploading', 'Progress row.'],
		['image', 'Image row with preview affordance.'],
		['error', 'Rejected file row.']
	])
})

function renderUploadItemExample(state = 'default') {
	return (
		<Frame>
			<UploadItem
				error={state === 'error' ? 'File type is not accepted.' : undefined}
				icon={state === 'image' ? 'image' : 'file'}
				meta={state === 'uploading' ? '2.4 MB - 64%' : '2.4 MB'}
				name={state === 'image' ? 'interface-reference.png' : 'Q2_report.pdf'}
				progress={state === 'uploading' ? 64 : state === 'default' ? 100 : undefined}
				status={state === 'error' ? 'error' : state === 'uploading' ? 'uploading' : 'success'}
			/>
		</Frame>
	)
}
