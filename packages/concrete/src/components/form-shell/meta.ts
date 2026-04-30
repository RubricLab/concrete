import { prop } from '../../registry/props'

export const formShellMeta = {
	category: 'layout',
	description:
		'Canonical form container with title hierarchy, metadata, action slots, body spacing, status border, and sticky-feeling footer.',
	guidance:
		'Form shell owns product form chrome and density. It deliberately slots controls and policy so persistence, submit rules, and validation source stay in application code.',
	name: 'Form shell',
	pressure: ['product'],
	props: [
		prop('title', 'ReactNode', 'Primary form title rendered in the shell header.', undefined, true),
		prop('description', 'ReactNode', 'Supporting copy below the title.'),
		prop('eyebrow', 'ReactNode', 'Optional compact section label above the title.'),
		prop('meta', 'ReactNode', 'Small metadata beside the title.'),
		prop('actions', 'ReactNode', 'Header action slot.'),
		prop('footer', 'ReactNode', 'Footer action slot, usually cancel and submit buttons.'),
		prop('variant', "'panel' | 'modal' | 'drawer'", 'Surface treatment for the shell.', 'panel'),
		prop('status', "'default' | 'error' | 'success'", 'Outer status border treatment.', 'default'),
		prop('compact', 'boolean', 'Tightens header/body spacing for dense settings.', 'false'),
		prop('FormSection.title', 'ReactNode', 'Section title slot.'),
		prop('FormGrid.columns', '1 | 2 | 3', 'Responsive field grid column count.', '2'),
		prop('FormRow.control', 'ReactNode', 'Right-aligned primitive or component control slot.')
	]
} as const
