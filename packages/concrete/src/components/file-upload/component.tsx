'use client'

import type { DragEvent, HTMLAttributes, ReactNode } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import { Dropzone, Field, UploadField, type UploadFieldKind, UploadItem } from '../../primitives'
import type { UploadItemValue } from '../../schemas'
import type { FieldChromeProps } from '../../utilities/form-field-helpers'
import {
	createUploadQueueItems,
	formatUploadMeta,
	releaseUploadPreview,
	releaseUploadPreviews
} from '../../utilities/upload-queue'

export type FileUploadDisplay = 'grid' | 'stack'

export type FileUploadProps = Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> &
	FieldChromeProps & {
		accept?: string | undefined
		defaultValue?: readonly UploadItemValue[] | undefined
		descriptionText?: ReactNode | undefined
		display?: FileUploadDisplay | undefined
		kind?: UploadFieldKind | undefined
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
	display = 'stack',
	error,
	help,
	kind = 'file',
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

	useEffect(() => () => releaseUploadPreviews(objectUrlsRef), [])

	function commitFiles(files: readonly File[]) {
		const nextItems = createUploadQueueItems(files, {
			accept,
			maxSize,
			objectUrlsRef,
			previewImages
		})
		const nextValue = multiple ? [...currentValue, ...nextItems] : nextItems.slice(0, 1)

		if (value === undefined) {
			setInternalValue(nextValue)
		}

		onFilesChange?.(files)
		onValueChange?.(nextValue)
	}

	function removeItem(item: UploadItemValue) {
		releaseUploadPreview(item, objectUrlsRef)

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
			<UploadField
				display={display}
				kind={kind}
				list={
					currentValue.length > 0
						? currentValue.map(item => (
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
							))
						: undefined
				}
				{...props}
			>
				<Dropzone
					actionFor={inputId}
					actionLabel="Choose files"
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
						hidden
						id={inputId}
						multiple={multiple}
						onChange={event => {
							commitFiles(Array.from(event.currentTarget.files ?? []))
							event.currentTarget.value = ''
						}}
						type="file"
					/>
				</Dropzone>
			</UploadField>
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
