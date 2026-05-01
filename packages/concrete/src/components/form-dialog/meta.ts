import { prop } from '../../registry/props'

export const formDialogMeta = {
	category: 'layout',
	description: 'Inline or fixed modal form surface inside a dimmed stage.',
	guidance:
		'Form dialog provides the constrained form surface. Product code owns focus trapping and portal strategy when using fixed presentation.',
	name: 'Form dialog',
	pressure: ['product'],
	props: [
		prop('open', 'boolean', 'Controls whether the dialog renders.', 'true'),
		prop(
			'presentation',
			"'inline' | 'fixed'",
			'Inline documentation stage or fixed viewport overlay.',
			'inline'
		),
		prop('measure', "'compact' | 'default' | 'wide'", 'Dialog max-width preset.', 'default'),
		prop('onOpenChange', '(open: boolean) => void', 'Close affordance callback.'),
		prop('title', 'ReactNode', 'Primary form title rendered in the shell header.', undefined, true),
		prop('description', 'ReactNode', 'Supporting copy below the title.'),
		prop('footer', 'ReactNode', 'Footer action slot, usually cancel and submit buttons.'),
		prop('status', "'default' | 'error' | 'success'", 'Outer status border treatment.', 'default'),
		prop('children', 'ReactNode', 'Dialog form content.')
	]
} as const
