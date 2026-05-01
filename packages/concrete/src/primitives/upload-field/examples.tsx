import { defineExamples } from '../../factories/createExamples'
import { Dropzone } from '../dropzone'
import { UploadItem } from '../upload-item'
import { UploadField, type UploadFieldKind } from './component'

export const uploadFieldExamples = defineExamples({
	avatar: {
		description: 'Compact media upload stack.',
		render: () => renderUploadFieldExample('avatar')
	},
	default: {
		description: 'Standard file upload stack.',
		render: () => renderUploadFieldExample('file')
	},
	file: {
		description: 'Standard file upload stack.',
		render: () => renderUploadFieldExample('file')
	},
	grid: {
		description: 'Media upload stack with grid queue intent.',
		render: () => renderUploadFieldExample('grid')
	}
})

function renderUploadFieldExample(kind: UploadFieldKind) {
	return (
		<UploadField
			display={kind === 'grid' ? 'grid' : 'stack'}
			kind={kind}
			list={
				<UploadItem meta="2.4 MB" name="interface-reference.png" progress={100} status="success" />
			}
		>
			<Dropzone
				actionLabel="Choose files"
				description="Drop files or choose from disk."
				title="Upload files"
			/>
		</UploadField>
	)
}
