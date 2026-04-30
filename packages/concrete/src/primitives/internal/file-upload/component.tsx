'use client'

import type { DragEvent, HTMLAttributes, MutableRefObject, ReactNode } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import type { UploadItemValue } from '../../../schemas'
import { concreteClassNames } from '../../../styles/class-names'
import type { FieldChromeProps } from '../../../utilities/form-field-helpers'
import { Dropzone } from '../../dropzone'
import { Field } from '../../field'
import { UploadItem, type UploadItemProps } from '../../upload-item'

export type FileUploadProps = Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> &
	FieldChromeProps & {
		accept?: string | undefined
		defaultValue?: readonly UploadItemValue[] | undefined
		descriptionText?: ReactNode | undefined
		maxSize?: number | undefined
		multiple?: boolean | undefined
		onFilesChange?: ((files: readonly File[]) => void) | undefined
		onValueChange?: ((value: readonly UploadItemValue[]) => void) | undefined
		previewImages?: boolean | undefined
		title?: ReactNode | undefined
		value?: readonly UploadItemValue[] | undefined
	}

export function FileUpload({
	accept,
	className,
	defaultValue = [],
	description,
	descriptionText = 'Drag and drop files here',
	error,
	help,
	label,
	maxSize,
	multiple = true,
	onFilesChange,
	onValueChange,
	optional,
	previewImages = false,
	required,
	success,
	title = 'Upload files',
	value,
	...props
}: FileUploadProps) {
	const [internalValue, setInternalValue] = useState<readonly UploadItemValue[]>(defaultValue)
	const [dragActive, setDragActive] = useState(false)
	const objectUrlsRef = useRef<Set<string>>(new Set())
	const inputId = useId()
	const currentValue = value ?? internalValue

	useEffect(
		() => () => {
			for (const url of objectUrlsRef.current) {
				URL.revokeObjectURL(url)
			}
		},
		[]
	)

	function commitFiles(files: readonly File[]) {
		const nextItems = files.map(file =>
			createUploadItem(file, accept, maxSize, previewImages, objectUrlsRef)
		)
		const nextValue = multiple ? [...currentValue, ...nextItems] : nextItems.slice(0, 1)

		if (value === undefined) {
			setInternalValue(nextValue)
		}

		onFilesChange?.(files)
		onValueChange?.(nextValue)
	}

	function removeItem(item: UploadItemValue) {
		if (item.previewUrl && objectUrlsRef.current.has(item.previewUrl)) {
			URL.revokeObjectURL(item.previewUrl)
			objectUrlsRef.current.delete(item.previewUrl)
		}

		const nextValue = currentValue.filter(valueItem => valueItem.id !== item.id)

		if (value === undefined) {
			setInternalValue(nextValue)
		}

		onValueChange?.(nextValue)
	}

	return (
		<Field
			className={className}
			description={description}
			error={error}
			help={help}
			label={label}
			optional={optional}
			required={required}
			success={success}
		>
			<div className={concreteClassNames.fileUpload} {...props}>
				<Dropzone
					active={dragActive}
					description={descriptionText}
					onDragEnter={event => handleUploadDrag(event, setDragActive, true)}
					onDragLeave={event => handleUploadDrag(event, setDragActive, false)}
					onDragOver={event => handleUploadDrag(event, setDragActive, true)}
					onDrop={event => {
						event.preventDefault()
						setDragActive(false)
						commitFiles(Array.from(event.dataTransfer.files))
					}}
					title={title}
				>
					<input
						accept={accept}
						className={concreteClassNames.fileInput}
						id={inputId}
						multiple={multiple}
						onChange={event => {
							commitFiles(Array.from(event.currentTarget.files ?? []))
							event.currentTarget.value = ''
						}}
						type="file"
					/>
					<label className={concreteClassNames.fileUploadAction} htmlFor={inputId}>
						Choose files
					</label>
				</Dropzone>
				{currentValue.length > 0 ? (
					<div className={concreteClassNames.uploadList}>
						{currentValue.map(item => (
							<UploadItem
								error={item.error}
								key={item.id}
								meta={formatUploadMeta(item)}
								name={item.name}
								onRemove={() => removeItem(item)}
								previewUrl={item.previewUrl}
								progress={item.progress}
								status={item.status}
							/>
						))}
					</div>
				) : null}
			</div>
		</Field>
	)
}

function handleUploadDrag(
	event: DragEvent<HTMLElement>,
	setDragActive: (active: boolean) => void,
	active: boolean
) {
	event.preventDefault()
	event.stopPropagation()
	setDragActive(active)
}

function createUploadItem(
	file: File,
	accept: string | undefined,
	maxSize: number | undefined,
	previewImages: boolean,
	objectUrlsRef: MutableRefObject<Set<string>>
): UploadItemValue {
	const accepted = isAcceptedFile(file, accept)
	const sized = maxSize === undefined || file.size <= maxSize
	const previewUrl =
		previewImages && file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined

	if (previewUrl) {
		objectUrlsRef.current.add(previewUrl)
	}

	return {
		...(accepted && sized
			? {}
			: { error: accepted ? 'File is too large.' : 'File type is not accepted.' }),
		id: `${file.name}-${file.size}-${file.lastModified}`,
		name: file.name,
		...(previewUrl ? { previewUrl } : {}),
		progress: accepted && sized ? 100 : undefined,
		size: file.size,
		status: accepted && sized ? 'success' : 'error',
		type: file.type || 'application/octet-stream'
	}
}

function isAcceptedFile(file: File, accept: string | undefined): boolean {
	if (!accept) {
		return true
	}

	return accept.split(',').some(part => {
		const token = part.trim().toLowerCase()

		if (!token) {
			return false
		}

		if (token.endsWith('/*')) {
			return file.type.toLowerCase().startsWith(token.slice(0, -1))
		}

		if (token.startsWith('.')) {
			return file.name.toLowerCase().endsWith(token)
		}

		return file.type.toLowerCase() === token
	})
}

function formatUploadMeta(item: UploadItemValue): UploadItemProps['meta'] {
	if (item.status === 'uploading' && item.progress !== undefined) {
		return `${formatBytes(item.size)} - ${item.progress}%`
	}

	return formatBytes(item.size)
}

function formatBytes(value: number): string {
	if (value >= 1024 * 1024) {
		return `${(value / (1024 * 1024)).toFixed(1)} MB`
	}

	if (value >= 1024) {
		return `${Math.round(value / 1024)} KB`
	}

	return `${value} B`
}
