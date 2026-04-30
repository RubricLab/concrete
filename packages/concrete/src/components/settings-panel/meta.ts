import { prop } from '../../registry/props'

export const settingsPanelMeta = {
	category: 'layout',
	description:
		'Dense settings form composed from shell, sections, rows, and slotted primitive controls.',
	guidance:
		'Settings panel is a row-based assembly helper. It standardizes layout and hierarchy while every control stays an explicit primitive or component slot.',
	name: 'Settings panel',
	pressure: ['product'],
	props: [
		prop(
			'sections',
			'readonly SettingsPanelSection[]',
			'Section and row metadata with explicit ReactNode control slots. Serializable metadata is validated by settingsPanelSectionSchema.',
			'',
			true
		),
		prop('title', 'ReactNode', 'Primary form title rendered in the shell header.', undefined, true),
		prop('description', 'ReactNode', 'Supporting copy below the title.'),
		prop('eyebrow', 'ReactNode', 'Optional compact section label above the title.'),
		prop('meta', 'ReactNode', 'Small metadata beside the title.'),
		prop('actions', 'ReactNode', 'Header action slot.'),
		prop('footer', 'ReactNode', 'Footer action slot, usually cancel and submit buttons.'),
		prop('status', "'default' | 'error' | 'success'", 'Outer status border treatment.', 'default'),
		prop('compact', 'boolean', 'Tightens header/body spacing for dense settings.', 'false'),
		prop('FormRow.control', 'ReactNode', 'Right-aligned primitive or component control slot.')
	]
} as const
