'use client'

import type { DragEvent, HTMLAttributes } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import { Dropzone, Field, UploadField, UploadItem } from '../../primitives'
import type { UploadItemValue } from '../../schemas'
import type { FieldChromeProps } from '../../utilities/form-field-helpers'
import {
	createUploadQueueItems,
	formatUploadMeta,
	releaseUploadPreview,
	releaseUploadPreviews
} from '../../utilities/upload-queue'

export type ImageUploadKind = 'avatar' | 'grid' | 'single'

export type ImageUploadProps = Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> &
	FieldChromeProps & {
		defaultValue?: readonly UploadItemValue[] | undefined
		kind?: ImageUploadKind | undefined
		maxSize?: number | undefined
		multiple?: boolean | undefined
		onFilesChange?: ((files: readonly File[]) => void) | undefined
		onValueChange?: ((value: readonly UploadItemValue[]) => void) | undefined
		value?: readonly UploadItemValue[] | undefined
	}

export function ImageUpload({
	className,
	defaultValue = [],
	description,
	error,
	help,
	kind = 'single',
	label,
	maxSize,
	multiple = true,
	onFilesChange,
	onValueChange,
	optional,
	required,
	success,
	value,
	...props
}: ImageUploadProps) {
	const [internalValue, setInternalValue] = useState<readonly UploadItemValue[]>(defaultValue)
	const [dragActive, setDragActive] = useState(false)
	const objectUrlsRef = useRef<Set<string>>(new Set())
	const inputId = useId()
	const currentValue = value ?? internalValue

	useEffect(() => () => releaseUploadPreviews(objectUrlsRef), [])

	function commitFiles(files: readonly File[]) {
		const nextItems = createUploadQueueItems(files, {
			accept: 'image/*',
			maxSize,
			objectUrlsRef,
			previewImages: true
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
				display={kind === 'grid' ? 'grid' : 'stack'}
				kind={kind}
				list={
					currentValue.length > 0
						? currentValue.map(item => (
								<UploadItem
									error={item.error}
									icon="image"
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
					actionLabel="Choose images"
					active={dragActive}
					description="Drop images here or choose from disk."
					icon="image"
					onDragEnter={event => handleImageUploadDrag(event, setDragActive, true)}
					onDragLeave={event => handleImageUploadDrag(event, setDragActive, false)}
					onDragOver={event => handleImageUploadDrag(event, setDragActive, true)}
					onDrop={event => {
						event.preventDefault()
						setDragActive(false)
						commitFiles(Array.from(event.dataTransfer.files))
					}}
					title="Upload images"
				>
					<input
						accept="image/*"
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

function handleImageUploadDrag(
	event: DragEvent<HTMLElement>,
	setDragActive: (active: boolean) => void,
	active: boolean
) {
	event.preventDefault()
	event.stopPropagation()
	setDragActive(active)
}
