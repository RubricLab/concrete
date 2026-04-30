import { prop } from '../../registry/props'

export const validationSummaryMeta = {
	category: 'feedback',
	description:
		'Top-level form feedback with status icon, field-linked items, compact copy, and optional action slot.',
	guidance:
		'Validation summary is for cross-field feedback and submit blocking. Field-level messages still live on Field, Input, and composed controls.',
	name: 'Validation summary',
	pressure: ['product'],
	props: [
		prop('title', 'ReactNode', 'Summary title.', 'Review required'),
		prop('description', 'ReactNode', 'Short explanation below the title.'),
		prop(
			'items',
			'readonly ValidationSummaryItem[]',
			'Field-linked validation rows. Serializable item shape is validated by formValidationItemSchema.',
			'[]'
		),
		prop('status', "'default' | 'error' | 'success'", 'Summary status tone.', 'error'),
		prop('action', 'ReactNode', 'Optional right-side action slot.')
	]
} as const
