import { defineExamples } from '../../factories/createExamples'
import { Dropzone } from '../dropzone'
import { UploadItem } from '../upload-item'
import { UploadField, type UploadFieldKind } from './component'

const uploadPreview =
	'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"%3E%3Crect width="80" height="80" fill="%23eef3fb"/%3E%3Cpath d="M18 56 34 36l10 12 8-10 10 18H18Z" fill="%231f6fd4"/%3E%3Ccircle cx="55" cy="25" r="6" fill="%23a9c6ef"/%3E%3C/svg%3E'

export const uploadFieldExamples = defineExamples({
	avatar: {
		description: 'Compact media upload stack.',
		render: () => renderUploadFieldExample('avatar', 'avatar')
	},
	default: {
		description: 'Standard file upload stack.',
		render: () => renderUploadFieldExample('file', 'file')
	},
	file: {
		description: 'Standard file upload stack.',
		render: () => renderUploadFieldExample('file', 'file')
	},
	grid: {
		description: 'Media upload stack with grid queue intent.',
		render: () => renderUploadFieldExample('grid', 'grid')
	}
})

function renderUploadFieldExample(kind: UploadFieldKind, mode: 'avatar' | 'file' | 'grid') {
	return (
		<UploadField
			display={kind === 'grid' ? 'grid' : 'stack'}
			kind={kind}
			list={renderUploadFieldList(mode)}
		>
			<Dropzone
				actionLabel={mode === 'file' ? 'Choose files' : 'Choose images'}
				description={
					mode === 'file' ? 'Drop files or choose from disk.' : 'Drop references or choose from disk.'
				}
				icon={mode === 'file' ? 'upload' : 'image'}
				title={mode === 'file' ? 'Upload files' : 'Upload images'}
			/>
		</UploadField>
	)
}

function renderUploadFieldList(mode: 'avatar' | 'file' | 'grid') {
	switch (mode) {
		case 'avatar':
			return (
				<UploadItem
					icon="image"
					meta="Avatar - 840 KB"
					name="profile-reference.png"
					previewUrl={uploadPreview}
					progress={100}
					status="success"
				/>
			)
		case 'grid':
			return (
				<>
					<UploadItem
						icon="image"
						meta="840 KB"
						name="interface-reference.png"
						previewUrl={uploadPreview}
						progress={100}
						status="success"
					/>
					<UploadItem icon="image" meta="64%" name="flow-detail.png" progress={64} status="uploading" />
				</>
			)
		case 'file':
			return (
				<>
					<UploadItem meta="2.4 MB - PDF" name="Q2_report.pdf" progress={100} status="success" />
					<UploadItem meta="64%" name="source_packet.csv" progress={64} status="uploading" />
				</>
			)
	}
}
