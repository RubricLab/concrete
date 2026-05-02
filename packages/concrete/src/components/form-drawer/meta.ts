import { prop } from '../../registry/props'

export const formDrawerMeta = {
	category: 'layout',
	description: 'Inline or fixed side-sheet form surface for inspect-and-edit workflows.',
	guidance:
		'Form drawer is for contextual editing beside dense product surfaces. Compose rows and sections with FieldRow, Section, and explicit controls.',
	name: 'Form drawer',
	pressure: ['product'],
	props: [
		prop('open', 'boolean', 'Controls whether the drawer renders.', 'true'),
		prop(
			'presentation',
			"'inline' | 'fixed'",
			'Inline documentation stage or fixed viewport overlay.',
			'inline'
		),
		prop('side', "'left' | 'right'", 'Drawer edge for fixed or inline stages.', 'right'),
		prop('onOpenChange', '(open: boolean) => void', 'Close affordance callback.'),
		prop('title', 'ReactNode', 'Primary form title rendered in the shell header.', undefined, true),
		prop('description', 'ReactNode', 'Supporting copy below the title.'),
		prop('footer', 'ReactNode', 'Footer action slot, usually cancel and submit buttons.'),
		prop('status', "'default' | 'error' | 'success'", 'Outer status border treatment.', 'default'),
		prop('children', 'ReactNode', 'Drawer form content.')
	]
} as const
