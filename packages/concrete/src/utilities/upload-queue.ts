import type { MutableRefObject } from 'react'
import type { UploadItemValue } from '../schemas'

export type UploadQueueOptions = {
	accept?: string | undefined
	maxSize?: number | undefined
	objectUrlsRef: MutableRefObject<Set<string>>
	previewImages?: boolean | undefined
}

export function createUploadQueueItems(
	files: readonly File[],
	options: UploadQueueOptions
): readonly UploadItemValue[] {
	return files.map(file => createUploadQueueItem(file, options))
}

export function createUploadQueueItem(
	file: File,
	{ accept, maxSize, objectUrlsRef, previewImages = false }: UploadQueueOptions
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

export function releaseUploadPreview(
	item: UploadItemValue,
	objectUrlsRef: MutableRefObject<Set<string>>
) {
	if (!item.previewUrl || !objectUrlsRef.current.has(item.previewUrl)) {
		return
	}

	URL.revokeObjectURL(item.previewUrl)
	objectUrlsRef.current.delete(item.previewUrl)
}

export function releaseUploadPreviews(objectUrlsRef: MutableRefObject<Set<string>>) {
	for (const url of objectUrlsRef.current) {
		URL.revokeObjectURL(url)
	}

	objectUrlsRef.current.clear()
}

export function isAcceptedFile(file: File, accept: string | undefined): boolean {
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

export function formatUploadMeta(item: UploadItemValue): string {
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
